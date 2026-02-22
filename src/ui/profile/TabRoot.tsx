"use client";
import { setTabsProps, tabsProps, useChangeTab } from "@/lib/zustand";
import { AnimatePresence } from "motion/react";
import { ReactNode, useRef } from "react";
import { motion } from "motion/react";
import Button from "@/components/button/Button";
import clsx from "clsx";
import IconWrapper from "../general/IconWrapper";
import { Eye, Pencil } from "lucide-react";
import ViewSwitcherButton from "./ViewSwitcherButton";
function TabRoot({
  editChild,
  viewChild,
  deleteButton,
  shareButton,
}: {
  editChild: ReactNode;
  viewChild: ReactNode;
  deleteButton: ReactNode;
  shareButton: ReactNode;
}) {
  const stickyRef = useRef<HTMLTableSectionElement | null>(null);
  const tabs = useChangeTab((state: tabsProps) => state.tabs);
  const setTabs = useChangeTab((state: setTabsProps) => state.setTabs);
  // const [open, setOpen] = useState(false);
  return (
    <div className=" w-full" defaultValue="overview">
      <div className=" w-full h-[0.1px] opacity-0" ref={stickyRef}></div>

      <div
        className={clsx(
          " sticky bg-background mb-6 rounded-b-md top-0 isolate z-50 w-full p-1",
        )}
      >
        <div className=" flex bg-cardcontainer overflow-hidden rounded-md gap-1 border border-bordersoft p-1 relative ">
          <Button
            className="flex bg-transparent hover:brightness-100 relative  h-10 items-center focus:ring-0 justify-center border-0 p-0 rounded-none text-inherit px-2 text-sm   outline-none select-none before:inset-x-0 before:inset-y-1 before:rounded-sm before:-outline-offset-1 before:outline-blue-800  
            focus-visible:ring-2 focus-visible:-ring-offset-0 focus-visible:ring-blue-800
            focus-visible:relative focus-visible:before:absolute focus-visible:before:outline focus-visible:before:outline-2"
            onClick={() => {
              setTabs("edit");
            }}
          >
            <IconWrapper
              Icon={Pencil}
              size="exSmall"
              className="z-10 w-8 sm:w-12 "
            />
            {tabs === "edit" && (
              <motion.div
                layoutId="indicator"
                className="absolute z-0 w-full bottom-0 left-0 h-full bg-zonecontainer rounded"
              />
            )}
          </Button>
          <ViewSwitcherButton>
            <IconWrapper
              Icon={Eye}
              size="exSmall"
              className=" z-10 w-8 sm:w-12 "
            />
            {tabs === "view" && (
              <motion.div
                layoutId="indicator"
                className="absolute z-0 w-full bottom-0 left-0 h-full bg-zonecontainer rounded"
              />
            )}
          </ViewSwitcherButton>

          <div
            className={clsx(
              "absolute right-3 top-0  rounded-full transition-transform h-full flex items-center justify-center gap-4 duration-[300ms] ease-in-out",
            )}
          >
            {shareButton}
            {deleteButton}
          </div>
        </div>
      </div>
      <div className="mx-auto w-full">
        <AnimatePresence mode="wait" initial={false}>
          {tabs === "edit" ? editChild : viewChild}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default TabRoot;
