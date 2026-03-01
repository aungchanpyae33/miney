import IconWrapper from "@/ui/general/IconWrapper";
import MoreSubOption from "@/ui/general/modalOption/MoreSubOption";
import OptionIconEl from "@/ui/general/modalOption/OptionIconEl";
import OptionItem from "@/ui/general/modalOption/OptionItem";
import OptionSubArrow from "@/ui/general/modalOption/OptionSubArrow";
import OptionText from "@/ui/general/modalOption/OptionText";
import { ChevronRight, Languages } from "lucide-react";
import LanguageSub from "./subOption/LanguageSub";
import { useTranslations } from "next-intl";

function LanguageChangeItem() {
  const b = useTranslations("block");
  return (
    <MoreSubOption
      stackNum={1}
      triggerEl={
        <OptionItem isSub={true}>
          <OptionIconEl>
            <IconWrapper size="small" Icon={Languages} />
          </OptionIconEl>
          <OptionText>{b("changeLanguage")}</OptionText>
          <OptionSubArrow>
            <IconWrapper Icon={ChevronRight} />
          </OptionSubArrow>
        </OptionItem>
      }
      className="w-full"
      targetElement={<LanguageSub />}
    />
  );
}

export default LanguageChangeItem;
