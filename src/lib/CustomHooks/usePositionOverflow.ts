import {
  Dispatch,
  RefObject,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface OverflowRefProp {
  overflowRef: RefObject<HTMLDivElement | null>;
  triggerRef: RefObject<HTMLDivElement | null>;
}

export interface OverflowState {
  show: boolean;
  overflowPosition: { left: string; top: string } | undefined;
}

interface previousValueProp {
  x: number;
  y: number;
}

const usePositionOverflow = ({
  overflowRef,
  triggerRef,
}: OverflowRefProp): [
  OverflowState,
  Dispatch<SetStateAction<OverflowState>>
] => {
  const [overflow, setOverflow] = useState<OverflowState>({
    show: false,
    overflowPosition: undefined,
  });

  const previousValue = useRef<previousValueProp>({
    x: 0,
    y: 0,
  });

  useLayoutEffect(() => {
    const triggerEl = triggerRef.current;
    const overFlowEle = overflowRef.current;

    if (overflow.show && triggerEl && overFlowEle) {
      const triggerElRec = triggerEl.getBoundingClientRect();
      // do not use window.innerWidth , it is not accurate as including scrollbar width and  as aslo in resize because resize eveent occur before  , so use clientWidth in future , if this  will be visible across resize ,
      const innerWidth = document.documentElement.clientWidth;
      const triggerElRecTop = triggerElRec.top;

      // conditional check run
      if (
        previousValue.current!.x !== innerWidth ||
        previousValue.current!.y !== triggerElRecTop
      ) {
        const goRect = overFlowEle.getBoundingClientRect();
        previousValue.current!.x = innerWidth;
        previousValue.current!.y = triggerElRecTop;

        const data =
          triggerElRec.left + triggerElRec.width / 2 - goRect.width / 2;
        const positionX = Math.max(
          8,
          Math.min(data, innerWidth - goRect.width - 8)
        );
        const positionTop = triggerElRecTop - goRect.height;
        const positionBottom = triggerElRec.bottom;
        const positionY =
          positionTop < 70 ? positionBottom + 8 : positionTop - 8;

        setOverflow((pre) => ({
          ...pre,
          overflowPosition: { left: `${positionX}px`, top: `${positionY}px` },
        }));
      }
    }
  }, [overflow.show, triggerRef, overflowRef]);

  return [overflow, setOverflow];
};

export default usePositionOverflow;
