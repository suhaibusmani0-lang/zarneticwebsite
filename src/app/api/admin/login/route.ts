import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminCredentials, createAdminSessionToken } from '@/lib/adminAuth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!verifyAdminCredentials(email, password)) {
      return NextResponse.json(
        { error: 'Invalid admin credentials. Please check email and password.' },
        { status: 401 }
      )
    }

    const token = createAdminSessionToken()
    const response = NextResponse.json({
      success: true,
      message: 'Admin authenticated successfully',
      token,
    })

    response.cookies.set({
      name: 'zarnetic_admin_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Login failed' }, { status: 500 })
  }
}
