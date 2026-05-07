import NotFoundWrapper from "./NotFoundWrapper";
import SubAppWrapper from "../SideEffectPageWrapper/SubAppWrapper";
import { GlobalNotFoundIcon } from "../profile/formChild/icons";

function SubNotFound() {
  return (
    <SubAppWrapper>
      <GlobalNotFoundIcon className=" text-ink-400" />
      <NotFoundWrapper />
    </SubAppWrapper>
  );
}

export default SubNotFound;
