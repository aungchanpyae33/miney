import NotFoundWrapper from "@/ui/general/globalNotFound/NotFoundWrapper";
import NotFoundTextLoading from "@/ui/loading/NotFoundTextLoading";
import { GlobalNotFoundIcon } from "@/ui/profile/formChild/icons";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <div className=" flex gap-3 flex-col justify-center  min-h-screen max-h-screen items-center ">
      <GlobalNotFoundIcon className=" text-ink-400" />

      <Suspense fallback={<NotFoundTextLoading />}>
        <NotFoundWrapper />
      </Suspense>
    </div>
  );
}
