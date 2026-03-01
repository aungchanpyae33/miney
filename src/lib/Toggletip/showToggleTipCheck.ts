import React, { RefObject } from "react";
import { pointerPosition } from "@/ui/general/TogglelTip";
import type { OverflowState } from "../CustomHooks/usePositionOverflow";

interface closeToggleTipProp {
  overflow: OverflowState;
  setOverflow: React.Dispatch<React.SetStateAction<OverflowState>>;
}

export function closeToggleTip({ overflow, setOverflow }: closeToggleTipProp) {
  if (overflow.show) {
    setOverflow((pre) => ({
      ...pre,
      show: false,
    }));
  }
}

interface ToggleTipProps {
  overflow: OverflowState;
  setOverflow: React.Dispatch<React.SetStateAction<OverflowState>>;
  targetElement: HTMLDivElement;
  e: React.WheelEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>;
  pointerPosition: RefObject<pointerPosition>;
}

export function isInside(
  targetElement: HTMLDivElement,
  pointerPosition: RefObject<pointerPosition>,
) {
  const x = pointerPosition!.current!.clientX;
  const y = pointerPosition!.current!.clientY;
  const rect = targetElement.getBoundingClientRect();
  // need to use updated value from mousemove event , using e will give stale x and stale y
  const isPointerInsideForEnter =
    x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  return isPointerInsideForEnter;
}

export const showToggleTipCheck = ({
  overflow,
  setOverflow,
  targetElement,
  e,
  pointerPosition,
}: ToggleTipProps) => {
  const { clientX: x, clientY: y } = e;
  pointerPosition.current.clientX = x;
  pointerPosition.current.clientY = y;

  const isPointerInside = isInside(targetElement, pointerPosition);
  if (isPointerInside && !overflow.show) {
    setOverflow((pre) => ({
      ...pre,
      show: true,
    }));
  }
};
