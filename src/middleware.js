// middleware.js
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request) {
  const accessToken = request.cookies.get('access_token')?.value;
  const protectedRoutes = ['/dashboard'];

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !accessToken) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply to all routes or specific ones
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
