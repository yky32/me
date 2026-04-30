export const siteConfig = {
  name: "Wayne Yu",
  nameZh: "伊斯高",
  /** Browser tab default; keep short so tabs don’t truncate mid-word */
  shortTitle: "Wayne Yu",
  /** Full headline for Open Graph / Twitter / SEO */
  title: "Wayne Yu — Software Engineer",
  description:
    "Hong Kong–based software engineer building large-scale distributed systems and customer-centric products.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://github.com/yky32/me",
  locale: "en-HK",
  links: {
    github: "https://github.com/yky32",
  },
} as const;
