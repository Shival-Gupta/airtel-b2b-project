import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// const homeUrl = `${process.env.HOME}`;

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    const orgUrl = `${process.env.ORG}`;
    const dashboardUrl = `${process.env.DASHBOARD}`;
    // if user is authenticated
    if (auth.userId) {
      // if user doesn't have Organization ID -> OrganizationPage
      if (!auth.orgId) {
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
