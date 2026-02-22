import IconWrapper from "@/ui/general/IconWrapper";
import ErrorText from "@/ui/profile/Input/ErrorText";
import { Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { get, useFormContext } from "react-hook-form";
const name = "password";

function PasswordInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const au = useTranslations("Auth");
  const e = useTranslations("ErrorMsg");
  const fieldError = get(errors, name);
  return (
    <div className=" space-y-2">
      <h4>{au("password")}</h4>
      <div className=" flex min-h-12 gap-5 p-1 px-3 border border-bordersoft  focus-within:ring-2 focus-within:ring-blue-800 rounded-md relative">
        <input
          type="password"
          className="flex-1 block pl-10 placeholder:text-ink-400 text-base  outline-none bg-transparent"
          placeholder={au("passwordPlaceholder")}
          {...register(name, {
            required: e("required", { label: au("password") }),
          })}
        />
        <span className=" absolute left-2 h-full top-0 flex items-center">
          <IconWrapper Icon={Lock} />
        </span>
      </div>
      {fieldError && <ErrorText>{fieldError.message}</ErrorText>}
    </div>
  );
}

export default PasswordInput;
