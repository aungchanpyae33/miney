import { outputBaseUrl } from "@/lib/outputBaseUrl";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = outputBaseUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Only block the specific pages that shouldn't be in search results
      disallow: ["/auth/sign-up-success"],
    },
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/user/sitemap.xml`],
  };
}
