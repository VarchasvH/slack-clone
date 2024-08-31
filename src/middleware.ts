import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// Create a route matcher for the "/auth" route
const isPublicPage = createRouteMatcher(["/auth"]);

// Export the middleware function
export default convexAuthNextjsMiddleware((request) => {
  // Check if the current route is not "/auth" and the user is not authenticated
  if (!isPublicPage(request) && !isAuthenticatedNextjs()) {
    // If true, redirect the user to "/auth"
    return nextjsMiddlewareRedirect(request, "/auth");
  }

  // Check if the current route is "/auth" and the user is authenticated
  if (isPublicPage(request) && isAuthenticatedNextjs()) {
    // If true, redirect the user away from "/auth"
    return nextjsMiddlewareRedirect(request, "/");
  }
});

// Define the middleware configuration
export const config = {
  // Define the matcher for the middleware
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
