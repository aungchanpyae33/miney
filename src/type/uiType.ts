export interface OptionData {
  label: string;
  value: string | undefined;
}
export type TextAreaProps = {
  initValue: { id: string; name: string }[];
  name: string;
  required?: boolean;
  label: string;
  placeholder?: string;
  className?: string;
};
