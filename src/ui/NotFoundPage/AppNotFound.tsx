import NotFoundWrapper from "./NotFoundWrapper";
import AppWrapper from "../SideEffectPageWrapper/AppWrapper";
import { GlobalNotFoundIcon } from "../profile/formChild/icons";

function AppNotFound() {
  return (
    <AppWrapper>
      <GlobalNotFoundIcon className=" text-ink-400" />
      <NotFoundWrapper />
    </AppWrapper>
  );
}

export default AppNotFound;
