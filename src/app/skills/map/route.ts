import { skillsAuthed } from "@/lib/skills-auth";

export async function GET() {
  if (!(await skillsAuthed())) {
    return new Response("Unauthorized", { status: 401 });
  }
  return new Response("Map removed.", {
    status: 404,
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}
