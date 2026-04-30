export const siteConfig = {
  name: "Wayne Yu",
  nameZh: "伊斯高",
  title: "Wayne Yu — Software Engineer",
  description:
    "Hong Kong–based software engineer building large-scale distributed systems and customer-centric products.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://github.com/yky32/me",
  locale: "en-HK",
  links: {
    github: "https://github.com/yky32",
  },
} as const;
