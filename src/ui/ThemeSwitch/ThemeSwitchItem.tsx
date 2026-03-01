import IconWrapper from "@/ui/general/IconWrapper";
import { ChevronRight, Palette } from "lucide-react";
import ThemeSwitchSubItem from "./ThemeSwitchSubOption";
import MoreSubOption from "../general/modalOption/MoreSubOption";
import OptionItem from "../general/modalOption/OptionItem";
import OptionIconEl from "../general/modalOption/OptionIconEl";
import OptionText from "../general/modalOption/OptionText";
import OptionSubArrow from "../general/modalOption/OptionSubArrow";
import { useTranslations } from "next-intl";

function ThemeSwitchItem() {
  const b = useTranslations("block");
  return (
    <MoreSubOption
      stackNum={1}
      triggerEl={
        <OptionItem isSub={true}>
          <OptionIconEl>
            <IconWrapper size="small" Icon={Palette} />
          </OptionIconEl>
          <OptionText>{b("theme")}</OptionText>
          <OptionSubArrow>
            <IconWrapper Icon={ChevronRight} />
          </OptionSubArrow>
        </OptionItem>
      }
      className="w-full"
      targetElement={<ThemeSwitchSubItem />}
    />
  );
}

export default ThemeSwitchItem;
