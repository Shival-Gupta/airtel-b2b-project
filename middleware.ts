import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { homeUrl, orgUrl, dashboardUrl } from "./app/routeData";

export default authMiddleware({
  publicRoutes: [homeUrl],
  afterAuth(auth, req) {
    // if user is authenticated
    if (auth.userId) {
      // if user doesn't have Organization ID -> OrganizationPage
      if (!auth.orgId && req.nextUrl.pathname !== orgUrl) {
        const redirectUrl = new URL(orgUrl, req.url);
        return NextResponse.redirect(redirectUrl);
      }

      // if user has OrganizationId and is trying to access Public Routes -> DashboardPage
      if (auth.isPublicRoute) {
        const redirectUrl = new URL(dashboardUrl, req.url);
        return NextResponse.redirect(redirectUrl);
      }
    }
    // if user is un-authenticated and trying to access Private Routes -> LoginPage
    else if (!auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
