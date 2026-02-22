import ProfileLoading from "@/ui/loading/ProfileLoading";
import DivideSection from "@/ui/profile/DivideSection";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata() {
  const meta = await getTranslations("MetaData");
  return {
    title: meta("default.title"),
    description: meta("default.description"),
    metadataBase: process.env.NEXT_PUBLIC_VERCEL_URL,

    openGraph: {
      title: meta("default.title"),
      description: meta("default.description"),
      url: process.env.NEXT_PUBLIC_VERCEL_URL,
      type: "website",
    },
  };
}

export default function Home() {
  return (
    <div className="mt-10">
      <Suspense fallback={<ProfileLoading />}>
        <DivideSection />
      </Suspense>
    </div>
  );
}
