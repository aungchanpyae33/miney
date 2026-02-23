import { getUserDynamicProfileCache } from "@/database/serverCacheData";
import DynamicViewProfile from "@/ui/DynamicViewProfile/DynamicViewProfile";
import ProfileLoading from "@/ui/loading/ProfileLoading";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata(props: {
  params: Promise<{ user: string }>;
}) {
  const { user } = await props.params;
  const meta = await getTranslations("MetaData");
  const { data, status } = await getUserDynamicProfileCache(user);
  if (!data || status !== 200)
    return {
      title: meta("userPage.notFoundTitle"),
      description: meta("userPage.notFoundDescription"),
      metadataBase: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,

      openGraph: {
        title: meta("userPage.notFoundTitle"),
        description: meta("userPage.notFoundDescription"),
        url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/user/${user}`,
        type: "profile",
        siteName: "Miney",
      },
    };
  const userName = data.text_name;

  return {
    title: userName,
    description: meta("userPage.description"),
    metadataBase: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,

    openGraph: {
      title: userName,
      description: meta("userPage.description"),
      url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/user/${user}`,
      type: "profile",
      siteName: "Miney",
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
