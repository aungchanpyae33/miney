import { Field } from "@base-ui-components/react";
import { useTranslations } from "next-intl";
import { useFormContext, useFormState, useWatch, get } from "react-hook-form";
import ErrorText from "./ErrorText";
import clsx from "clsx";

type TextFieldProps = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
};

const maxLength = 50;
export function TextField({
  name,
  label,
  placeholder,
  className,
  required,
}: TextFieldProps) {
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
      <Field.Label className="text-sm flex justify-between w-full font-medium">
        <span className=" font-semibold ">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>
        <span className="text-ink-400">{`${inputValue.length}/${maxLength}`}</span>
      </Field.Label>

      <Field.Control
        value={inputValue}
        type="text"
        onChange={onChange} // Use RHF's onChange
        onBlur={onBlur} // Use RHF's onBlur
        name={refName}
        ref={ref}
        autoComplete="off"
        spellCheck="false"
        placeholder={placeholder}
        className={clsx(
          "h-10 w-full rounded-md border border-bordersoft pl-3.5 text-base  bg-cardcontainer focus:ring-2 focus:ring-blue-800 focus:ring-offset-0",
          {
            "ring-2 ring-error ring-offset-0": inputValue.length > maxLength,
          },
        )}
      />
      {fieldError && <ErrorText>{fieldError.message}</ErrorText>}
    </Field.Root>
  );
}
