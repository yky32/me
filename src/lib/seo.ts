import type { Metadata } from "next";

export const siteOrigin = "https://www.yky.app";

export const lidPage = {
  path: "/lid",
  url: `${siteOrigin}/lid`,
  name: "LiD",
  title: "LiD: Watch Them Open",
  description:
    "One letter between two people. Their face as they open it. Then it's gone.",
  image: "/lid-logo.png",
} as const;

export function lidMetadata(): Metadata {
  return {
    title: lidPage.title,
    description: lidPage.description,
    keywords: ["LiD", "letter", "iOS", "envelope", "Wayne Yu"],
    alternates: { canonical: lidPage.url },
    openGraph: {
      type: "website",
      url: lidPage.url,
      siteName: "Wayne Yu",
      title: lidPage.title,
      description: lidPage.description,
      images: [
        {
          url: lidPage.image,
          width: 256,
          height: 256,
          alt: "LiD app icon",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: lidPage.title,
      description: lidPage.description,
      images: [lidPage.image],
    },
    robots: { index: true, follow: true },
  };
}

export function lidJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: lidPage.name,
    operatingSystem: "iOS",
    applicationCategory: "LifestyleApplication",
    description: lidPage.description,
    url: lidPage.url,
    image: `${siteOrigin}${lidPage.image}`,
    author: {
      "@type": "Person",
      name: "Wayne Yu",
      url: siteOrigin,
    },
  };
}
