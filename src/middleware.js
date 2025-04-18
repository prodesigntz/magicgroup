import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname from the URL
  const path = request.nextUrl.pathname;

  // Check if the path starts with /dashboard or is in the CMS section
  if (path.startsWith('/dashboard') || path.includes('(cms)')) {
    // Get the user verification status from the session
    const isVerified = request.cookies.get('isVerified')?.value === 'true';

    // If user is not verified, redirect to pending page
    if (!isVerified) {
      return NextResponse.redirect(new URL('/pending', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Specify which paths the middleware should run on
  matcher: [
    '/dashboard/:path*',
    '/(cms)/:path*'
  ]
};