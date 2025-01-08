// import { createMiddleware } from "@arcjet/next";
// import aj from "./lib/arcjet";

// export const config = {
//     matcher: ["/((?!_next/static|_next/image|favicon.ico|healthz).*)"],
// }

// export default createMiddleware(aj);

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/about/:path*',
}