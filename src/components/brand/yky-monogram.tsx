import { cn } from "@/lib/utils";

/** Interlocking Y–K–Y — K centered between both Y vertices. */
export function YkyMonogram({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="44 30 184 142"
      fill="none"
      aria-hidden
      className={cn("shrink-0 text-primary", className)}
    >
      <g
        stroke="currentColor"
        strokeWidth={5.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 52 34 L 88 104 V 158" />
        <path d="M 124 34 L 88 104" />
        <path d="M 136 34 V 158" />
        <path d="M 136 104 L 196 42" />
        <path d="M 136 104 L 196 166" />
        <path d="M 220 34 L 184 104 V 158" />
        <path d="M 148 34 L 184 104" />
      </g>
    </svg>
  );
}
