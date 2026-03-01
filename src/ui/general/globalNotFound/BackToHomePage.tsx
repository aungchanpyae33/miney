import { getTranslations } from "next-intl/server";
import Image from "next/image";

async function BackToHomePage() {
  const b = await getTranslations("block");
  return (
    <a href={"/"} className="  flex gap-5 ">
      <Image
        src={"/logo.svg"}
        width={100}
        height={26.7}
        alt="logo"
        className=""
      />
      <span className="bg-zonecontainer rounded-lg p-2"> {b("home")}</span>
    </a>
  );
}

export default BackToHomePage;
