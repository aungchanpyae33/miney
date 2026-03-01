"use client";
import { generateUUID } from "@/lib/generateUUID";
import { Dialog, Field } from "@base-ui-components/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { RefObject, useState } from "react";
import {
  useFormContext,
  useFormState,
  get,
  FieldValues,
  UseFormSetValue,
  Controller,
} from "react-hook-form";
import ErrorText from "./ErrorText";
import { RemoveIcon } from "../formChild/icons";
import ToggleTip from "@/ui/general/TogglelTip";
import Button from "@/components/button/Button";

const addTag = (
  text: string,
  valueForm: { id: string; name: string }[],
  setValue: UseFormSetValue<FieldValues>,
  nextIndexRef: RefObject<string | null>,
  nameInput: string,
) => {
  const newTag = text.trim();
  if (!newTag) {
    const updateValue = valueForm.slice(0, -1);
    setValue(nameInput, updateValue, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
    nextIndexRef.current = null;
    return;
  }

  const updatedTags = [...valueForm];
  if (nextIndexRef.current) {
    updatedTags[valueForm.length - 1] = {
      id: nextIndexRef.current,
      name: newTag,
    };
  } else {
    nextIndexRef.current = generateUUID();
    updatedTags[valueForm.length] = { id: nextIndexRef.current, name: newTag };
  }
  setValue(nameInput, updatedTags, {
    shouldDirty: true,
    shouldValidate: true,
    shouldTouch: true,
  });
};

interface AutoResizeTestAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  valueForm: { id: string; name: string }[];
  nextIndexRef: React.RefObject<string | null>;
  required?: boolean;
  placeholder?: string;
  label: string;
  nameInput: string;
}

const nameVisual = "visual";
const maxLength = 100;

export default function AutoResizeTextArea({
  nameInput,
  label,
  placeholder,
  required,
  valueForm,
  nextIndexRef,
  ...props
}: AutoResizeTestAreaProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("WarningMsg");
  const e = useTranslations("ErrorMsg");
  const b = useTranslations("block");
  const { control, setValue } = useFormContext();
  const name = nameVisual + nameInput;

  const { errors } = useFormState({
    control,
    name,
  });
  const fieldError = get(errors, name);

  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        rules={{
          required: required ? e("required", { label: label }) : undefined,
          maxLength: {
            value: maxLength,
            message: e("maxLength", { max: maxLength }),
          },
        }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <>
            <Field.Label className="flex w-full justify-between font-semibold">
              <span>
                {label}
                {required && <span className="text-error ml-1">*</span>}
                <span className="text-ink-400 ml-1">
                  ({valueForm.length}/3)
                </span>
              </span>

              <span className={clsx("text-ink-400")}>
                {`${(value || "").length}/100`}
              </span>
            </Field.Label>
            <p className=" mb-1 text-sm text-ink-400">{b("textAreaNotice")}</p>
            {valueForm.length > 0 && (
              <div className=" w-full  h-full">
                <div className="flex max-w-fit  flex-wrap gap-1  ">
                  {valueForm.map((tag, i) => (
                    <div
                      key={tag.id}
                      className="  w-full max-w-fit bg-semicontainer p-[2px] rounded-lg "
                    >
                      <div
                        key={tag.id}
                        className="p-2 flex items-center justify-between gap-2  
                bg-zonecontainer rounded-lg overflow-hidden"
                      >
                        <ToggleTip toggleTipContent={tag.name}>
                          <p className=" truncate">{tag.name}</p>
                        </ToggleTip>

                        <Button
                          type="button"
                          className="hover:scale-105 p-0  active:scale-95 transition-transform rounded-full bg-semicontainer duration-150 ease-in-out"
                          onClick={() => {
                            if (i === valueForm.length - 1) {
                              onChange("");
                              nextIndexRef.current = null;
                            }
                            const updateValue = valueForm.filter(
                              ({ id }) => id !== tag.id,
                            );
                            setValue(nameInput, updateValue, {
                              shouldDirty: true,
                              shouldValidate: true,
                              shouldTouch: true,
                            });
                          }}
                        >
                          <RemoveIcon
                            strokeWidth={1.2}
                            width={30}
                            height={30}
                            color="black"
                          />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <textarea
              {...props}
              value={value}
              ref={ref}
              placeholder={placeholder}
              onBlur={onBlur}
              spellCheck="false"
              className={clsx(
                "pl-3.5 text-base block break-words whitespace-pre-wrap rounded-md border border-bordersoft bg-cardcontainer outline-none appearance-none w-full resize-none p-3 min-h-[100px] max-h[150px]",
                {
                  "ring-2 ring-error ring-offset-0 ": fieldError,
                  "focus:ring-2 focus:ring-blue-800 focus:ring-offset-0":
                    !fieldError,
                },
              )}
              rows={1}
              onChange={(e) => {
                if (valueForm.length === 3 && !nextIndexRef.current) {
                  setOpen(true);
                  return;
                }
                addTag(
                  e.currentTarget.value,
                  valueForm,
                  setValue,
                  nextIndexRef,
                  nameInput,
                );
                onChange(e);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (value) {
                    onChange("");
                    nextIndexRef.current = null;
                  }
                }
              }}
            />
          </>
        )}
      />
      {fieldError && <ErrorText>{fieldError.message}</ErrorText>}
      <Dialog.Root open={open}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-backdrop transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
          <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 space-y-5  rounded-lg bg-cardcontainer p-6  outline outline-1 outline-semicontainer transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
            <Dialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
              {b("noti")}
            </Dialog.Title>
            <Dialog.Description className="mb-6 text-base leading-relaxed break-all  ">
              {t("3isMax")}
            </Dialog.Description>
            <div className="flex justify-end gap-4">
              <Dialog.Close
                className="flex h-10 items-center justify-center rounded-md border border-semicontainer  px-3.5 text-base font-medium  select-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800"
                onClick={() => setOpen(false)}
              >
                {b("close")}
              </Dialog.Close>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
