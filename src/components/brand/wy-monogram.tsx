import { cn } from "@/lib/utils";

/** W + Y — compact horizontal lockup. */
export function WyMonogram({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="8 22 96 66"
      fill="none"
      aria-hidden
      className={cn("shrink-0 text-primary", className)}
    >
      <g
        stroke="currentColor"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 14 28 L 26 74 L 38 34 L 50 74 L 62 28" />
        <path d="M 68 28 L 82 52 V 76" />
        <path d="M 96 28 L 82 52" />
      </g>
    </svg>
  );
}
