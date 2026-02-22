import type { PostgrestError } from "@supabase/supabase-js";
import type { Multiple_input, Tables } from "../../database.type-fest";

export interface ProfileDataOutput {
  id: string;
  profile_avatar_url: string;
  text_date_birth: string;
  text_name: string;
  text_pick_mbti: string;
  text_select_friendness: string;
  text_select_gender: string;
  text_select_relationship: string;
  text_textarea_bio: string;
  multiple_own_hobby: Multiple_input;
  multiple_fav_books: Multiple_input;
  multiple_fav_song: Multiple_input;
  multiple_fav_artist: Multiple_input;
  multiple_fav_movie: Multiple_input;
  multiple_fav_food: Multiple_input;
  multiple_own_comfort_zone: Multiple_input;
}

export type UserProfile =
  | {
      data: ProfileDataOutput | null;
      status: number;
      error: PostgrestError | null | unknown;
    }
  | {
      data: null;
      status: number;
      error: unknown;
    };

export type UserProfileOmitUserId = Omit<Tables<"profile">["Row"], "user_id">;
