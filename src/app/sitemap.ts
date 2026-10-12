import type { MetadataRoute } from "next";

import { lidPage, siteOrigin } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteOrigin, lastModified: now },
    { url: lidPage.url, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteOrigin}/products`, lastModified: now },
    { url: `${siteOrigin}/about`, lastModified: now },
    { url: `${siteOrigin}/support`, lastModified: now },
    { url: `${siteOrigin}/privacy`, lastModified: now },
  ];
}
