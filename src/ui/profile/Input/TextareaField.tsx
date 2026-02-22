import { useRef } from "react";
import { Field } from "@base-ui-components/react";
import { TextAreaProps } from "@/type/uiType";

import { useFormContext, useWatch } from "react-hook-form";
import AutoResizeTextArea from "./AutoResizeTextArea";

function TextAreaField({
  name,
  required,
  label,
  placeholder,
  className,
}: TextAreaProps) {
  const { control } = useFormContext();

  const value = useWatch({
    control,
    name,
  }) as { id: string; name: string }[];
  const nextIndexRef = useRef<string>(null);
  return (
    <Field.Root
      className={`flex w-full flex-col items-start gap-2 ${className || ""}`}
    >
      <input
        type="text"
        name={name}
        required={required}
        hidden
        value={JSON.stringify(value)}
        readOnly
      />
      <AutoResizeTextArea
        valueForm={value}
        nameInput={name}
        label={label}
        placeholder={placeholder}
        nextIndexRef={nextIndexRef}
      />
    </Field.Root>
  );
}
export default TextAreaField;
