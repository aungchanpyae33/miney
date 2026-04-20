import { Field, Slider } from "@base-ui-components/react";
import { Controller, get, useFormContext, useFormState } from "react-hook-form";
import ErrorText from "./ErrorText";

export default function SliderField({
  name,
  label,
  required,
}: {
  name: string;
  label: string;
  required?: boolean;
}) {
  const { control } = useFormContext(); // Get control from Provider

  // 2. Isolate error state so only THIS component re-renders on error
  const { errors } = useFormState({
    control,
    name,
  });
  const fieldError = get(errors, name);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field }) => (
        <Field.Root>
          <Field.Label className=" mb-2 font-semibold" render={<div />}>
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </Field.Label>
          <Slider.Root
            value={field.value}
            onValueChange={(val) => field.onChange(val)}
          >
            <Slider.Control className="flex  h-14 w-full touch-none items-end py-3 select-none">
              <Slider.Track className="h-1 w-full rounded-sm bg-bordersoft shadow-[inset_0_0_0_1px] shadow-shadow select-none">
                <Slider.Indicator className="rounded-sm bg-foreground select-none" />
                <Slider.Thumb
                  aria-label={label}
                  className="size-4 group flex justify-center relative rounded-full bg-foreground select-none has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-blue-800"
                >
                  <span className="absolute border border-bordersoft p-1 min-w-8 group-active:text-foreground group-hover:text-foreground flex items-center justify-center rounded-md text-ink-400   -translate-y-full text-base font-bold">
                    {field.value}
                  </span>
                </Slider.Thumb>
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
          {fieldError && <ErrorText>{fieldError.message}</ErrorText>}
        </Field.Root>
      )}
    />
  );
}
