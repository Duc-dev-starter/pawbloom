import { createMiddleware } from "@arcjet/next";
import aj from "./lib/arcjet";

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|healthz).*)"],
}


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default createMiddleware(aj);