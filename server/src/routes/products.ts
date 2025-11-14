import { Router } from 'express';
import { query } from '../db/connection.js';

const router = Router();

// Get all products (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { category, featured, active, lang = 'en' } = req.query;
    
    let sql = `
      SELECT 
        p.id, p.slug, p.featured, p.active,
        p.title_${lang} as title,
        p.category_${lang} as category,
        p.description_${lang} as description,
        p.created_at, p.updated_at
      FROM products p
      WHERE 1=1
    `;
    const params: any[] = [];

    if (category) {
      sql += ` AND p.category_en = ?`;
      params.push(category);
    }

    if (featured !== undefined) {
      sql += ` AND p.featured = ?`;
      params.push(featured === 'true' ? 1 : 0);
    }

    if (active !== undefined) {
      sql += ` AND p.active = ?`;
      params.push(active === 'true' ? 1 : 0);
    } else {
      sql += ` AND p.active = 1`; // Only show active products by default
    }

    sql += ` ORDER BY p.featured DESC, p.created_at DESC`;

    const products: any = await query(sql, params);

    // Get base URL for images
    const baseUrl = process.env.BASE_URL || 'https://1000coupoleexport.com';

    // Get primary image for each product
    for (const product of products) {
      const images: any = await query(
        'SELECT image_url FROM product_images WHERE product_id = ? AND is_primary = 1 LIMIT 1',
        [product.id]
      );
      product.image = images.length > 0 ? `${baseUrl}${images[0].image_url}` : null;
    }

    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { lang = 'en' } = req.query;

    const products: any = await query(
      `SELECT 
        p.id, p.slug, p.featured, p.active,
        p.title_en, p.title_fr, p.title_ar,
        p.category_en, p.category_fr, p.category_ar,
        p.description_en, p.description_fr, p.description_ar,
        p.created_at, p.updated_at
      FROM products p
      WHERE p.slug = ? AND p.active = 1`,
      [slug]
    );

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = products[0];

    // Get base URL for images
    const baseUrl = process.env.BASE_URL || 'https://1000coupoleexport.com';

    // Get images
    const images: any = await query(
      'SELECT id, image_url, is_primary, display_order FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, display_order ASC',
      [product.id]
    );
    // Add full URL to each image
    product.images = images.map((img: any) => ({
      ...img,
      image_url: `${baseUrl}${img.image_url}`
    }));

    // Get specifications
    const specs: any = await query(
      `SELECT label_en, label_fr, label_ar, value_en, value_fr, value_ar 
       FROM product_specifications 
       WHERE product_id = ? 
       ORDER BY spec_order ASC`,
      [product.id]
    );
    product.specifications = specs;

    // Get packaging
    const packaging: any = await query(
      `SELECT label_en, label_fr, label_ar, value_en, value_fr, value_ar 
       FROM product_packaging 
       WHERE product_id = ? 
       ORDER BY pack_order ASC`,
      [product.id]
    );
    product.packaging = packaging;

    // Get certifications
    const certs: any = await query(
      `SELECT c.id, c.name, c.logo_url, c.description_en, c.description_fr, c.description_ar
       FROM certifications c
       INNER JOIN product_certifications pc ON c.id = pc.certification_id
       WHERE pc.product_id = ?`,
      [product.id]
    );
    product.certifications = certs;

    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all categories
router.get('/meta/categories', async (req, res) => {
  try {
    const { lang = 'en' } = req.query;
    
    const categories: any = await query(
      `SELECT DISTINCT category_${lang} as category 
       FROM products 
       WHERE active = 1 AND category_${lang} IS NOT NULL 
       ORDER BY category_${lang}`
    );

    res.json(categories.map((c: any) => c.category));
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
