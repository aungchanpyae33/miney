import { outputBaseUrl } from "@/lib/outputBaseUrl";
import AuthContainer from "@/ui/auth/AuthContainer";
import BrandTitle from "@/ui/auth/BrandTitle";
import ForgotPasswordDescription from "@/ui/auth/forgotPassword/ForgotPasswordDescription";
import ForgotPasswordContainer from "@/ui/auth/forgotPassword/ForgotPasswordFormContainer";
import ForgotPasswordTitle from "@/ui/auth/forgotPassword/ForgotPasswordTitle";
import SignInText from "@/ui/auth/signupForm/SignInText";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const meta = await getTranslations("MetaData");
  return {
    title: meta("forgotPassword.title"),
    description: meta("forgotPassword.description"),
    metadataBase: outputBaseUrl(),
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      images: [],
    },
    twitter: {
      images: [],
    },
  };
}

function page() {
  return (
    <AuthContainer>
      <BrandTitle />
      <ForgotPasswordTitle />
      <ForgotPasswordDescription />
      <ForgotPasswordContainer />
      <SignInText />
    </AuthContainer>
  );
}

export default page;
