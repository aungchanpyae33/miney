import {
  deleteProfile,
  deleteProfileAction,
  useDeleteProfile,
} from "@/lib/zustand";

import { AlertDialog } from "@base-ui-components/react";
import { useTranslations } from "next-intl";
import Button from "@/components/button/Button";
import ProfileDeleteActionBtn from "./ProfileDeleteActionBtn";

function ProfileDelete() {
  const b = useTranslations("block");
  const w = useTranslations("WarningMsg");
  const deleteProfileAction = useDeleteProfile(
    (state: deleteProfileAction) => state.deleteProfileAction,
  );
  const deleteProfile = useDeleteProfile(
    (state: deleteProfile) => state.deleteProfile,
  );

  return (
    <AlertDialog.Root open={deleteProfile}>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 min-h-dvh bg-backdrop transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
        <AlertDialog.Popup className="fixed top-1/2 left-1/2 -mt-8 w-96 max-w-[calc(100vw-1rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg space-y-5 bg-pop p-6 shadow-md ring-1 ring-white ring-offset-0 shadow-shadow transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 ">
          <AlertDialog.Title className="-mt-1.5 mb-3 text-lg font-medium">
            {b("noti")}
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-6 text-base leading-relaxed break-all ">
            {w("deleteProfileWarning")}
          </AlertDialog.Description>
          <div className="flex justify-end gap-4">
            <Button onClick={() => deleteProfileAction(false)}>
              {b("cancel")}
            </Button>
            <ProfileDeleteActionBtn />
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default ProfileDelete;
