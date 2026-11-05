export const siteConfig = {
  name: "Wayne Yu",
  /** Short professional line under the name on the home hero */
  role: "Product builder",
  /** One-line pitch for founder skim / copy-paste intros */
  pitch: "I ship small apps people actually use — travel, fitness, tools.",
  /** Eyecatcher next to your name in the top nav (hidden on very small screens). */
  navTagline: "Shipping products from Hong Kong",
  /** Browser tab default; keep short so tabs don’t truncate mid-word */
  shortTitle: "Wayne Yu",
  /** Full headline for Open Graph / Twitter / SEO */
  title: "Wayne Yu — Product Builder",
  description:
    "Hong Kong–based product builder shipping customer-facing apps.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.yky.app",
  /** Default share image (absolute or site-relative under public/) */
  ogImage: "/wayne-portrait.png",
  locale: "en-HK",
  links: {
    github: "https://github.com/yky32",
    linkedin: "https://www.linkedin.com/in/wayneyu-dev",
  },
} as const;
