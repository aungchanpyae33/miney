import type { ProfileDataOutput } from "@/type/dataType";

// change output to match with FormData
function outputStringForOri(
  input: string[] | string | null | undefined,
): string {
  if (!input) return ""; // handles null & undefined
  if (typeof input === "string") return input;
  return input.length > 0 ? JSON.stringify(input) : "";
}

// change output to match with OriginalData
function outputStringForForm(input: string | null | undefined): string {
  if (!input) return "";
  if (input === "[]") return "";
  return input;
}

//  * Compares original data with form data to detect which fields have changed
//  * Handles text fields, arrays, and files

export function getChangedFields(
  originalData: ProfileDataOutput,
  formData: FormData,
) {
  const changedFields: Record<string, unknown> = {};
  // Iterate through form data and compare with original
  for (const [key, value] of formData.entries()) {
    const originalValue = originalData[key as keyof ProfileDataOutput] as
      | string[]
      | string
      | null
      | undefined;
    const originalValueAsString = outputStringForOri(originalValue);
    const formValueAsString = outputStringForForm(
      value as string | null | undefined,
    );
    if (originalValueAsString !== formValueAsString) {
      changedFields[key] = formValueAsString;
    }
  }
  const isEmpty = Object.keys(changedFields).length === 0;

  return {
    changedFields,
    isEmpty,
  };
}

// delay for testing purpose
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isRequired(text: string) {
  if (
    text === "text_name" ||
    text === "text_select_gender" ||
    text === "text_select_friendness"
  )
    return true;
  return false;
}

type RemoveNullRuntime<T> = {
  [K in keyof T as null extends T[K] ? K : K]: Exclude<T[K], null>;
};
export function normalizeProfileData<T>(
  data: T | null,
): RemoveNullRuntime<T> | null {
  if (!data) return null;
  const result = { ...data } as RemoveNullRuntime<T>;

  for (const key in data) {
    const value = data[key as keyof typeof data];

    if (value == null) {
      // If key starts with "multiple", default to empty array
      if (key.startsWith("multiple")) {
        (result as Record<string, unknown>)[key] = [];
      } else {
        (result as Record<string, unknown>)[key] = "";
      }
    }
  }

  return result;
}

export type RemoveUnused<T> = {
  [K in keyof T as K extends `visual${string}` ? never : K]: T[K];
};

export function removeUnusedFields<T>(obj: T): RemoveUnused<T> {
  const result = {} as RemoveUnused<T>;

  for (const key in obj) {
    if (!key.startsWith("visual")) {
      (result as Record<string, unknown>)[key] = obj[key];
    }
  }

  return result;
}
