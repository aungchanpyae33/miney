import ErrorText from "@/ui/profile/Input/ErrorText";
import { useFormContext } from "react-hook-form";

function RootErrorText() {
  const {
    formState: { errors },
  } = useFormContext();
  if (!errors.root) return null;
  return <ErrorText>{errors.root.message}</ErrorText>;
}

export default RootErrorText;
