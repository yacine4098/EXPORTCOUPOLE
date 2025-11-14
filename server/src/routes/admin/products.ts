import { Router, Request, Response } from 'express';
import { query, getConnection } from '../../db/connection.js';
import { authenticateToken, requireAdmin, AuthRequest } from '../../middleware/auth.js';
import { upload } from '../../middleware/upload.js';

const router = Router();

// All admin routes require authentication
router.use(authenticateToken);
router.use(requireAdmin);

// Get all products (admin view - includes inactive)
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const baseUrl = process.env.BASE_URL || 'https://1000coupoleexport.com';
    
    const products: any = await query(
      `SELECT p.*, 
        (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as primary_image
       FROM products p 
       ORDER BY p.created_at DESC`
    );
    
    // Get all images for each product with full URLs
    for (const product of products) {
      const images: any = await query(
        'SELECT id, image_url, is_primary FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, display_order',
        [product.id]
      );
      product.images = images.map((img: any) => ({
        ...img,
        image_url: `${baseUrl}${img.image_url}`
      }));
    }
    
    res.json(products);
  } catch (error) {
    console.error('Admin get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single product by ID (admin view)
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const baseUrl = process.env.BASE_URL || 'https://1000coupoleexport.com';
    
    const products: any = await query(
      'SELECT * FROM products WHERE id = ?',
      [req.params.id]
    );
    
    if (products.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const product = products[0];
    
    // Get images with full URLs
    const images: any = await query(
      'SELECT id, image_url, is_primary FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, display_order',
      [product.id]
    );
    product.images = images.map((img: any) => ({
      ...img,
      image_url: `${baseUrl}${img.image_url}`
    }));
    
    // Get specifications
    const specifications: any = await query(
      'SELECT * FROM product_specifications WHERE product_id = ? ORDER BY spec_order',
      [product.id]
    );
    product.specifications = specifications;
    
    // Get packaging
    const packaging: any = await query(
      'SELECT * FROM product_packaging WHERE product_id = ? ORDER BY pack_order',
      [product.id]
    );
    product.packaging = packaging;
    
    // Get certifications
    const certifications: any = await query(
      `SELECT c.* FROM certifications c
       JOIN product_certifications pc ON c.id = pc.certification_id
       WHERE pc.product_id = ?`,
      [product.id]
    );
    product.certifications = certifications;
    
    res.json(product);
  } catch (error) {
    console.error('Admin get product by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create product
router.post('/', async (req: AuthRequest, res: Response) => {
  const connection = await getConnection();
  
  try {
    await connection.beginTransaction();

    const { 
      slug, title_en, title_fr, title_ar,
      category_en, category_fr, category_ar,
      description_en, description_fr, description_ar,
      featured, active,
      specifications, packaging, certifications
    } = req.body;

    // Insert product
    const result: any = await connection.query(
      `INSERT INTO products (slug, title_en, title_fr, title_ar, category_en, category_fr, category_ar,
        description_en, description_fr, description_ar, featured, active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [slug, title_en, title_fr, title_ar, category_en, category_fr, category_ar,
       description_en, description_fr, description_ar, featured || false, active !== false]
    );

    const productId = result[0].insertId;

    // Insert specifications
    if (specifications && Array.isArray(specifications)) {
      for (let i = 0; i < specifications.length; i++) {
        const spec = specifications[i];
        await connection.query(
          `INSERT INTO product_specifications 
           (product_id, label_en, label_fr, label_ar, value_en, value_fr, value_ar, spec_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [productId, spec.label_en, spec.label_fr, spec.label_ar, 
           spec.value_en, spec.value_fr, spec.value_ar, i]
        );
      }
    }

    // Insert packaging
    if (packaging && Array.isArray(packaging)) {
      for (let i = 0; i < packaging.length; i++) {
        const pack = packaging[i];
        await connection.query(
          `INSERT INTO product_packaging 
           (product_id, label_en, label_fr, label_ar, value_en, value_fr, value_ar, pack_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [productId, pack.label_en, pack.label_fr, pack.label_ar,
           pack.value_en, pack.value_fr, pack.value_ar, i]
        );
      }
    }

    // Link certifications
    if (certifications && Array.isArray(certifications)) {
      for (const certId of certifications) {
        await connection.query(
          'INSERT INTO product_certifications (product_id, certification_id) VALUES (?, ?)',
          [productId, certId]
        );
      }
    }

    await connection.commit();
    res.status(201).json({ message: 'Product created', id: productId });
  } catch (error) {
    await connection.rollback();
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    connection.release();
  }
});

// Update product
router.put('/:id', async (req: AuthRequest, res: Response) => {
  const connection = await getConnection();
  
  try {
    await connection.beginTransaction();
    const productId = req.params.id;

    const { 
      slug, title_en, title_fr, title_ar,
      category_en, category_fr, category_ar,
      description_en, description_fr, description_ar,
      featured, active,
      specifications, packaging, certifications
    } = req.body;

    // Update product
    await connection.query(
      `UPDATE products SET 
        slug = ?, title_en = ?, title_fr = ?, title_ar = ?,
        category_en = ?, category_fr = ?, category_ar = ?,
        description_en = ?, description_fr = ?, description_ar = ?,
        featured = ?, active = ?
       WHERE id = ?`,
      [slug, title_en, title_fr, title_ar, category_en, category_fr, category_ar,
       description_en, description_fr, description_ar, featured, active, productId]
    );

    // Delete and re-insert specifications
    await connection.query('DELETE FROM product_specifications WHERE product_id = ?', [productId]);
    if (specifications && Array.isArray(specifications)) {
      for (let i = 0; i < specifications.length; i++) {
        const spec = specifications[i];
        await connection.query(
          `INSERT INTO product_specifications 
           (product_id, label_en, label_fr, label_ar, value_en, value_fr, value_ar, spec_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [productId, spec.label_en, spec.label_fr, spec.label_ar,
           spec.value_en, spec.value_fr, spec.value_ar, i]
        );
      }
    }

    // Delete and re-insert packaging
    await connection.query('DELETE FROM product_packaging WHERE product_id = ?', [productId]);
    if (packaging && Array.isArray(packaging)) {
      for (let i = 0; i < packaging.length; i++) {
        const pack = packaging[i];
        await connection.query(
          `INSERT INTO product_packaging 
           (product_id, label_en, label_fr, label_ar, value_en, value_fr, value_ar, pack_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [productId, pack.label_en, pack.label_fr, pack.label_ar,
           pack.value_en, pack.value_fr, pack.value_ar, i]
        );
      }
    }

    // Update certifications
    await connection.query('DELETE FROM product_certifications WHERE product_id = ?', [productId]);
    if (certifications && Array.isArray(certifications)) {
      for (const certId of certifications) {
        await connection.query(
          'INSERT INTO product_certifications (product_id, certification_id) VALUES (?, ?)',
          [productId, certId]
        );
      }
    }

    await connection.commit();
    res.json({ message: 'Product updated' });
  } catch (error) {
    await connection.rollback();
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    connection.release();
  }
});

// Delete product
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    await query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload product image
router.post('/:id/images', upload.single('image'), async (req: AuthRequest, res: Response) => {
  const connection = await getConnection();
  
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const productId = req.params.id;
    const imageUrl = `/uploads/${req.file.filename}`;
    const isPrimary = req.body.is_primary === 'true';

    await connection.beginTransaction();

    // Get old images to delete
    const oldImages: any = await connection.query(
      'SELECT id, image_url FROM product_images WHERE product_id = ?',
      [productId]
    );

    // Delete old images from database
    if (oldImages[0].length > 0) {
      await connection.query(
        'DELETE FROM product_images WHERE product_id = ?',
        [productId]
      );

      // Delete old image files from server
      const fs = await import('fs');
      const path = await import('path');
      const { fileURLToPath } = await import('url');
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      
      for (const img of oldImages[0]) {
        const filePath = path.join(__dirname, '../../../', img.image_url);
        try {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Deleted old image: ${filePath}`);
          }
        } catch (err) {
          console.error(`Failed to delete file ${filePath}:`, err);
        }
      }
    }

    // If this is set as primary, unset other primary images (safety check)
    if (isPrimary) {
      await connection.query('UPDATE product_images SET is_primary = 0 WHERE product_id = ?', [productId]);
    }

    // Insert new image
    const result: any = await connection.query(
      'INSERT INTO product_images (product_id, image_url, is_primary, display_order) VALUES (?, ?, ?, ?)',
      [productId, imageUrl, isPrimary, req.body.display_order || 0]
    );

    await connection.commit();

    const baseUrl = process.env.BASE_URL || 'https://1000coupoleexport.com';
    res.status(201).json({
      id: result[0].insertId,
      image_url: `${baseUrl}${imageUrl}`,
      is_primary: isPrimary
    });
  } catch (error) {
    await connection.rollback();
    console.error('Upload image error:', error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    connection.release();
  }
});

// Delete product image
router.delete('/:id/images/:imageId', async (req: AuthRequest, res: Response) => {
  try {
    await query('DELETE FROM product_images WHERE id = ? AND product_id = ?', 
      [req.params.imageId, req.params.id]);
    res.json({ message: 'Image deleted' });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
