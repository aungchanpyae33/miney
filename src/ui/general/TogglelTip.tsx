"use client";

import usePositionOverflow from "@/lib/CustomHooks/usePositionOverflow";
import {
  closeToggleTip,
  showToggleTipCheck,
} from "@/lib/Toggletip/showToggleTipCheck";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ComponentProps, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

export interface pointerPosition {
  clientX: number;
  clientY: number;
}
const baseStyle = "truncate select-none";

interface TogglelTipProps extends ComponentProps<"div"> {
  children: ReactNode;
  toggleTipContent: string;
}
function ToggleTip({
  children,
  toggleTipContent,
  className,
  ...props
}: TogglelTipProps) {
  const overflowRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const pointerPosition = useRef<pointerPosition>({
    clientX: 0,
    clientY: 0,
  });
  const [overflow, setOverflow] = usePositionOverflow({
    overflowRef,
    triggerRef,
  });

  useEffect(() => {
    function closeTooltipFn() {
      closeToggleTip({
        overflow,
        setOverflow,
      });
    }
    if (!triggerRef.current) return;
    const triggerEl = triggerRef.current;
    if (overflow.show) {
      triggerEl.addEventListener("wheel", closeTooltipFn, {
        passive: false,
      });
    }

    return () => {
      triggerEl.removeEventListener("wheel", closeTooltipFn);
    };
  }, [setOverflow, overflow]);

  return (
    <div className="group relative h-full  min-w-0 w-fit max-w-full  cursor-pointer">
      <div
        ref={triggerRef}
        onPointerDown={(e) => {
          const targetElement = e.currentTarget;
          showToggleTipCheck({
            overflow,
            setOverflow,
            targetElement,
            pointerPosition,
            e,
          });
        }}
        onPointerLeave={() =>
          closeToggleTip({
            overflow,
            setOverflow,
          })
        }
        className={twMerge(baseStyle, className)}
        {...props}
      >
        {children}
      </div>
      <AnimatePresence>
        {overflow.show && (
          //need to add fragment to avoid motion error
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
                    " w-full p-2 text-sm truncate  shadow-[0_4px_8px_rgba(0,0,0,0.3)]",
                  )}
                  initial={{ opacity: 0.5, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0.5, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {toggleTipContent}
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

export default ToggleTip;
