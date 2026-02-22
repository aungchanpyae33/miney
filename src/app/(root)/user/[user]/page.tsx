import { getUserDynamicProfileCache } from "@/database/serverCacheData";
import DynamicViewProfile from "@/ui/DynamicViewProfile/DynamicViewProfile";
import ProfileLoading from "@/ui/loading/ProfileLoading";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata(props: {
  params: Promise<{ user: string }>;
}) {
  const { user } = await props.params;
  const { data, status } = await getUserDynamicProfileCache(user);
  if (!data || status !== 200) return;
  const userName = data.text_name;

  const meta = await getTranslations("MetaData");
  return {
    title: userName,
    description: meta("userPage.description"),
    metadataBase: process.env.NEXT_PUBLIC_BASE_URL,

    openGraph: {
      title: userName,
      description: meta("userPage.description"),
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/${user}`,
      type: "profile",
    },
  };
}

async function page(props: { params: Promise<{ user: string }> }) {
  const { user } = await props.params;
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
