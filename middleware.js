import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

// Define protected routes (e.g., /code/search, /code/app)
const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  // Check if the request is for a protected route
  if (isProtectedRoute(request)) {
    // If the user is not authenticated, protect the route
    if (auth.userId) {
      const url = new URL("/sign-in", request.url);

      // Add a query parameter for redirectUrl to go to /code after sign-in
      url.searchParams.set("redirect_url", "/code");

      // Redirect to sign-in page with the specified redirect URL
      return NextResponse.redirect(url);
    }
  }

  // If the user is authenticated or the route is public, continue processing
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
