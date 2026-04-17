import { NextResponse } from 'next/server'

export async function POST() {
    const response = NextResponse.json({ success: true })
    response.cookies.delete('cw_admin_session')
    response.cookies.delete('cw_student_session')
    return response
}
