import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const dynamic = 'force-dynamic'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@1000coupole.com'
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD // Pre-hashed password

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log('Login attempt:', email)
    console.log('Expected email:', ADMIN_EMAIL)
    console.log('Has password hash:', !!ADMIN_PASSWORD_HASH)

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
    }

    // Check if email matches admin email from environment variable
    if (email !== ADMIN_EMAIL) {
      console.log('Email mismatch')
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    // Verify password
    let isValidPassword = false
    
    if (ADMIN_PASSWORD_HASH) {
      // Use pre-hashed password from environment variable
      isValidPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
      console.log('Using hashed password, valid:', isValidPassword)
    } else {
      // Fallback: allow plain password for development (NOT RECOMMENDED FOR PRODUCTION)
      const fallbackPassword = process.env.ADMIN_PASSWORD || 'admin123'
      isValidPassword = password === fallbackPassword
      console.log('Using plain password, valid:', isValidPassword, 'Expected:', fallbackPassword)
    }

    if (!isValidPassword) {
      console.log('Password mismatch')
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: ADMIN_EMAIL, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    console.log('Login successful')
    return NextResponse.json({
      token,
      user: {
        email: ADMIN_EMAIL,
        role: 'admin'
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
