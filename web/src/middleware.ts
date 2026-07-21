import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ["/login", "/register", "/verify-email", "/forgot-password", "/reset-password"];

const PROTECTED_PREFIXES = [
	"/school-admin",
	"/teacher",
	"/bursar",
	"/principal",
	"/student",
	"/guardian",
	"/schools",
	"/plans",
	"/subscriptions",
];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const hasSession = request.cookies.has("accessToken");

	const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
	const isProtectedRoute = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

	// Has a session cookie but trying to visit login/register — send to a safe default.
	// (We don't know their role here — edge middleware can't decode the JWT payload
	// reliably without extra crypto setup — so send home; the app itself redirects
	// them onward once the real user/role is fetched client-side.)
	if (isAuthRoute && hasSession) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	// No session cookie at all, trying to hit a protected dashboard route.
	if (isProtectedRoute && !hasSession) {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("redirect", pathname);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all paths except static files, images, and API routes
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};