import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "@/utils/amplifyServerUtils";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });

  const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const isOnAdminArea = request.nextUrl.pathname.startsWith("/dashboard/admins");
  const isOnSignIn = request.nextUrl.pathname.startsWith("/auth");

  if (user){
    if (isOnAdminArea && !user?.isAdmin || isOnSignIn){
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
  }
  else {
    if (isOnDashboard){
      return NextResponse.redirect(new URL("/auth/sign-in", request.nextUrl));
    }
    
  }
}

export const config = {
  /*
   * Match all request paths except for the ones starting with
   */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};