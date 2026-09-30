import crypto from 'crypto'
import { NextRequest } from 'next/server'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'zarnetic@gmail.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Shaib786@@'
const AUTH_SECRET = process.env.ADMIN_SECRET || 'zarnetic_secret_salt_2026_super_secure'

export function verifyAdminCredentials(email: string, pass: string): boolean {
  if (!email || !pass) return false
  const cleanEmail = email.trim().toLowerCase()
  const cleanPass = pass.trim()

  const envEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
  const envPass = (process.env.ADMIN_PASSWORD || '').trim()

  // Direct check for zarnetic@gmail.com and Shaib786@@
  if (cleanEmail === 'zarnetic@gmail.com' && cleanPass === 'Shaib786@@') {
    return true
  }

  // Match environment variable if provided
  if (envEmail && envPass && cleanEmail === envEmail && cleanPass === envPass) {
    return true
  }

  // Match fallback default
  if (cleanEmail === ADMIN_EMAIL.toLowerCase() && cleanPass === ADMIN_PASSWORD) {
    return true
  }

  // Keep compatibility for admin@zarnetic.com
  if (cleanEmail === 'admin@zarnetic.com' && cleanPass === 'Zarnetic@Admin786') {
    return true
  }

  return false
}

export function createAdminSessionToken(): string {
  const timestamp = Date.now().toString()
  const payload = `${ADMIN_EMAIL}:${timestamp}`
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(payload)
    .digest('hex')
  return Buffer.from(`${payload}:${signature}`).toString('base64')
}

export function verifyAdminSessionToken(token?: string | null): boolean {
  if (!token) return false
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8')
    const [email, timestamp, signature] = decoded.split(':')
    if (!email || !timestamp || !signature) return false

    // Check expiry (e.g. 7 days)
    const tokenTime = parseInt(timestamp, 10)
    if (isNaN(tokenTime)) return false
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000
    if (Date.now() - tokenTime > sevenDaysMs) return false

    const expectedSignature = crypto
      .createHmac('sha256', AUTH_SECRET)
      .update(`${email}:${timestamp}`)
      .digest('hex')

    return signature === expectedSignature
  } catch {
    return false
  }
}

export function isAdminAuthenticated(req: NextRequest): boolean {
  const cookie = req.cookies.get('zarnetic_admin_session')?.value
  const authHeader = req.headers.get('authorization')
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null

  return verifyAdminSessionToken(cookie || bearerToken)
}
