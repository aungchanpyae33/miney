import { outputBaseUrl } from "@/lib/outputBaseUrl";
import AuthContainer from "@/ui/auth/AuthContainer";
import BrandTitle from "@/ui/auth/BrandTitle";
import LoginFormContainer from "@/ui/auth/loginForm/LoginFormContainer";
import SignUpText from "@/ui/auth/loginForm/SignUpText";
import TitleLogin from "@/ui/auth/loginForm/TitleLogin";
import type { ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata) {
  const [meta, parentMeta] = await Promise.all([
    getTranslations("MetaData"),
    parent,
  ]);
  const parentOg = parentMeta.openGraph;
  return {
    title: meta("authLogin.title"),
    description: meta("authLogin.description"),
    metadataBase: outputBaseUrl(),
    openGraph: {
      ...parentOg,
      url: "/auth/login",
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
