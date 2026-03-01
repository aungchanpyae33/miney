"use client";
import OptionContainer from "../general/modalOption/OptionContainer";
import ThemeSwitchItem from "../ThemeSwitch/ThemeSwitchItem";
import LanguageChangeItem from "./UserProfile/option/LanguageChangeItem";

function GeneralSettingContainer() {
  return (
    <OptionContainer>
      <LanguageChangeItem />
      <ThemeSwitchItem />
    </OptionContainer>
  );
}

export default GeneralSettingContainer;
