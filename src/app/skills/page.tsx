import { skillsAuthed } from "@/lib/skills-auth";
import { SkillsGate } from "./gate";

export const metadata = { title: "Skills", robots: { index: false, follow: false } };

export default async function SkillsPage() {
  if (await skillsAuthed()) {
    return (
      <iframe
        title="Hermes skills"
        src="/skills/map"
        className="fixed inset-0 z-50 h-screen w-screen border-0 bg-white"
      />
    );
  }
  return <SkillsGate />;
}
