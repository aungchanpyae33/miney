"use client";
import IconWrapper from "@/ui/general/IconWrapper";
import MoreOption from "@/ui/general/modalOption/MoreOption";
import MoreOptionContext from "@/ui/general/modalOption/MoreOptionContext";
import { Settings } from "lucide-react";
import LanguageSub from "../UserProfile/option/subOption/LanguageSub";

function NavLanguageSwitch() {
  return (
    <MoreOptionContext>
      <MoreOption
        staticDrop={true}
        targetElement={<LanguageSub />}
        triggerEl={
          <div className=" p-2 bg-cardcontainer rounded-full">
            <IconWrapper Icon={Settings} size="small" />
          </div>
        }
      />
    </MoreOptionContext>
  );
}

export default NavLanguageSwitch;
