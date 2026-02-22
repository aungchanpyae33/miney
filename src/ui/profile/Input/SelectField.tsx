import * as React from "react";
import { Select } from "@base-ui-components/react/select";
import { OptionData } from "@/type/uiType";
import { CheckIcon, ChevronUpDownIcon } from "../formChild/icons";
import { useTranslations } from "next-intl";
import { Controller, useFormContext, useFormState, get } from "react-hook-form";
import ErrorText from "./ErrorText";
import { Field } from "@base-ui-components/react";
import clsx from "clsx";

export default function SelectField({
  name,
  label,
  optionData,
  required,
}: {
  name: string;
  label: string;
  optionData: OptionData[];
  required?: boolean;
}) {
  const t = useTranslations("ErrorMsg");
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
      rules={{ required: required ? t("required", { label: label }) : false }}
      render={({ field }) => (
        <Field.Root>
          <Field.Label className=" mb-2 font-semibold" render={<div />}>
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </Field.Label>
          <Select.Root
            items={optionData}
            value={field.value}
            name={name}
            onValueChange={(val) => field.onChange(val)}
          >
            <Select.Trigger
              ref={field.ref}
              className={clsx(
                "flex h-10 min-w-36 items-center justify-between gap-3 rounded-md border border-bordersoft pr-1 pl-3.5  text-base bg-cardcontainer  select-none hover:bg-background   focus-visible:ring-2 focus-visible:-ring-offset-0 focus-visible:ring-blue-800 cursor-default",
                {
                  "ring-2 ring-error ring-offset-0": fieldError,
                },
              )}
            >
              <Select.Value />
              <Select.Icon className="flex">
                <ChevronUpDownIcon className=" size-4" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner
                className="outline-none select-none z-10"
                sideOffset={8}
              >
                <Select.Popup className="group  origin-[var(--transform-origin)] bg-clip-padding rounded-md bg-pop  shadow-md ring-1 ring-white ring-offset-0 shadow-shadow  transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[side=none]:data-[ending-style]:transition-none data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none">
                  <Select.ScrollUpArrow className="top-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-cardcontainer text-center text-xs before:absolute data-[side=none]:before:top-[-100%] before:left-0 before:h-full before:w-full before:content-['']" />
                  <Select.List className="relative p-1 scroll-py-6 overflow-y-auto max-h-[var(--available-height)]">
                    {optionData.map(({ label, value }) => (
                      <Select.Item
                        key={label}
                        value={value}
                        className="grid min-w-[var(--anchor-width)] cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-none select-none group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4 data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-semicontainer data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-md pointer-coarse:py-2.5 pointer-coarse:text-[0.925rem] data-[highlighted]:before:bg-background"
                      >
                        <Select.ItemIndicator className="col-start-1">
                          <CheckIcon className="size-3" />
                        </Select.ItemIndicator>
                        <Select.ItemText className="col-start-2">
                          {label}
                        </Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.List>
                  <Select.ScrollDownArrow className="bottom-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-cardcontainer text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:bottom-[-100%]" />
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
            {fieldError && <ErrorText>{fieldError.message}</ErrorText>}
          </Select.Root>
        </Field.Root>
      )}
    />
  );
}
