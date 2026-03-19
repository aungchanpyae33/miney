import { baseButtonStyles } from "@/components/button/Button";
import {
  formSubmitMsgProps,
  setFormSubmitMsgProps,
  useFormSubmitMsg,
} from "@/lib/zustand";
import { Dialog } from "@base-ui-components/react";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

function InfoMessage() {
  const b = useTranslations("block");
  const formSubmitMsg = useFormSubmitMsg(
    (state: formSubmitMsgProps) => state.formSubmitMsg,
  );
  const setFormSubmitMsg = useFormSubmitMsg(
    (state: setFormSubmitMsgProps) => state.setFormSubmitMsg,
  );
  return (
    <Dialog.Root open={formSubmitMsg !== null}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-backdrop transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0  supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8  w-96 max-w-[calc(100vw-1rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-pop p-6 shadow-md ring-1 ring-white ring-offset-0 shadow-shadow space-y-5  transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 ">
          <Dialog.Title className="-mt-1.5 mb-2 text-lg font-medium">
            {b("noti")}
          </Dialog.Title>
          <Dialog.Description className="mb-6 text-base break-all">
            {formSubmitMsg}
          </Dialog.Description>
          <div className="flex justify-end gap-4">
            <Dialog.Close
              className={twMerge(baseButtonStyles)}
              onClick={() => setFormSubmitMsg(null)}
            >
              {b("close")}
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default InfoMessage;
