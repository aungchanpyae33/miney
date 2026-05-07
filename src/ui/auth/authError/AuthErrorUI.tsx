import BackToHomePage from "@/ui/NotFoundPage/BackToHomePage";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import AuthErrorText from "./AuthErrorText";

async function AuthErrorUI() {
  const [b, e] = await Promise.all([
    getTranslations("block"),
    getTranslations("ErrorMsg"),
  ]);
  return (
    <>
      <AuthErrorText e={e} />
      <BackToHomePage b={b}>
        <Image
          priority={true}
          src={"/logo.svg"}
          width={100}
          height={26.7}
          alt="logo"
        />
      </BackToHomePage>
    </>
  );
}

export default AuthErrorUI;
