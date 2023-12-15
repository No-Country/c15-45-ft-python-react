export { default } from "next-auth/middleware";

export const config = { matcher: ["/((?!auth|static|favicon.ico).*)"] };
