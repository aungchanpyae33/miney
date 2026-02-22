import * as React from "react";
import { Combobox } from "@base-ui-components/react/combobox";
import { CheckIcon, ChevronUpDownIcon, ClearIcon } from "../formChild/icons";
import { Controller, useFormContext, useFormState, get } from "react-hook-form";
import { useTranslations } from "next-intl";
import ErrorText from "./ErrorText";
import clsx from "clsx";

export default function ComboboxField({
  name,
  label,
  optionData,
  required,
  placeholder,
}: {
  name: string;
  label: string;
  optionData: string[];
  required?: boolean;
  placeholder: string;
}) {
  const id = React.useId();
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
        <Combobox.Root
          items={optionData}
          value={field.value}
          name={name}
          onValueChange={(val) => field.onChange(val || "")}
        >
          <div className=" flex flex-col gap-2 text-sm leading-5 font-medium">
            <label className=" font-semibold" htmlFor={id}>
              {label}
              {required && <span className="text-error ml-1">*</span>}
            </label>
            <div
              className=" relative 
        focus-within:ring-2 focus-within:ring-blue-800 focus-within:ring-offset-0
        rounded-md border overflow-hidden  border-bordersoft  "
            >
              <Combobox.Input
                ref={field.ref}
                placeholder={placeholder}
                id={id}
                className={clsx(
                  "h-10 w-full outline-none  font-normal  pl-3.5   text-base bg-cardcontainer ",
                  {
                    "ring-2 ring-error ring-offset-0": fieldError,
                  },
                )}
              />
              <div className="absolute z-2 bg-cardcontainer w-[60px]  right-0 bottom-0 flex h-10 items-center justify-center text-ink-400">
                <Combobox.Clear
                  className="flex h-10 w-6 mr-3 items-center justify-center rounded bg-transparent p-0"
                  aria-label="Clear selection"
                >
                  <ClearIcon className="size-4 text-slate-200" />
                </Combobox.Clear>
                <Combobox.Trigger
                  className="flex h-10 w-4 items-center justify-center rounded "
                  aria-label="Open popup"
                >
                  <ChevronUpDownIcon className=" size-[18px]" />
                </Combobox.Trigger>
              </div>
            </div>
          </div>

          <Combobox.Portal>
            <Combobox.Positioner className="outline-none" sideOffset={4}>
              <Combobox.Popup className="w-[var(--anchor-width)] max-h-[min(var(--available-height),23rem)] max-w-[var(--available-width)] origin-[var(--transform-origin)] overflow-y-auto scroll-pt-2 scroll-pb-2 overscroll-contain rounded-md bg-pop p-1  shadow-md ring-1 ring-white ring-offset-0 shadow-shadow  transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 ">
                <Combobox.Empty className="px-4 py-2 text-[0.925rem] leading-4   empty:m-0 empty:p-0">
                  {t("noMBTI")}
                </Combobox.Empty>
                <Combobox.List>
                  {(item: string) => (
                    <Combobox.Item
                      key={item}
                      value={item}
                      className="grid cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-8 pl-4 text-base leading-4 outline-none select-none data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-ink-gray-400 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-2 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-md data-[highlighted]:before:bg-background"
                    >
                      <Combobox.ItemIndicator className="col-start-1">
                        <CheckIcon className="size-3" />
                      </Combobox.ItemIndicator>
                      <div className="col-start-2">{item}</div>
                    </Combobox.Item>
                  )}
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
          {fieldError && <ErrorText>{fieldError.message}</ErrorText>}
        </Combobox.Root>
      )}
    />
  );
}
