import { GlobalError } from "@/ui/profile/formChild/icons";
import ErrorWrapper from "./ErrorWrapper";
import SubAppWrapper from "@/ui/SideEffectPageWrapper/SubAppWrapper";

function SubError({ reset }: { reset: () => void }) {
  return (
    <SubAppWrapper>
      <GlobalError className=" text-ink-400" />
      <ErrorWrapper reset={reset} />
    </SubAppWrapper>
  );
}

export default SubError;
