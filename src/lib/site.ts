export const siteConfig = {
  name: "Wayne Yu",
  /** Short professional line under the name on the home hero */
  role: "Product builder",
  /** Eyecatcher next to your name in the top nav (hidden on very small screens). */
  navTagline: "Shipping products from Hong Kong",
  /** Browser tab default; keep short so tabs don’t truncate mid-word */
  shortTitle: "Wayne Yu",
  /** Full headline for Open Graph / Twitter / SEO */
  title: "Wayne Yu — Product Builder",
  description:
    "Hong Kong–based product builder shipping customer-facing apps — including Triftly and TGT — with engineering as the craft that gets them live.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://github.com/yky32/me",
  locale: "en-HK",
  links: {
    github: "https://github.com/yky32",
    /** Paste LinkedIn profile URL when ready; empty hides LinkedIn in UI */
    linkedin: "" as string,
  },
} as const;
