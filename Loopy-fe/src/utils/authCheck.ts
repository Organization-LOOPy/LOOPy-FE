import Storage from "./storage.ts";
import { redirect } from "react-router-dom";

export class AuthCheck {
  static async authPageCheck({ request }: { request: Request }) {
    console.log("auth check called");
    const accessToken = Storage.getAccessToken();
    const pathname = new URL(request.url).pathname;

    const publicPaths = new Set(["/"]);

    if (pathname.startsWith("/admin")) {
      const activeCafeId = Storage.getActiveCafeId();

      if (accessToken && !activeCafeId && pathname !== "/admin/register") {
        return redirect("/admin/register");
      }

      return null;
    }

    if (!accessToken && !publicPaths.has(pathname)) {
      return redirect("/");
    }

    return null;
  }
}

