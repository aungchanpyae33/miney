import { useTranslations } from "next-intl";

import { SpinnerIcon } from "./formChild/icons";
import Button from "@/components/button/Button";
import { useFormContext, useFormState } from "react-hook-form";
import { SetIsChangeForTabProps, useCheckChangeForTab } from "@/lib/zustand";
import { useEffect } from "react";
function SubmitSection({ isPending }: { isPending: boolean }) {
  const b = useTranslations("block");
  const setIsChangeForTab = useCheckChangeForTab(
    (state: SetIsChangeForTabProps) => state.setIsChangeForTab,
  );
  const { control } = useFormContext();

  const { isDirty } = useFormState({
    control,
  });
  const disabled = isPending || !isDirty;

  useEffect(() => {
    setIsChangeForTab(isDirty);
  }, [isDirty, setIsChangeForTab]);
  return (
    <Button
      disabled={disabled}
      type="submit"
      className="flex h-10 w-40 items-center justify-center rounded-md border border-bordersoft text-inherit bg-cardcontainer px-3.5 text-base font-medium disabled:cursor-not-allowed  shadow-[_2px_2px_var(--semicontainer)] transition-all duration-150 active:shadow-[_1px_1px_var(--semicontainer)]  active:translate-y-[1px] active:translate-x-[1px] disabled:opacity-65"
    >
      {isPending ? (
        <span className=" flex items-center gap-2">
          <SpinnerIcon className=" animate-spin size-6" />
        </span>
      ) : (
        <span>{b("submit")}</span>
      )}
    </Button>
  );
}

export default SubmitSection;
