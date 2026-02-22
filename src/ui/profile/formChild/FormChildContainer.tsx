import { TextField } from "../Input/TextField";
import { NumberField } from "../Input/NumberField";
import SelectField from "../Input/SelectField";
import ComboboxField from "../Input/ComboBoxField";
import { SingleTextareaField } from "../Input/SingleTextareaField";
import type { Multiple_input } from "../../../../database.type-fest";
import { useTranslations } from "next-intl";
import { isRequired } from "@/utils/formUtils";
import TextAreaField from "../Input/TextareaField";
import { ProfileDataOutput } from "@/type/dataType";

function FormChildContainer({ data }: { data: ProfileDataOutput }) {
  const t = useTranslations("FormEdit");
  const OptionDataBucket = {
    text_select_gender: [
      { label: t("text_select_gender.options.none"), value: "" },
      { label: t("text_select_gender.options.male"), value: "male" },
      { label: t("text_select_gender.options.female"), value: "female" },
      { label: t("text_select_gender.options.nonBinary"), value: "nonBinary" },
      {
        label: t("text_select_gender.options.preferNotToSay"),
        value: "preferNotToSay",
      },
    ],
    text_select_friendness: [
      { label: t("text_select_friendness.options.none"), value: "" },
      { label: t("text_select_friendness.options.1"), value: "1" },
      { label: t("text_select_friendness.options.2"), value: "2" },
      { label: t("text_select_friendness.options.3"), value: "3" },
      { label: t("text_select_friendness.options.4"), value: "4" },
      { label: t("text_select_friendness.options.5"), value: "5" },
    ],
    text_select_relationship: [
      {
        label: t("text_select_relationship.options.none"),
        value: "",
      },
      {
        label: t("text_select_relationship.options.relationship"),
        value: "relationship",
      },
      { label: t("text_select_relationship.options.single"), value: "single" },
      {
        label: t("text_select_relationship.options.married"),
        value: "married",
      },
      {
        label: t("text_select_relationship.options.complicated"),
        value: "complicated",
      },
    ],
  };
  const PickDataBucket = {
    text_pick_mbti: [
      "INTJ",
      "INTP",
      "ENTJ",
      "ENTP",
      "INFJ",
      "INFP",
      "ENFJ",
      "ENFP",
      "ISTJ",
      "ISFJ",
      "ESTJ",
      "ESFJ",
      "ISTP",
      "ISFP",
      "ESTP",
      "ESFP",
    ],
  };

  return (
    <div className=" space-y-10 w-full  ">
      {(Object.keys(data) as Array<keyof typeof data>).map((key) => {
        if (key === "profile_avatar_url") {
          return null;
        }
        if (key.startsWith("text")) {
          if (key.includes("name")) {
            return (
              <TextField
                key={key}
                name={key}
                required={isRequired(key)}
                label={t(`${key}.label`)}
                placeholder={t(`${key}.placeholder`)}
              />
            );
          }

          if (key.includes("textarea")) {
            return (
              <SingleTextareaField
                key={key}
                name={key}
                required={isRequired(key)}
                label={t(`${key}.label`)}
                placeholder={t(`${key}.placeholder`)}
              />
            );
          }
          if (key.includes("date_birth")) {
            return (
              <NumberField
                key={key}
                required={isRequired(key)}
                label={t(`${key}.label`)}
                name={key}
                placeholder={t(`${key}.placeholder`)}
              />
            );
          }
          if (key.includes("select")) {
            return (
              <SelectField
                key={key}
                required={isRequired(key)}
                name={key}
                label={t(`${key}.label`)}
                optionData={
                  OptionDataBucket[key as keyof typeof OptionDataBucket]
                }
              />
            );
          }
          if (key.includes("pick")) {
            return (
              <ComboboxField
                key={key}
                name={key}
                required={isRequired(key)}
                placeholder={t(`${key}.placeholder`)}
                label={t(`${key}.label`)}
                optionData={PickDataBucket[key as keyof typeof PickDataBucket]}
              />
            );
          }
        }
        if (key.startsWith("multiple")) {
          const item = data[key] as Multiple_input;
          return (
            <TextAreaField
              key={key}
              name={key}
              required={isRequired(key)}
              label={t(`${key}.label`)}
              initValue={item}
              placeholder={t(`${key}.placeholder`)}
            />
          );
        }
      })}
    </div>
  );
}

export default FormChildContainer;
