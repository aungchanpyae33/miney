"use server";

import { createClient } from "@/database/server";
export const deleteProfileData = async () => {
  try {
    const supabase = await createClient();

    // Auth check
    const { data: authData } = await supabase.auth.getClaims();
    const user = authData?.claims;

    if (!user) {
      return {
        data: null,
        status: 401,
        error: { code: "not_authenticated" },
      };
    }

    // Delete profile by id
    const { data, error } = await supabase
      .from("profile")
      .delete()
      .eq("user_id", user.sub)
      .select("profile_avatar_url")
      .single();

    if (error) {
      return {
        data: null,
        error,
        status: 500,
      };
    }

    if (!data) {
      return {
        data: null,
        error: { code: "profile_not_found" },
        status: 404,
      };
    }
    const avatarUrl = data.profile_avatar_url;
    if (avatarUrl) {
      const { error: storageError } = await supabase.storage
        .from("miney_avater")
        .remove([`${user.sub}/avatar.jpeg`]);
      if (storageError) {
        return {
          data: null,
          error: storageError,
          status: 500,
        };
      }
    }
    // Success
    return {
      data: null,
      error: null,
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      error,
      status: 500,
    };
  }
};
