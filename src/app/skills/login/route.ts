import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE, skillsToken } from "@/lib/skills-auth";

export async function POST(req: Request) {
  const secret = process.env.SKILLS_PASSWORD ?? "";
  const form = await req.formData();
  const given = String(form.get("password") ?? "");
  if (!secret || given !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const jar = await cookies();
  jar.set(COOKIE, skillsToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return NextResponse.redirect(new URL("/skills", req.url), 303);
}
