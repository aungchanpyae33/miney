import { cache } from "react";
import { createClient } from "@/database/server";

//wrape with cache because it will be use again in UserSection
export const cacheUserFn = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const user = data?.claims;
  return { user, error };
});
