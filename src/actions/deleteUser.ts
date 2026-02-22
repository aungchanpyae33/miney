"use server";

import { createClientService } from "@/database/serverService";

export const deleteUserAccount = async () => {
  try {
    const supabase = await createClientService();

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

    // get profile avatar url
    const { data, error } = await supabase
      .from("profile")
      .select("profile_avatar_url")
      .eq("user_id", user.sub)
      .maybeSingle();

    if (error) {
      return {
        data: null,
        error,
        status: 500,
      };
    }

    const avatarUrl = data?.profile_avatar_url;
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

    // Delete user account

    const { error: deleteError } = await supabase.auth.admin.deleteUser(
      user.sub,
    );
    if (deleteError) {
      return {
        data: null,
        error: deleteError,
        status: 500,
      };
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
