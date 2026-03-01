"use server";

import { createClient } from "@/database/server";
import { UserProfile } from "@/type/dataType";
import { normalizeProfileData } from "@/utils/formUtils";
type InsertProfileRequiredFields = {
  text_name: string;
  text_select_gender: string;
  text_select_friendness: string;
};
export const uploadData = async (
  prevState: UserProfile,
  changedFields: Record<string, unknown>,
  id: string,
): Promise<UserProfile> => {
  try {
    const supabase = await createClient();
    const { data: user_data } = await supabase.auth.getClaims();
    const user = user_data?.claims;

    if (!user) {
      return {
        ...prevState,
        status: 401,
        error: { name: "not_authenticated" },
      };
    }

    const user_id = user.sub;
    const updateData: Record<string, unknown> = {};
    // prepare and check for updateData
    for (const [key, value] of Object.entries(changedFields)) {
      if (typeof value === "string" && value.startsWith("[")) {
        try {
          updateData[key] = JSON.parse(value);
        } catch {
          updateData[key] = value;
        }
      } else {
        updateData[key] = value ? value : null;
      }
    }

    if (Object.keys(updateData).length === 0) {
      return {
        ...prevState,
        status: 400,
        error: { name: "no_change_field" },
      };
    }

    //. Insert / Update logic

    async function uploadFn() {
      // INSERT (new profile)
      if (!id || id.length === 0) {
        const { data, error } = await supabase
          .from("profile")
          .insert({
            user_id,
            ...updateData,
          } as { user_id: string } & InsertProfileRequiredFields &
            Record<string, unknown>)
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
          .maybeSingle();
        return { data, error };
      }
      // UPDATE (existing profile)
      const { data, error } = await supabase
        .from("profile")
        .update(updateData)
        .eq("user_id", user_id)
        .select(
          `
          id,
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
          multiple_own_comfort_zone
        `,
        )
        .maybeSingle();

      return { data, error };
    }

    const { data, error } = await uploadFn();

    if (error) {
      return {
        ...prevState,
        status: 400,
        error,
      };
    }
    const normalizedData = normalizeProfileData(data);
    return { data: normalizedData, error: null, status: 200 };
  } catch (error) {
    return {
      data: null,
      error,
      status: 500,
    };
  }
};
