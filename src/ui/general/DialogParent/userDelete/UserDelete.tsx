import {
  deleteUserAction,
  deleteUserState,
  useDeleteUser,
} from "@/lib/zustand";

import { AlertDialog } from "@base-ui-components/react";
import { useTranslations } from "next-intl";
import Button from "@/components/button/Button";
import UserDeleteActionBtn from "./UserDeleteActionBtn";

function UserDelete() {
  const b = useTranslations("block");
  const w = useTranslations("WarningMsg");
  const deleteUserAction = useDeleteUser(
    (state: deleteUserAction) => state.deleteUserAction,
  );
  const deleteUser = useDeleteUser(
    (state: deleteUserState) => state.deleteUser,
  );

  return (
    <AlertDialog.Root open={deleteUser}>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 min-h-dvh bg-backdrop transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
        <AlertDialog.Popup className="fixed top-1/2 left-1/2 -mt-8 w-96 max-w-[calc(100vw-1rem)] -translate-x-1/2 -translate-y-1/2 space-y-5 rounded-lg bg-pop p-6 shadow-md ring-1 ring-white ring-offset-0 shadow-shadow transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 ">
          <AlertDialog.Title className="-mt-1.5 mb-3 text-lg font-medium">
            {b("noti")}
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-6 text-base  break-all ">
            {w("deleteUserWarning")}
          </AlertDialog.Description>
          <div className="flex justify-end gap-4">
            <Button onClick={() => deleteUserAction(false)}>
              {b("cancel")}
            </Button>
            <UserDeleteActionBtn />
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default UserDelete;
