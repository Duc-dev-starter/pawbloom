// import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public|assets|healthz).*)",
  ],
};



// export function middleware(req: NextRequest) {
//     // Kiểm tra xem trang có tồn tại không
//     if (!["/", "/about", "/contact"].includes(req.nextUrl.pathname)) {
//       return NextResponse.rewrite(new URL("/not-found", req.url)); // Giữ nguyên URL
//     }

//     return NextResponse.next();
//   }

