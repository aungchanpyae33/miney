export const outputView = <T extends object>(data: T) => {
  const grouped: Record<"basic_info" | "multiple_fill", string[]> = {
    basic_info: [],
    multiple_fill: [],
  };

  for (const key of Object.keys(data) as (keyof T)[]) {
    const keyStr = key as string;
    const item = data[key];

    if (
      keyStr.startsWith("text") &&
      !["text_name", "text_textarea_bio"].includes(keyStr)
    ) {
      if (item) grouped.basic_info.push(keyStr);
    }

    if (keyStr.startsWith("multiple_")) {
      if (item) grouped.multiple_fill.push(keyStr);
    }
  }

  return grouped;
};
