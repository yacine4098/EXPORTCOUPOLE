import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const dynamic = 'force-dynamic'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log('Login attempt:', email)
    console.log('ENV ADMIN_EMAIL:', ADMIN_EMAIL || 'Not set')
    console.log('ENV ADMIN_PASSWORD:', ADMIN_PASSWORD ? 'Set' : 'Not set')

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
    }

    // Try environment variables first (if set)
    if (ADMIN_EMAIL && ADMIN_PASSWORD) {
      console.log('Trying ENV authentication')
      
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = jwt.sign(
          { email: ADMIN_EMAIL, role: 'admin' },
          JWT_SECRET,
          { expiresIn: '24h' }
        )
        
        console.log('ENV Login successful')
        return NextResponse.json({
          token,
          user: { email: ADMIN_EMAIL, role: 'admin' }
        })
      }
    }

    // Fallback to database authentication
    console.log('Trying database authentication')
    const users: any = await query(
      'SELECT * FROM users WHERE email = ? AND role = ?',
      [email, 'admin']
    )

    if (users.length === 0) {
      console.log('User not found in database')
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    const user = users[0]
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      console.log('Database password mismatch')
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    console.log('Database login successful')
    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
