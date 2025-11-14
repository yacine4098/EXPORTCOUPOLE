import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const lang = searchParams.get('lang') || 'en'

    let sql = `SELECT 
      p.id, p.slug, p.featured, p.active,
      p.title_${lang} as title,
      p.title_en, p.title_fr, p.title_ar,
      p.category_${lang} as category,
      p.category_en, p.category_fr, p.category_ar,
      p.description_${lang} as description,
      p.description_en, p.description_fr, p.description_ar,
      p.created_at, p.updated_at
    FROM products p
    WHERE p.active = 1`

    const params: any[] = []

    if (category) {
      sql += ` AND p.category_${lang} = ?`
      params.push(category)
    }

    if (featured === 'true') {
      sql += ` AND p.featured = 1`
    }

    sql += ` ORDER BY p.featured DESC, p.created_at DESC`

    const products: any = await query(sql, params)

    // Get base URL for images
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://1000coupoleexport.com'

    // Get primary image for each product
    for (const product of products) {
      const images: any = await query(
        'SELECT image_url FROM product_images WHERE product_id = ? AND is_primary = 1 LIMIT 1',
        [product.id]
      )
      product.image = images.length > 0 ? `${baseUrl}${images[0].image_url}` : null
      
      // Get specifications
      const specs: any = await query(
        `SELECT label_${lang} as label, value_${lang} as value FROM product_specifications WHERE product_id = ? ORDER BY spec_order`,
        [product.id]
      )
      product.specifications = specs

      // Get packaging
      const packaging: any = await query(
        `SELECT label_${lang} as label, value_${lang} as value FROM product_packaging WHERE product_id = ? ORDER BY pack_order`,
        [product.id]
      )
      product.packaging = packaging
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
