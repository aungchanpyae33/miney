"use client";

import OptionContainer from "@/ui/general/modalOption/OptionContainer";
import UserNameItem from "./option/UserNameItem";
import LogoutItem from "./option/LogoutItem";
import LanguageChangeItem from "./option/LanguageChangeItem";
import UserAccountDel from "./option/UserAccountDel";
import ThemeSwitchItem from "@/ui/ThemeSwitch/ThemeSwitchItem";

function UserProfileContainer({ email }: { email: string }) {
  return (
    <OptionContainer>
      <UserNameItem email={email} />
      <UserAccountDel />
      <ThemeSwitchItem />
      <LanguageChangeItem />
      <LogoutItem />
    </OptionContainer>
  );
}

export default UserProfileContainer;
