import { Field } from "@base-ui-components/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import ErrorText from "./ErrorText";
import { useFormContext, useFormState, useWatch, get } from "react-hook-form";
const maxLength = 100;
type SingleTextareaFieldProps = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
};

export function SingleTextareaField({
  name,
  label,
  placeholder,
  className,
  required,
}: SingleTextareaFieldProps) {
  const t = useTranslations("ErrorMsg");
  const { register, control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });
  // useFormState allows this component to re-render on error
  // without affecting the parent or siblings.
  const { errors } = useFormState({
    control,
    name,
  });
  // Separate the register logic from the value/onChange logic
  const {
    onChange,
    onBlur,
    name: refName,
    ref,
  } = register(name, {
    required: required ? t("required", { label: label }) : undefined,
    maxLength: {
      value: maxLength,
      message: t("maxLength", { max: maxLength }),
    },
  });
  const fieldError = get(errors, name);
  return (
    <Field.Root
      name={name}
      className={`flex flex-col items-start gap-2 ${className || ""}`}
    >
      <Field.Label className=" flex justify-between w-full font-medium ">
        <span className=" font-semibold">
          {" "}
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>
        <span className={clsx("text-ink-400", {})}>
          {`${inputValue.length}/${maxLength}`}
        </span>
      </Field.Label>

      <textarea
        value={inputValue}
        placeholder={placeholder}
        onChange={onChange} // Use RHF's onChange
        onBlur={onBlur} // Use RHF's onBlur
        name={refName}
        ref={ref}
        className={clsx(
          "pl-3.5 text-base block  bg-cardcontainer w-full rounded-md border appearance-none outline-none border-bordersoft resize-none p-3 min-h-[100px] max-h-[150px]",
          {
            "ring-2 ring-error ring-offset-0 ": fieldError,
            "focus:ring-2 focus:ring-blue-800 focus:ring-offset-0": !fieldError,
          },
        )}
        rows={1}
      />

      {fieldError && <ErrorText>{fieldError.message}</ErrorText>}
    </Field.Root>
  );
}
