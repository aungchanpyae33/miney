"use client";
import usePositionOverflow from "@/lib/CustomHooks/usePositionOverflow";
import { isTouchPointer } from "@/lib/isTouchPointer";
import { closeTooltip, showToolTipCheck } from "@/lib/tooltip/showToolTipCheck";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export interface pointerPosition {
  clientX: number;
  clientY: number;
}
function ToolTip({
  children,
  tooltipContent,
}: {
  children: ReactNode;
  tooltipContent: string;
}) {
  const overflowRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const pointerPosition = useRef<pointerPosition>({
    clientX: 0,
    clientY: 0,
  });
  const [overflow, setOverflow] = usePositionOverflow({
    triggerRef,
    overflowRef,
  });
  const setTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // onWheel in ReactComponent is not trigger in sometimes as it is passive true by default. so use addeventlistener
  useEffect(() => {
    function closeTooltipFn() {
      closeTooltip({
        setTimeoutRef,
        overflow,
        setOverflow,
      });
    }
    if (!triggerRef.current) return;
    const toolTipRefCopy = triggerRef.current;
    if (overflow.show) {
      toolTipRefCopy.addEventListener("wheel", closeTooltipFn, {
        passive: false,
      });
    }

    return () => {
      toolTipRefCopy.removeEventListener("wheel", closeTooltipFn);
    };
  }, [setOverflow, overflow]);

  return (
    <div className="group relative w-fit max-w-full cursor-pointer">
      <div
        ref={triggerRef}
        onPointerEnter={(e) => {
          if (isTouchPointer(e)) return;
          const targetElement = e.currentTarget;
          if (!setTimeoutRef.current) {
            showToolTipCheck({
              setTimeoutRef,
              overflow,
              setOverflow,
              targetElement,
              e,
              delay: 1000,
              pointerPosition,
            });
          }
        }}
        // need to update pointePosition to use for  the function setTimeout
        onPointerMove={(e) => {
          if (isTouchPointer(e)) return;
          const { clientX: x, clientY: y } = e;
          pointerPosition.current.clientX = x;
          pointerPosition.current.clientY = y;
        }}
        //{...} is used to inset js expression ,
        // {...(overflow.show && {
        //   onWheel: (e) => {
        //  above comment is for the past idea to add onwheel on condition
        onPointerLeave={(e) => {
          if (isTouchPointer(e)) return;
          closeTooltip({
            setTimeoutRef,
            overflow,
            setOverflow,
          });
        }}
        className=" truncate"
      >
        {children}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {overflow.show && (
          <>
            {/* ref element should not have any transform value in order to calculate the position correctly when using with motion */}
            {createPortal(
              <motion.div
                className="fixed bg-cardcontainer z-30 max-w-[calc(100%-7%)] border  rounded border-semicontainer shadow-md  pointer-events-none"
                ref={overflowRef}
                style={overflow.overflowPosition}
              >
                <motion.div
                  className={clsx(
                    " w-full p-2 text-sm  shadow-[0_4px_8px_rgba(0,0,0,0.3)]",
                  )}
                  initial={{ opacity: 0.5, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {tooltipContent}
                </motion.div>
              </motion.div>,
              document.body,
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ToolTip;
