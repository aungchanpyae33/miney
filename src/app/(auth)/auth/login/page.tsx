import AuthContainer from "@/ui/auth/AuthContainer";
import BrandTitle from "@/ui/auth/BrandTitle";
import LoginFormContainer from "@/ui/auth/loginForm/LoginFormContainer";
import SignUpText from "@/ui/auth/loginForm/SignUpText";
import TitleLogin from "@/ui/auth/loginForm/TitleLogin";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const meta = await getTranslations("MetaData");

  return {
    title: meta("authLogin.title"),
    description: meta("authLogin.description"),
    metadataBase: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,

    openGraph: {
      title: meta("authLogin.title"),
      description: meta("authLogin.description"),
      url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/auth/login`,
      type: "website",
      siteName: "Miney",
    },
  };
}

export default function Page() {
  return (
    <AuthContainer>
      <BrandTitle />
      <TitleLogin />
      <LoginFormContainer />
      <SignUpText />
    </AuthContainer>
  );
}
