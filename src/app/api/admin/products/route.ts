import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import jwt from 'jsonwebtoken'

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
