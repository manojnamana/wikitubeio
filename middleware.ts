// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(req: NextRequest) {
//   const isAuthenticated = req.cookies.get('access_token');
//   const { pathname } = req.nextUrl;

//   // Define an array of protected paths
//   const protectedPaths = [
//     '/landing',
//     '/tube',
//     '/wiki',
//     '/404',
//     '/c.r.e.a.t.e.r',
//     '/coursemaker',
//     '/dashboard',
//     '/NotFound',
//     '/transcript',
//     '/transcripteditor',
//     '/duplicate',
//   ];

//   // Check if the pathname starts with any of the protected paths
//   const isProtected = protectedPaths.some((path) =>
//     pathname.startsWith(path)
//   );

//   //Redirect to home if unauthenticated and trying to access a protected route
//   if (isProtected && !isAuthenticated) {
//     return NextResponse.redirect(new URL('/', req.url));
//   }

//   return NextResponse.next();
//  }
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token');
  const { pathname } = req.nextUrl;

  // List of protected routes
  const protectedPaths = [
    
    '/tube',
    '/wiki',
    '/404',
    '/c.r.e.a.t.e.r',
    '/coursemaker',
    '/dashboard',
    '/NotFound',
    '/transcript',
    '/transcripteditor',
    '/duplicate',
  ];

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // Redirect if not authenticated
  if (isProtected && !accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
