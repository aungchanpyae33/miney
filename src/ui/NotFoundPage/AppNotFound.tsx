import { Suspense } from "react";
import NotFoundWrapper from "./NotFoundWrapper";
import NotFoundTextLoading from "../loading/NotFoundTextLoading";
import AppWrapper from "../SideEffectPageWrapper/AppWrapper";
import { GlobalNotFoundIcon } from "../profile/formChild/icons";

function AppNotFound() {
  return (
    <AppWrapper>
      <GlobalNotFoundIcon className=" text-ink-400" />
      <Suspense fallback={<NotFoundTextLoading />}>
        <NotFoundWrapper />
      </Suspense>
    </AppWrapper>
  );
}

export default AppNotFound;
