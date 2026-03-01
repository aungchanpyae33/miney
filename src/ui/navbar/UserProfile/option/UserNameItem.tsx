import IconWrapper from "@/ui/general/IconWrapper";
import OptionButton from "@/ui/general/modalOption/OptionButton";
import OptionIconEl from "@/ui/general/modalOption/OptionIconEl";
import OptionItem from "@/ui/general/modalOption/OptionItem";
import OptionText from "@/ui/general/modalOption/OptionText";
import ToolTip from "@/ui/general/ToolTip";
import { Mail } from "lucide-react";

function UserNameItem({ email }: { email: string }) {
  return (
    <OptionItem>
      <OptionButton>
        <OptionIconEl>
          <IconWrapper size="small" Icon={Mail} />
        </OptionIconEl>
        <ToolTip tooltipContent={email}>
          <OptionText>{email}</OptionText>
        </ToolTip>
      </OptionButton>
    </OptionItem>
  );
}

export default UserNameItem;
