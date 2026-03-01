import type { MergeDeep } from "type-fest";
import type { Database as DBGenerated } from "./database.types";

export type Multiple_input = { id: string; name: string }[];

export type Database = MergeDeep<
  DBGenerated,
  {
    public: {
      Tables: {
        profile: {
          Row: {
            multiple_own_hobby: Multiple_input;
            multiple_fav_books: Multiple_input;
            multiple_fav_song: Multiple_input;
            multiple_fav_artist: Multiple_input;
            multiple_fav_movie: Multiple_input;
            multiple_fav_food: Multiple_input;
            multiple_own_comfort_zone: Multiple_input;
          };
          Insert: {
            profile_avatar_url?: string;
            text_date_birth?: string;
            text_pick_mbti?: string;
            text_select_relationship?: string;
            text_textarea_bio?: string;
            user_id?: string;
            multiple_own_hobby?: Multiple_input;
            multiple_fav_books?: Multiple_input;
            multiple_fav_song?: Multiple_input;
            multiple_fav_artist?: Multiple_input;
            multiple_fav_movie?: Multiple_input;
            multiple_fav_food?: Multiple_input;
            multiple_own_comfort_zone?: Multiple_input;
          };
          Update: {
            profile_avatar_url?: string;
            text_date_birth?: string;
            text_pick_mbti?: string;
            text_select_relationship?: string;
            text_textarea_bio?: string;
            user_id?: string;
            multiple_own_hobby?: Multiple_input;
            multiple_fav_books?: Multiple_input;
            multiple_fav_song?: Multiple_input;
            multiple_fav_artist?: Multiple_input;
            multiple_fav_movie?: Multiple_input;
            multiple_fav_food?: Multiple_input;
            multiple_own_comfort_zone?: Multiple_input;
          };
        };
      };
    };
  }
>;

export type Tables<TableName extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][TableName];
