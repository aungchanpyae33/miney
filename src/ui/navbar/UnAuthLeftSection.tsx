import { AuthButton } from "@/components/auth-button";
import GeneralSettingOption from "./GeneralSettingOption";

function UnAuthLeftSection() {
  return (
    <div className=" flex gap-4">
      <GeneralSettingOption />
      <AuthButton />
    </div>
  );
}

export default UnAuthLeftSection;
