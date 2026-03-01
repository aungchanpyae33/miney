import { getTranslations } from "next-intl/server";

async function NotFoundText() {
  const w = await getTranslations("WarningMsg");
  return <div className=" text-center max-w-80">{w("globalNotFound")}</div>;
}

export default NotFoundText;
