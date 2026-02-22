import { useContext } from "react";
import { ContextMoreOptionUnique } from "./MoreOptionUniqueContext";
import { isTouchPointer } from "@/lib/isTouchPointer";

function OptionItem({
  children,
  isSub,
}: {
  children: React.ReactNode;
  isSub?: boolean;
}) {
  // to reset unique uuid when hover on not sub option item
  const { setUuidState } = useContext(ContextMoreOptionUnique);
  const handleEnter = (e: React.PointerEvent) => {
    if (isTouchPointer(e)) return;
    if (isSub) return;
    setUuidState("");
  };

  return (
    <li
      className="h-12 w-full text-base  relative  hover:bg-cardcontainer active:bg-cardcontainer  flex items-center rounded-md transition-colors duration-200"
      onPointerEnter={handleEnter}
    >
      {children}
    </li>
  );
}

export default OptionItem;
