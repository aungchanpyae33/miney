import { createClientWithoutCookies } from "@/database/serverWithoutCookie";
import { outputBaseUrl } from "@/lib/outputBaseUrl";
import type { MetadataRoute } from "next";

export const revalidate = 86400; // Re-cache every 24 hours
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = outputBaseUrl().toString();

  try {
    const supabase = createClientWithoutCookies();

    const { data: profiles, error } = await supabase
      .from("profile")
      .select("id,profile_avatar_url,updated_at");

    if (error || !profiles) {
      console.error("User sitemap fetch failed:", error);
      return [];
    }

    return profiles.map((profile) => ({
      url: `${baseUrl}/user/${profile.id}`,
      lastModified: new Date(profile.updated_at),
      changeFrequency: "weekly",
      priority: 0.8,
      images: profile.profile_avatar_url
        ? [profile.profile_avatar_url]
        : undefined,
    }));
  } catch (error) {
    console.error("Failed to generate user sitemap:", error);
    return [];
  }
}
