// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server"; // Import NextResponse

// // Define protected routes using createRouteMatcher
// const isProtectedRoute = createRouteMatcher([
//   "/messages/(.*)",
//   "/alltv",
//   "/allmovie",
//   "/new-popular",
//   "/code/search",
//   "/player/(.*)",
// ]);

// export default clerkMiddleware((auth, req) => {
//   // Protect routes based on the matcher
//   if (isProtectedRoute(req)) {
//     // Check if the user is authenticated using auth().userId
//     if (!auth().userId) {
//       // If user is not authenticated, redirect to sign-in page
//       const url = new URL("/sign-in", req.url); // Correct URL construction
//       return NextResponse.redirect(url); // Use NextResponse.redirect() for redirection
//     }
//   }

//   // If the user is authenticated or the route is not protected, continue processing
//   return NextResponse.next(); // Continue the request if authenticated or route is not protected
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

// Define protected routes (e.g., /code/search, /code/app)
const isProtectedRoute = createRouteMatcher(["/code/search", "/code/app"]);

export default clerkMiddleware(async (auth, request) => {
  // Check if the request is for a protected route
  if (isProtectedRoute(request)) {
    // If the user is not authenticated, protect the route
    await auth.protect();
  }

  // If the route is public, no protection is needed, so it can continue processing
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
