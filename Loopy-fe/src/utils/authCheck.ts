import Storage from "./storage.ts";
import { redirect } from "react-router-dom";

export class AuthCheck {
  static async authPageCheck({ request }: { request: Request }) {
    console.log("auth check called");
    const accessToken = Storage.getAccessToken();
    const pathname = new URL(request.url).pathname;

    const publicPaths = new Set(["/", "/signin"]);

    // 로그인 안 한 사용자 -> 로그인 페이지
    if (!accessToken && !publicPaths.has(pathname)) {
      window.alert("로그인이 필요합니다.");
      return redirect("/");
    }

    // 로그인한 사용자 -> 홈
    if (accessToken && publicPaths.has(pathname)) {
      return redirect("/home");
    }

    return null;
  }
}

