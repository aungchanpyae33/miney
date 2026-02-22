"use client";

import usePositionOverflow from "@/lib/CustomHooks/usePositionOverflow";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ComponentProps, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

export interface PointerPosition {
  clientX: number;
  clientY: number;
}

const baseStyle = "truncate select-none";

interface TipToastProps extends ComponentProps<"div"> {
  children: ReactNode;
  tipToastContent: string;
  removeTime?: number;
}

function TipToast({
  children,
  tipToastContent,
  removeTime = 1000,
  className,
  ...props
}: TipToastProps) {
  const overflowRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const [overflow, setOverflow] = usePositionOverflow({
    overflowRef,
    triggerRef,
  });

  const setTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleTipToastShow() {
      if (!setTimeoutRef.current) {
        setOverflow((pre) => ({
          ...pre,
          show: true,
        }));

        setTimeoutRef.current = setTimeout(() => {
          setOverflow((pre) => ({
            ...pre,
            show: false,
          }));
          setTimeoutRef.current = null;
        }, removeTime);
      }
    }

    handleTipToastShow();
  }, [setOverflow, removeTime]);

  return (
    <div className="group relative h-full min-w-0 w-fit max-w-full cursor-pointer">
      <div
        ref={triggerRef}
        className={twMerge(baseStyle, className)}
        {...props}
      >
        {children}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {overflow.show && (
          <>
            {/* ref element should not have any transform value in order to calculate the position correctly when using with motion */}
            {createPortal(
              <motion.div
                className="fixed bg-cardcontainer z-30 max-w-[calc(100%-7%)] border rounded border-semicontainer shadow-md pointer-events-none"
                ref={overflowRef}
                style={overflow.overflowPosition}
              >
                <motion.div
                  className={clsx(
                    "w-full p-2 text-sm truncate shadow-[0_4px_8px_rgba(0,0,0,0.3)]",
                  )}
                  initial={{ opacity: 0.5, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {tipToastContent}
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

export default TipToast;
