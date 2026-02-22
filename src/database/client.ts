import { UserProfile } from "@/type/dataType";
import { supabase } from "./supabaseClient";

export const getUserProfileClient = async (): Promise<UserProfile> => {
  try {
    const fetchData = await fetch("/api/getProfile");
    const returnData = await fetchData.json();

    return returnData;
  } catch (error) {
    return { data: null, error, status: 500 };
  }
};

export type ApiResult = {
  data: string | null;
  error: unknown | null;
  status: number;
};

export const upLoadImageClient = async (
  userId: string | undefined,
  file: File | "default" | null,
): Promise<ApiResult> => {
  try {
    if (!file) {
      return {
        data: null,
        error: null,
        status: 200,
      };
    }
    if (!userId) {
      return {
        data: null,
        error: "user not logged in",
        status: 401,
      };
    }

    // default avatar , meaning it is changing from soemthing existing to default, so we need to delete the existing one in storage
    if (file === "default") {
      const { error: storageError } = await supabase.storage
        .from("miney_avater")
        .remove([`${userId}/avatar.jpeg`]);
      if (storageError) {
        return {
          data: null,
          error: storageError,
          status: 500,
        };
      }
      return {
        data: "default",
        error: null,
        status: 200,
      };
    }

    const filePath = `${userId}/${file.name}`;

    const { error } = await supabase.storage
      .from("miney_avater")
      .upload(filePath, file, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      return {
        data: null,
        error,
        status: 400,
      };
    }

    // get public URL
    const { data } = supabase.storage
      .from("miney_avater")
      .getPublicUrl(filePath);

    return {
      data: data.publicUrl + `?v=${Date.now()}`,
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
