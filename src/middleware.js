// middleware.js
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request) {
  const accessToken = request.cookies.get('access_token')?.value;
  const protectedRoutes = ['/dashboard','/createStory', '/collaborate'];

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !accessToken) {
    const loginUrl = new URL('/loginPage', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply to all routes or specific ones
export const config = {
  matcher: [
    '/createStory/:path*',
    '/dashboard/:path*',
    '/api/story/:path*',
    '/api/story/create'  // Add specific API routes if needed
  ]
}
