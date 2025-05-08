import { auth } from "auth";

const protectedRoutes = ["/account", "/cart"];
const authRoutes = ["/login", "/register"];

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  if (!isLoggedIn && protectedRoutes.includes(nextUrl.pathname)) {
    return Response.redirect(new URL("/login", nextUrl));
  }
  if (isLoggedIn && authRoutes.includes(nextUrl.pathname)) {
    return Response.redirect(new URL("/", nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
