import { cn } from "@/lib/utils";

/** Classic Instagram-style camera mark (outline only). */
export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn(className)}
    >
      <path
        d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={12}
        cy={12}
        r={3.5}
        stroke="currentColor"
        strokeWidth={2}
      />
      <circle cx={17} cy={7} r={1} fill="currentColor" />
    </svg>
  );
}
