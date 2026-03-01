import Button from "@/components/button/Button";
import {
  IsChangeForTabProps,
  SetIsTabOpenProps,
  setTabsProps,
  useChangeTab,
  useCheckChangeForTab,
  useCheckTabOpen,
} from "@/lib/zustand";
import { ReactNode } from "react";

function ViewSwitcherButton({ children }: { children: ReactNode }) {
  const setIsTabOpen = useCheckTabOpen(
    (state: SetIsTabOpenProps) => state.setIsTabOpen,
  );
  const setTabs = useChangeTab((state: setTabsProps) => state.setTabs);
  const isChangeForTab = useCheckChangeForTab(
    (state: IsChangeForTabProps) => state.isChangeForTab,
  );
  return (
    <Button
      className="flex bg-transparent hover:brightness-100 relative  h-10 items-center focus:ring-0 justify-center border-0 p-0 rounded-none text-inherit px-2 text-sm   outline-none select-none before:inset-x-0 before:inset-y-1 before:rounded-sm before:-outline-offset-1 before:outline-blue-800
            focus-visible:ring-2 focus-visible:-ring-offset-0 focus-visible:ring-blue-800   focus-visible:relative focus-visible:before:absolute focus-visible:before:outline focus-visible:before:outline-2"
      onClick={() => {
        if (isChangeForTab) {
          setIsTabOpen(true);
        } else {
          setTabs("view");
        }
      }}
    >
      {children}
    </Button>
  );
}

export default ViewSwitcherButton;
