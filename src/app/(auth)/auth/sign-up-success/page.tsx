import AuthContainer from "@/ui/auth/AuthContainer";
import BrandTitle from "@/ui/auth/BrandTitle";
import SignUpInstruction from "@/ui/auth/signupScuuess/SignUpInstruction";
import SignUpSuccessTitle from "@/ui/auth/signupScuuess/SignUpSuccessTitle";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const meta = await getTranslations("MetaData");

  return {
    title: meta("authConfirm.title"),
    description: meta("authConfirm.description"),
    metadataBase: process.env.VERCEL_URL,

    openGraph: {
      title: meta("authConfirm.title"),
      description: meta("authConfirm.description"),
      url: `${process.env.VERCEL_URL}/auth/sign-up-success`,
      type: "website",
    },
  };
}

export default function Page() {
  return (
    <AuthContainer>
      <BrandTitle />
      <SignUpSuccessTitle />
      <SignUpInstruction />
    </AuthContainer>
  );
}
