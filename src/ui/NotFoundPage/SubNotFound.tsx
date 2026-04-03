import { Suspense } from "react";
import NotFoundTextLoading from "../loading/NotFoundTextLoading";
import NotFoundWrapper from "./NotFoundWrapper";
import SubAppWrapper from "../SideEffectPageWrapper/SubAppWrapper";
import { GlobalNotFoundIcon } from "../profile/formChild/icons";

function SubNotFound() {
  return (
    <SubAppWrapper>
      <GlobalNotFoundIcon className=" text-ink-400" />
      <Suspense fallback={<NotFoundTextLoading />}>
        <NotFoundWrapper />
      </Suspense>
    </SubAppWrapper>
  );
}

export default SubNotFound;
