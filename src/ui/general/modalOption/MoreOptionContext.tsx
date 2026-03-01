"use client";
import { createContext, ReactNode, SetStateAction, useState } from "react";

interface ContextMoreOptionValue {
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
}

interface MoreOptionContextProps {
  children: ReactNode;
}
export const ContextMoreOption = createContext<ContextMoreOptionValue>({
  show: false,
  setShow: () => {},
});

function MoreOptionContext({ children }: MoreOptionContextProps) {
  const [show, setShow] = useState(false);
  const value = { show, setShow };

  return (
    <ContextMoreOption.Provider value={value}>
      {children}
    </ContextMoreOption.Provider>
  );
}

export default MoreOptionContext;
