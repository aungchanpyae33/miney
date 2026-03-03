import NotFoundText from "./NotFoundText";
import BackToHomePage from "./BackToHomePage";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

async function NotFoundWrapper() {
  const [b, w] = await Promise.all([
    getTranslations("block"),
    getTranslations("WarningMsg"),
  ]);
  return (
    <>
      <NotFoundText w={w} />
      <BackToHomePage b={b}>
        <Image
          priority={true}
          src={"/logo.svg"}
          width={100}
          height={26.7}
          alt="logo"
          className=""
        />
      </BackToHomePage>
    </>
  );
}

export default NotFoundWrapper;
