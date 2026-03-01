import { CircleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { NotFoundProfileOrUser } from "../profile/formChild/icons";
function EmptyData() {
  const b = useTranslations("block");
  const w = useTranslations("WarningMsg");
  return (
    <div className="w-full h-[400px] max-h-[400px] mx-auto  flex items-center text-center justify-center rounded-3xl ">
      <div className=" max-w-[400px] justify-center text-center flex flex-col items-center rounded-xl shadow-sm space-y-6 bg-pop shadow-shadow border border-bordersoft h-fit p-4 min-h-72 w-[95%] mx-auto">
        <NotFoundProfileOrUser width={50} height={50} />
        <p className=" font-semibold sm:text-lg text-base ">{w("NotFound")}</p>
        <div className="">
          <CircleAlert className=" inline-block mr-2" />
          <span className="text-sm font-light"> {b("notFoundData")}</span>
        </div>
      </div>
    </div>
  );
}

export default EmptyData;
