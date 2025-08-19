import Storage from "./storage.ts";
import { redirect } from "react-router-dom";

export class AuthCheck {
  static async authPageCheck({ request }: { request: Request }) {
    console.log("auth check called");
    const accessToken = Storage.getAccessToken();
    const pathname = new URL(request.url).pathname;

    const publicPaths = new Set(["/", "/signin"]);
    const protectedPaths = new Set(["/admin/register"]);

    if (pathname.startsWith("/admin")) {
      const activeCafeId = Storage.getActiveCafeId();

      if (accessToken && !activeCafeId && pathname !== "/admin/register") {
        return redirect("/admin/register");
      }

      if (accessToken && activeCafeId && protectedPaths.has(pathname)) {
        return redirect("/admin/home");
      }

      return null;
    }

    if (!accessToken && !publicPaths.has(pathname) && pathname !== "/onboard") {
      return redirect("/");
    }

    if (accessToken) {
      const onboarded = Storage.isOnboarded();

      if (!onboarded && pathname !== "/onboard") {
        return redirect("/onboard");
      }

      if (onboarded && (publicPaths.has(pathname) || pathname === "/onboard")) {
        return redirect("/home");
      }
    }

    return null;
  }
}

