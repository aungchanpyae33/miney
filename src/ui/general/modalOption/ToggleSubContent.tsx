import { RefObject, useContext, useRef } from "react";
import clsx from "clsx";
import FocusTrap from "../FocusTrap";
import { ContextDevice } from "@/ui/DeviceCheck/DeviceCheckContext";
import {
  motion,
  useAnimate,
  useDragControls,
  useMotionValue,
} from "motion/react";
import TipUi from "../TipUi";
import { ContextMoreOption } from "./MoreOptionContext";
import { ContextMoreOptionStack } from "./MoreOptionStackContext";
import { ContextMoreOptionUnique } from "./MoreOptionUniqueContext";
import useFocusOnOpen from "@/lib/CustomHooks/useFocusOpen";
import { useToggleContentPosition } from "@/lib/CustomHooks/useToggleContentPosition";
import useOutterClickSub from "@/lib/CustomHooks/useOutterClickSub";

interface ToggleSubContentMobileProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  stackNum: number;
  stayShow: boolean;
}

const bottom = 20;
// to sastify the bottom-5 in close
function ToggleSubContentMobile({
  children,
  stackNum,
  stayShow,
}: ToggleSubContentMobileProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controls = useDragControls();
  const [scope, animate] = useAnimate();
  const y = useMotionValue(0);
  const { setShow } = useContext(ContextMoreOption);
  const { setStack, stack } = useContext(ContextMoreOptionStack);

  const { uuidState } = useContext(ContextMoreOptionUnique);

  function onCloseAnimation() {
    const yStart = typeof y.get() === "number" ? y.get() : 0;
    const height = containerRef.current
      ? containerRef.current.getBoundingClientRect().height
      : 0;

    const backdropAnim = animate(
      "#backDrop",
      { opacity: 0 },
      { duration: 0.25, ease: "easeInOut" },
    );

    const drawerAnim = animate(
      "#drawer",
      { y: [yStart, height + bottom] },
      { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
    );

    Promise.all([backdropAnim.finished, drawerAnim.finished]).then(() => {
      setStack(0);
      setShow(false);
    });
  }
  useFocusOnOpen(stayShow, containerRef);
  return (
    <div ref={scope} className="z-50">
      <FocusTrap refFocus={containerRef}>
        <motion.div
          onClick={(e) => {
            if (e.target === e.currentTarget) return;
            onCloseAnimation();
          }}
          id="drawer"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{
            ease: "easeInOut",
          }}
          className={clsx(
            " fixed z-10 p-2   bottom-5 left-2 right-2 overflow-hidden rounded-md bg-pop",
            {
              hidden: stackNum !== stack && uuidState !== "",
            },
          )}
          style={{ y }}
          drag="y"
          dragControls={controls}
          onDragEnd={(_, info) => {
            if (info.offset.y > 60) {
              onCloseAnimation();
            }
          }}
          dragListener={false}
          dragConstraints={{
            top: 0,
            bottom: 0,
          }}
          ref={containerRef}
          tabIndex={-1}
          dragElastic={{
            top: 0,
            bottom: 0.5,
          }}
        >
          <TipUi controls={controls} />
          <div className="min-w-[200px]">{children}</div>
        </motion.div>
        <motion.div
          id="backDrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut" }}
          onClick={onCloseAnimation}
          aria-hidden
          className={clsx("fixed  top-0 left-0 bottom-0 right-0 bg-backdrop", {
            hidden: stackNum !== stack && uuidState !== "",
          })}
        ></motion.div>
      </FocusTrap>
    </div>
  );
}

function ToggleSubContentFloat({
  parentRef,
  children,
  stackNum,
  stayShow,
}: ToggleSubContentProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position] = useToggleContentPosition({
    parentRef,
    containerRef,
  });
  // outterclickSub is to detect only click is inside portal and targert parent trigger
  useOutterClickSub(containerRef, stackNum);
  useFocusOnOpen(stayShow, containerRef);
  return (
    <FocusTrap refFocus={containerRef}>
      <div
        className={clsx(
          " fixed  z-30 max-w-full bg-pop   overflow-auto max-h-full   border-opacity-25 border border-bordersoft left-0 top-0 p-1 rounded-md",
        )}
        ref={containerRef}
        style={position}
        tabIndex={-1}
      >
        <div className="min-w-[200px]">{children}</div>
        {/* to avoid re-render cause of position */}
      </div>
    </FocusTrap>
  );
}

interface ToggleSubContentProps extends React.ComponentProps<"div"> {
  parentRef: RefObject<HTMLButtonElement | null>;
  children: React.ReactNode;
  stackNum: number;
  stayShow: boolean;
}
function ToggleSubContent({
  parentRef,
  children,
  stackNum,
  stayShow,
}: ToggleSubContentProps) {
  const { device } = useContext(ContextDevice);
  return device !== "mobile" ? (
    <ToggleSubContentFloat
      parentRef={parentRef}
      stackNum={stackNum}
      stayShow={stayShow}
    >
      {children}
    </ToggleSubContentFloat>
  ) : (
    <ToggleSubContentMobile stackNum={stackNum} stayShow={stayShow}>
      {children}
    </ToggleSubContentMobile>
  );
}

export default ToggleSubContent;
