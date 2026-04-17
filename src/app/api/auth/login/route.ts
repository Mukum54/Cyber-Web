import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const { password, role } = await request.json()

    if (!password || !role) {
        return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
    }

    const secret = process.env.AUTH_SECRET
    const isAdmin = role === 'admin' && password === process.env.ADMIN_PASSWORD
    const isStudent = role === 'student' && password === process.env.STUDENT_PASSWORD

    if (!isAdmin && !isStudent) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const cookieName = role === 'admin' ? 'cw_admin_session' : 'cw_student_session'

    const response = NextResponse.json({ success: true, role })
    response.cookies.set(cookieName, secret!, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    })

    return response
}
