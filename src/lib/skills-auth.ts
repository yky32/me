import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "yky_skills";

function password() {
  return process.env.SKILLS_PASSWORD ?? "";
}

export function skillsToken() {
  return createHmac("sha256", password()).update("yky-skills").digest("hex");
}

export async function skillsAuthed() {
  const secret = password();
  if (!secret) return false;
  const got = (await cookies()).get(COOKIE)?.value ?? "";
  const expect = skillsToken();
  if (got.length !== expect.length) return false;
  return timingSafeEqual(Buffer.from(got), Buffer.from(expect));
}

export { COOKIE };
