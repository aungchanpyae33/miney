import { deleteUserAction, useDeleteUser } from "@/lib/zustand";
import IconWrapper from "@/ui/general/IconWrapper";

import OptionButton from "@/ui/general/modalOption/OptionButton";
import OptionIconEl from "@/ui/general/modalOption/OptionIconEl";
import OptionItem from "@/ui/general/modalOption/OptionItem";
import OptionText from "@/ui/general/modalOption/OptionText";

import { UserX } from "lucide-react";
import { useTranslations } from "next-intl";

function UserAccountDel() {
  const b = useTranslations("block");

  const deleteUserAction = useDeleteUser(
    (state: deleteUserAction) => state.deleteUserAction,
  );
  function handleClick() {
    deleteUserAction(true);
  }
  return (
    <OptionItem>
      <OptionButton action={handleClick}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={UserX} />
        </OptionIconEl>
        <OptionText>{b("deleteAcc")}</OptionText>
      </OptionButton>
    </OptionItem>
  );
}

export default UserAccountDel;
