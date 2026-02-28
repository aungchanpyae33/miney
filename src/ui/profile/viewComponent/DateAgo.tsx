import { outputAgoDate } from "@/lib/outputAgoDate";
import IconWrapper from "@/ui/general/IconWrapper";
import { Clock } from "lucide-react";
import { useTranslations } from "next-intl";

function DateAgo({ date }: { date: string }) {
  const t = useTranslations("FormView");
  const [number, unit] = outputAgoDate(date);
  return (
    <div className=" ml-auto w-fit max-w-48 rounded-full m-1   flex items-center justify-center bg-zonecontainer p-2  text-xs gap-1  ">
      <IconWrapper Icon={Clock} size="exSmall" className=" grow-0 shrink-0" />
      <div className="min-w-0 truncate">
        {t(`updated_at.${unit}`, { number, ago: t("updated_at.ago") })}
      </div>
    </div>
  );
}

export default DateAgo;
