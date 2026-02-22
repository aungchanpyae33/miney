import IconWrapper from "@/ui/general/IconWrapper";
import ErrorText from "@/ui/profile/Input/ErrorText";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { get, useFormContext } from "react-hook-form";
const name = "email";

function EmailInput() {
  const au = useTranslations("Auth");
  const e = useTranslations("ErrorMsg");
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const fieldError = get(errors, name);
  return (
    <div className=" space-y-2">
      <h4>{au("email")}</h4>
      <div className=" focus-within:ring-2 focus-within:ring-blue-800   flex min-h-12 gap-5 overflow-hidden border border-bordersoft rounded-md relative">
        <input
          type="email"
          className="flex-1 block pl-10 placeholder:text-ink-400 text-base  outline-none bg-transparent"
          placeholder={au("emailPlaceholder")}
          {...register(name, {
            required: e("required", { label: au("email") }),
            pattern: {
              value: /^\S+@\S+$/i,
              message: e("wrongEmail"),
            },
          })}
        />

        <span className=" absolute left-2 h-full top-0 flex items-center">
          <IconWrapper Icon={Mail} />
        </span>
      </div>
      {fieldError && <ErrorText>{fieldError.message}</ErrorText>}
    </div>
  );
}

export default EmailInput;
