import { Settings } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import MoreOption from "../general/modalOption/MoreOption";
import MoreOptionContext from "../general/modalOption/MoreOptionContext";
import GeneralSettingContainer from "./GeneralSettingContainer";

function GeneralSettingOption() {
  return (
    <MoreOptionContext>
      <MoreOption
        staticDrop={true}
        targetElement={<GeneralSettingContainer />}
        triggerEl={
          <div className=" p-2 bg-cardcontainer rounded-full">
            <IconWrapper Icon={Settings} size="small" />
          </div>
        }
      />
    </MoreOptionContext>
  );
}

export default GeneralSettingOption;
