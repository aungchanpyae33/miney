import { Field } from "@base-ui-components/react";
import { useTranslations } from "next-intl";
import { useFormContext, useFormState, useWatch, get } from "react-hook-form";
import ErrorText from "./ErrorText";
import clsx from "clsx";
const maxLength = 4;
const minLength = 4;
type NumberFieldProps = {
  required?: boolean;
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
};

export function NumberField({
  name,
  required,
  label,
  placeholder,
  className,
}: NumberFieldProps) {
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
    validate: {
      // 1. Check Pattern FIRST (Priority)
      isNumber: (value) => !value || /^[0-9]+$/.test(value) || t("onlyNumbers"),

      // 2. Check Length SECOND
      correctLength: (value) =>
        !value || value.length === maxLength || t("invalidYear"),

      // 3. Check Range THIRD
      isRealistic: (value) => {
        if (!value) return true;
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();
        if (year < 1900 || year > currentYear) {
          return t("outOfRangeYear", { currentYear });
        }
        return true;
      },
    },
  });
  const fieldError = get(errors, name);
  return (
    <Field.Root
      name={name}
      className={`flex flex-col items-start gap-2 ${className || ""}`}
    >
      <Field.Label className=" flex w-full justify-between font-medium">
        <span className=" font-semibold">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>

        <span className="text-ink-400">{`${inputValue.length}/${maxLength}`}</span>
      </Field.Label>

      <Field.Control
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={onChange} // Use RHF's onChange
        onBlur={onBlur} // Use RHF's onBlur
        name={refName}
        ref={ref}
        autoComplete="off"
        spellCheck="false"
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        className={clsx(
          "h-10 w-full rounded-md border border-bordersoft pl-3.5 text-base appearance-none outline-none  bg-cardcontainer",
          {
            "ring-2 ring-error ring-offset-0 ": fieldError,
            "focus:ring-2 focus:ring-blue-800 focus:ring-offset-0": !fieldError,
          },
        )}
      />
      {fieldError && <ErrorText>{fieldError.message}</ErrorText>}
    </Field.Root>
  );
}
