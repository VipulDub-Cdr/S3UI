import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Define protected page routes (not API routes - they handle auth internally)
  const protectedPageRoutes = ['/dashboard'];
  const isProtectedPageRoute = protectedPageRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedPageRoute) {
    // For now, let pages handle their own auth checks
    // API routes will handle authentication internally
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}