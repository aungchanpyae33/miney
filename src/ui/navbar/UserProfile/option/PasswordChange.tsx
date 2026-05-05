import IconWrapper from "@/ui/general/IconWrapper";

import OptionButton from "@/ui/general/modalOption/OptionButton";
import OptionIconEl from "@/ui/general/modalOption/OptionIconEl";
import OptionItem from "@/ui/general/modalOption/OptionItem";
import OptionText from "@/ui/general/modalOption/OptionText";
import { useUserInfoContext } from "@/ui/UserInfoFetch/UserInfoContext";

import { LockKeyhole } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

function PasswordChange() {
  const { userInfo } = useUserInfoContext();
  const b = useTranslations("block");

  if (userInfo?.app_metadata?.provider !== "email") {
    return null;
  }
  function handleClick() {}

  return (
    <Link href={`/auth/update-password`} className="block ">
      <OptionItem>
        <OptionButton action={handleClick}>
          <OptionIconEl>
            <IconWrapper size="small" Icon={LockKeyhole} />
          </OptionIconEl>
          <OptionText>{b("updatePassword")}</OptionText>
        </OptionButton>
      </OptionItem>
    </Link>
  );
}

export default PasswordChange;
