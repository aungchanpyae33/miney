import type { JwtPayload } from "@supabase/supabase-js";

export const returnUserId = (user: JwtPayload | undefined) => {
  if (user) return user.sub;
  return user;
};
