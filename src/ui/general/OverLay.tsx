import { twMerge } from "tailwind-merge";

interface OverLayProp extends React.ComponentProps<"div"> {
  className?: string;
}
const baseStyle = "fixed top-0 left-0 bottom-0 right-0";
function OverLay({ className, ...props }: OverLayProp) {
  return <div className={twMerge(baseStyle, className)} {...props}></div>;
}

export default OverLay;
