import { useEffect } from "react";
const wheelOpt: AddEventListenerOptions & EventListenerOptions = {
  passive: false,
};
export function useDisableScroll(show: boolean) {
  useEffect(() => {
    function preventDefault(e: WheelEvent | TouchEvent) {
      e.preventDefault();
    }

    function preventKeyScroll(e: KeyboardEvent) {
      const keys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Space",
        "PageUp",
        "PageDown",
        "Home",
        "End",
      ];
      if (keys.indexOf(e.code) !== -1) {
        e.preventDefault();
      }
    }
    if (show) {
      document.addEventListener("wheel", preventDefault, wheelOpt);
      document.addEventListener("touchmove", preventDefault, wheelOpt);
      document.addEventListener("keydown", preventKeyScroll);
    }
    return () => {
      document.removeEventListener("wheel", preventDefault, wheelOpt);
      document.removeEventListener("touchmove", preventDefault, wheelOpt);
      document.removeEventListener("keydown", preventKeyScroll);
    };
  }, [show]);
}
