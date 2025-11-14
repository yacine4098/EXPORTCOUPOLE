import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import jwt from 'jsonwebtoken'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const products: any = await query(
      `SELECT 
        p.id, p.slug, p.featured, p.active,
        p.title_en as title,
        p.category_en as category,
        p.description_en as description,
        p.created_at, p.updated_at
      FROM products p
      ORDER BY p.created_at DESC`
    )

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://1000coupoleexport.com'

    for (const product of products) {
      const images: any = await query(
        'SELECT image_url FROM product_images WHERE product_id = ? AND is_primary = 1 LIMIT 1',
        [product.id]
      )
      product.image = images.length > 0 ? `${baseUrl}${images[0].image_url}` : null
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error('Get admin products error:', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    
    // Extract product data
    const productData = {
      slug: formData.get('slug') as string,
      title_en: formData.get('title_en') as string,
      title_fr: formData.get('title_fr') as string || null,
      title_ar: formData.get('title_ar') as string || null,
      category_en: formData.get('category_en') as string,
      category_fr: formData.get('category_fr') as string || null,
      category_ar: formData.get('category_ar') as string || null,
      description_en: formData.get('description_en') as string,
      description_fr: formData.get('description_fr') as string || null,
      description_ar: formData.get('description_ar') as string || null,
      featured: formData.get('featured') === 'true' ? 1 : 0,
      active: formData.get('active') === 'true' ? 1 : 0,
    }

    // Insert product
    const result: any = await query(
      `INSERT INTO products (slug, title_en, title_fr, title_ar, category_en, category_fr, category_ar,
       description_en, description_fr, description_ar, featured, active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        productData.slug,
        productData.title_en,
        productData.title_fr,
        productData.title_ar,
        productData.category_en,
        productData.category_fr,
        productData.category_ar,
        productData.description_en,
        productData.description_fr,
        productData.description_ar,
        productData.featured,
        productData.active,
      ]
    )

    const productId = result.insertId

    // Handle image uploads
    const images = formData.getAll('images') as File[]
    if (images && images.length > 0) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products')
      
      try {
        await mkdir(uploadDir, { recursive: true })
      } catch (error) {
        // Directory might already exist
      }

      for (let i = 0; i < images.length; i++) {
        const image = images[i]
        if (image && image.size > 0) {
          const bytes = await image.arrayBuffer()
          const buffer = Buffer.from(bytes)
          
          const fileName = `${Date.now()}-${i}-${image.name}`
          const filePath = path.join(uploadDir, fileName)
          
          await writeFile(filePath, buffer)
          
          const imageUrl = `/uploads/products/${fileName}`
          const isPrimary = i === 0 ? 1 : 0
          
          await query(
            'INSERT INTO product_images (product_id, image_url, is_primary, display_order) VALUES (?, ?, ?, ?)',
            [productId, imageUrl, isPrimary, i]
          )
        }
      }
    }

    // Handle specifications
    const specificationsJson = formData.get('specifications') as string
    if (specificationsJson) {
      const specifications = JSON.parse(specificationsJson)
      for (let i = 0; i < specifications.length; i++) {
        const spec = specifications[i]
        if (spec.label_en) {
          await query(
            `INSERT INTO product_specifications 
             (product_id, label_en, label_fr, label_ar, value_en, value_fr, value_ar, spec_order)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              productId,
              spec.label_en,
              spec.label_fr || null,
              spec.label_ar || null,
              spec.value_en,
              spec.value_fr || null,
              spec.value_ar || null,
              i,
            ]
          )
        }
      }
    }

    // Handle packaging
    const packagingJson = formData.get('packaging') as string
    if (packagingJson) {
      const packaging = JSON.parse(packagingJson)
      for (let i = 0; i < packaging.length; i++) {
        const pack = packaging[i]
        if (pack.label_en) {
          await query(
            `INSERT INTO product_packaging
             (product_id, label_en, label_fr, label_ar, value_en, value_fr, value_ar, pack_order)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              productId,
              pack.label_en,
              pack.label_fr || null,
              pack.label_ar || null,
              pack.value_en,
              pack.value_fr || null,
              pack.value_ar || null,
              i,
            ]
          )
        }
      }
    }

    // Handle certifications
    const certificationsJson = formData.get('certifications') as string
    if (certificationsJson) {
      const certifications = JSON.parse(certificationsJson)
      for (const certId of certifications) {
        await query(
          'INSERT INTO product_certifications (product_id, certification_id) VALUES (?, ?)',
          [productId, certId]
        )
      }
    }

    return NextResponse.json({ 
      message: 'Product created successfully',
      productId 
    }, { status: 201 })

  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json({ 
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
