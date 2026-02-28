import { outputBaseUrl } from "@/lib/outputBaseUrl";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = outputBaseUrl().toString();
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      images: [`${baseUrl}/opengraph-image.png`],
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
      priority: 0.6,
      changeFrequency: "monthly",
      images: [`${baseUrl}/opengraph-image.png`],
    },
    {
      url: `${baseUrl}/auth/sign-up`,
      lastModified: new Date(),
      priority: 0.6,
      changeFrequency: "monthly",
      images: [`${baseUrl}/opengraph-image.png`],
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      priority: 0.3,
      changeFrequency: "yearly",
      images: [`${baseUrl}/opengraph-image.png`],
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      priority: 0.3,
      changeFrequency: "yearly",
      images: [`${baseUrl}/opengraph-image.png`],
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      priority: 0.3,
      changeFrequency: "yearly",
      images: [`${baseUrl}/opengraph-image.png`],
    },
  ];
}
