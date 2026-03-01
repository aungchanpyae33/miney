import type { OverflowState } from "../CustomHooks/usePositionOverflow";

interface useShowTipToastProps {
  overflow: OverflowState;
  setOverflow: React.Dispatch<React.SetStateAction<OverflowState>>;
}
export const showTipToast = ({
  overflow,
  setOverflow,
}: useShowTipToastProps) => {
  if (!overflow.show) {
    setOverflow((pre) => ({
      ...pre,
      show: true,
    }));
  }
};
