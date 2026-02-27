


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."profile" (
    "id" "text" DEFAULT "left"("replace"("replace"("encode"("extensions"."gen_random_bytes"(9), 'base64'::"text"), '/'::"text", ''::"text"), '+'::"text", ''::"text"), 12) NOT NULL,
    "profile_avatar_url" "text",
    "text_name" "text" NOT NULL,
    "text_select_gender" "text" NOT NULL,
    "text_select_friendness" "text" NOT NULL,
    "text_date_birth" "text",
    "text_pick_mbti" "text",
    "multiple_own_hobby" "jsonb",
    "multiple_fav_books" "jsonb",
    "multiple_fav_song" "jsonb",
    "multiple_fav_artist" "jsonb",
    "multiple_fav_movie" "jsonb",
    "multiple_fav_food" "jsonb",
    "text_textarea_bio" "text",
    "multiple_own_comfort_zone" "jsonb",
    "user_id" "uuid" NOT NULL,
    "text_select_relationship" "text"
);


ALTER TABLE "public"."profile" OWNER TO "postgres";


ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "profile_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "profile_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



CREATE POLICY "Enable delete for users based on user_id" ON "public"."profile" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable insert for users based on user_id" ON "public"."profile" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable read access for all users" ON "public"."profile" FOR SELECT USING (true);



CREATE POLICY "Enable update for users based on user_id" ON "public"."profile" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



ALTER TABLE "public"."profile" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";








































































































































































GRANT ALL ON TABLE "public"."profile" TO "anon";
GRANT ALL ON TABLE "public"."profile" TO "authenticated";
GRANT ALL ON TABLE "public"."profile" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































drop extension if exists "pg_net";


  create policy "allow delete to only related to userid folder name f00nxu_0"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'miney_avatar'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "allow retrieve public bucket  f00nxu_0"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'miney_avatar'::text));



  create policy "allow update to only related to userid folder name f00nxu_0"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'miney_avatar'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "allow upload to only related to userid folder name f00nxu_0"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'miney_avatar'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



