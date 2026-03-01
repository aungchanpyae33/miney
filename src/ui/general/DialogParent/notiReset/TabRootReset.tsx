import {
  IsTabOpenProps,
  SetIsChangeForTabProps,
  SetIsTabOpenProps,
  setTabsProps,
  useChangeTab,
  useCheckChangeForTab,
  useCheckTabOpen,
} from "@/lib/zustand";

import { AlertDialog } from "@base-ui-components/react";
import { useTranslations } from "next-intl";
import Button from "@/components/button/Button";

function TabRootReset() {
  const b = useTranslations("block");
  const w = useTranslations("WarningMsg");
  const setTabs = useChangeTab((state: setTabsProps) => state.setTabs);
  const isTabOpen = useCheckTabOpen((state: IsTabOpenProps) => state.isTabOpen);
  const setIsTabOpen = useCheckTabOpen(
    (state: SetIsTabOpenProps) => state.setIsTabOpen,
  );

  const setIsChangeForTab = useCheckChangeForTab(
    (state: SetIsChangeForTabProps) => state.setIsChangeForTab,
  );
  return (
    <AlertDialog.Root open={isTabOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed blen inset-0 min-h-dvh bg-backdrop z-10 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
        <AlertDialog.Popup className="fixed top-1/2 left-1/2 z-50 -mt-8 w-96 max-w-[calc(100vw-1rem)] -translate-x-1/2 space-y-5 -translate-y-1/2 rounded-lg bg-pop p-6 shadow-md ring-1 ring-white ring-offset-0 shadow-shadow transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 ">
          <AlertDialog.Title className="-mt-1.5 mb-3 text-lg font-medium">
            {b("noti")}
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-6 text-base leading-relaxed break-all ">
            {w("unsaved")}
          </AlertDialog.Description>
          <div className="flex justify-end gap-4">
            <Button
              onClick={() => {
                setIsTabOpen(false);
              }}
            >
              {b("cancel")}
            </Button>

            <Button
              onClick={() => {
                setIsChangeForTab(false);
                setIsTabOpen(false);
                setTabs("view");
              }}
            >
              {b("discard")}
            </Button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default TabRootReset;
