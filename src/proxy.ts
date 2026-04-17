import { NextRequest, NextResponse } from 'next/server'

const ADMIN_COOKIE = 'cw_admin_session'
const STUDENT_COOKIE = 'cw_student_session'

// ── Rate Limiter (in-memory, per IP) ──────────────────────────
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60_000 // 1 minute
const RATE_LIMIT_API_MAX = 60
const RATE_LIMIT_CONTACT_MAX = 5
const RATE_LIMIT_AUTH_MAX = 10

function checkRateLimit(
  ip: string,
  maxRequests: number,
  windowMs: number = RATE_LIMIT_WINDOW
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return { success: true, remaining: maxRequests - 1, resetTime: now + windowMs }
  }

  if (entry.count >= maxRequests) {
    return { success: false, remaining: 0, resetTime: entry.resetTime }
  }

  entry.count++
  return { success: true, remaining: maxRequests - entry.count, resetTime: entry.resetTime }
}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) rateLimitMap.delete(key)
  }
}, 300_000)

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp.trim()
  return 'unknown'
}

// ── Security Headers ────────────────────────────────────────
function sanitizeHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  response.headers.delete('x-powered-by')
  return response
}

// ── Main Proxy (Middleware) ──────────────────────────────────
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = getClientIp(request)

  // ── Rate limiting for API routes ──
  if (pathname.startsWith('/api/')) {
    let maxRequests = RATE_LIMIT_API_MAX
    if (pathname.startsWith('/api/contact')) maxRequests = RATE_LIMIT_CONTACT_MAX
    else if (pathname.startsWith('/api/auth')) maxRequests = RATE_LIMIT_AUTH_MAX

    const rateCheck = checkRateLimit(ip, maxRequests)
    if (!rateCheck.success) {
      const response = NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          resetTime: new Date(rateCheck.resetTime).toISOString(),
        },
        { status: 429 }
      )
      response.headers.set('Retry-After', String(Math.ceil((rateCheck.resetTime - Date.now()) / 1000)))
      return sanitizeHeaders(response)
    }

    const response = NextResponse.next()
    response.headers.set('X-RateLimit-Remaining', String(rateCheck.remaining))
    return sanitizeHeaders(response)
  }

  // ── Protect /admin routes ──
  if (pathname.startsWith('/admin')) {
    const adminSession = request.cookies.get(ADMIN_COOKIE)
    if (!adminSession || adminSession.value !== process.env.AUTH_SECRET) {
      const loginUrl = new URL('/login?role=admin', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return sanitizeHeaders(NextResponse.redirect(loginUrl))
    }
  }

  // ── Protect /student routes ──
  if (pathname.startsWith('/student')) {
    const studentSession = request.cookies.get(STUDENT_COOKIE)
    const adminSession = request.cookies.get(ADMIN_COOKIE)
    const isAuthenticated =
      (studentSession && studentSession.value === process.env.AUTH_SECRET) ||
      (adminSession && adminSession.value === process.env.AUTH_SECRET)
    if (!isAuthenticated) {
      const loginUrl = new URL('/login?role=student', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return sanitizeHeaders(NextResponse.redirect(loginUrl))
    }
  }

  // ── All other routes: apply security headers ──
  return sanitizeHeaders(NextResponse.next())
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/student/:path*',
    '/api/:path*',
  ],
}
