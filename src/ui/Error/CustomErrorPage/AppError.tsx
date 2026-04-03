import { GlobalError } from "@/ui/profile/formChild/icons";
import ErrorWrapper from "./ErrorWrapper";
import AppWrapper from "@/ui/SideEffectPageWrapper/AppWrapper";

function AppError({ reset }: { reset: () => void }) {
  return (
    <AppWrapper>
      <GlobalError className=" text-ink-400" />
      <ErrorWrapper reset={reset} />
    </AppWrapper>
  );
}

export default AppError;
