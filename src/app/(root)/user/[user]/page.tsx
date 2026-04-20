import {
  checkUserExistCache,
  getUserDynamicProfileCache,
} from "@/database/serverCacheData";
import { outputBaseUrl } from "@/lib/outputBaseUrl";
import DynamicViewProfile from "@/ui/DynamicViewProfile/DynamicViewProfile";
import ProfileLoading from "@/ui/loading/ProfileLoading";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(props: {
  params: Promise<{ user: string }>;
}) {
  const { user } = await props.params;
  const userExists = await checkUserExistCache(user);
  if (!userExists) notFound();
  const meta = await getTranslations("MetaData");
  const { data, error, status } = await getUserDynamicProfileCache(user);
  if (error || status !== 200) throw new Error("page-load-error");
  if (!data) notFound();
  const userName = data.text_name;

  return {
    title: userName,
    description: meta("userPage.description"),
    metadataBase: outputBaseUrl(),

    openGraph: {
      title: userName,
      description: meta("userPage.description"),
      url: `/user/${user}`,
      type: "profile",
      siteName: "Miney",
    },
  };
}

async function page(props: { params: Promise<{ user: string }> }) {
  const { user } = await props.params;
  const userExists = await checkUserExistCache(user);
  if (!userExists) notFound();
  return (
    <div className="mt-10">
      <Suspense fallback={<ProfileLoading />}>
        <div className="bg-cardcontainer shadow-[_3px_-3px_var(--semicontainer)] w-full  rounded-3xl flex flex-col items-center">
          <DynamicViewProfile id={user} />
        </div>
      </Suspense>
    </div>
  );
}

export default page;
