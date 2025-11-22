import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './app/auth/authOptions';

export async function proxy(request) {
    const session = await getServerSession(authOptions);
    const pathname = request.nextUrl.pathname;

    if (!session && !pathname.startsWith('/auth')) {
        const url = request.nextUrl.clone();
        url.pathname = '/auth/signin';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
};
