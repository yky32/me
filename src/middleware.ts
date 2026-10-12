import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const referer = request.headers.get("referer") ?? "";
  if (
    request.nextUrl.pathname === "/favicon.ico" &&
    (referer.includes("/lid") || request.nextUrl.searchParams.get("page") === "lid")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/lid-tab-32.png";
    url.search = "";
    return NextResponse.rewrite(url);
  }
  const headers = new Headers(request.headers);
  headers.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/favicon.ico", "/((?!_next/static|_next/image|.*\\..*).*)"],
};
