import type { Metadata } from "next";

export const siteOrigin = "https://www.yky.app";

export const lidPage = {
  path: "/lid",
  url: `${siteOrigin}/lid`,
  name: "LiD",
  title: "LiD — Wayne Yu",
  description:
    "Wayne Yu. One letter between two people. Their face as they open it. Then it's gone.",
  image: "/lid-logo.png",
} as const;

export function lidMetadata(): Metadata {
  return {
    title: { absolute: lidPage.title },
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
          url: `${siteOrigin}${lidPage.image}`,
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
      images: [`${siteOrigin}${lidPage.image}`],
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [{ url: "/lid-tab-32.png", type: "image/png", sizes: "32x32" }],
      shortcut: "/lid-tab-32.png",
      apple: "/lid-logo.png",
    },
  };
}

export const refraemPage = {
  path: "/refraem",
  url: `${siteOrigin}/refraem`,
  name: "Refraem",
  title: "Refraem — Wayne Yu",
  description:
    "Wayne Yu. A menu bar app for Mac. Snap windows, grab the screen, mark it up, and copy the finished image.",
  image: "/refraem-logo.png",
  download: "https://www.yky.app/downloads/Refraem-0.2.2-macOS.zip",
} as const;

export function refraemMetadata(): Metadata {
  return {
    title: { absolute: refraemPage.title },
    description: refraemPage.description,
    keywords: ["Refraem", "Reframe", "macOS", "window layout", "screenshot", "Wayne Yu"],
    alternates: { canonical: refraemPage.url },
    openGraph: {
      type: "website",
      url: refraemPage.url,
      siteName: "Wayne Yu",
      title: refraemPage.title,
      description: refraemPage.description,
      images: [
        {
          url: `${siteOrigin}${refraemPage.image}`,
          width: 256,
          height: 256,
          alt: "Refraem app icon",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: refraemPage.title,
      description: refraemPage.description,
      images: [`${siteOrigin}${refraemPage.image}`],
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [{ url: "/refraem-tab-32.png", type: "image/png", sizes: "32x32" }],
      shortcut: "/refraem-tab-32.png",
      apple: "/refraem-logo.png",
    },
  };
}

export function refraemJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: refraemPage.name,
    operatingSystem: "macOS",
    applicationCategory: "UtilitiesApplication",
    description: refraemPage.description,
    url: refraemPage.url,
    image: `${siteOrigin}${refraemPage.image}`,
    downloadUrl: refraemPage.download,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Wayne Yu",
      url: siteOrigin,
    },
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
