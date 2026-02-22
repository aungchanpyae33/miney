import { useContext } from "react";
import { twMerge } from "tailwind-merge";
import { ContextMoreOption } from "./MoreOptionContext";
import { ContextDevice } from "@/ui/DeviceCheck/DeviceCheckContext";

interface OptionButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  action?: () => void | Promise<void>;
  isSub?: boolean;
}
const baseStyle = "flex w-full h-full items-center";
function OptionButton({
  className,
  children,
  action,
  isSub,
  ...props
}: OptionButtonProps) {
  const { setShow } = useContext(ContextMoreOption);
  const { device } = useContext(ContextDevice);
  function handlClick() {
    if (isSub) return;
    if (action) action();
    if (device !== "mobile") setShow(false);
  }
  return (
    <button
      onClick={handlClick}
      className={twMerge(baseStyle, className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default OptionButton;
