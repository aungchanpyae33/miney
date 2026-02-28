import { UserProfile } from "@/type/dataType";
import { createClient } from "./server";
import { normalizeProfileData } from "@/utils/formUtils";
import { cache } from "react";

export const getUserDynamicProfileCache = cache(
  async (id: string): Promise<UserProfile> => {
    try {
      const supabase = await createClient();
      const { data, error, status } = await supabase
        .from("profile")
        .select(
          `id,
        updated_at,
        profile_avatar_url,
        text_name,
        text_select_gender,
        text_select_friendness,
        text_textarea_bio,
        text_date_birth,
        text_select_relationship,
        text_pick_mbti,
        multiple_own_hobby,
        multiple_fav_song,
        multiple_fav_artist,
        multiple_fav_books,
        multiple_fav_food,
        multiple_fav_movie,
        multiple_own_comfort_zone`,
        )
        .eq("id", id)
        .single();
      // change any null into empty string
      const normalizedData = normalizeProfileData(data);
      return { data: normalizedData, error, status };
    } catch (error) {
      return { data: null, error, status: 500 };
    }
  },
);
