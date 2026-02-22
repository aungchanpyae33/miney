import AuthContainer from "@/ui/auth/AuthContainer";
import BrandTitle from "@/ui/auth/BrandTitle";
import SignInText from "@/ui/auth/signupForm/SignInText";
import SignUpFormContainer from "@/ui/auth/signupForm/SignUpFormContainer";
import TitleSignUp from "@/ui/auth/signupForm/TitleSignUp";
import { getTranslations } from "next-intl/server";
export async function generateMetadata() {
  const meta = await getTranslations("MetaData");

  return {
    title: meta("authSignup.title"),
    description: meta("authSignup.description"),
    metadataBase: process.env.VERCEL_URL,

    openGraph: {
      title: meta("authSignup.title"),
      description: meta("authSignup.description"),
      url: `${process.env.VERCEL_URL}/auth/sign-up`,
      type: "website",
    },
  };
}
export default function Page() {
  return (
    <AuthContainer>
      <BrandTitle />
      <TitleSignUp />
      <SignUpFormContainer />
      <SignInText />
    </AuthContainer>
  );
}
