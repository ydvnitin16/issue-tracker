import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './app/auth/authOptions';

const publicPaths = ['/auth'];

const isPublicPath = (pathname) => {
    return publicPaths.some((path) => pathname.startsWith(path));
};

export async function proxy(request) {
    const session = await getServerSession(authOptions);
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith('/api')) {
        return NextResponse.next();
    }

    if (isPublicPath(pathname)) {
        return NextResponse.next();
    }

    if (!session) {
        const url = request.nextUrl.clone();
        url.pathname = '/auth/signin';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
};
