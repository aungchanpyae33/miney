"use client";
import { supabase } from "@/database/supabaseClient";
import type { JwtPayload } from "@supabase/supabase-js";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
export interface ContextUserInfoProps {
  userInfo: JwtPayload | undefined;
  setUserInfo: Dispatch<SetStateAction<JwtPayload | undefined>>;
}
export const ContextUserInfo = createContext<ContextUserInfoProps>({
  userInfo: undefined,
  setUserInfo: () => {},
});

export const useUserInfoContext = () => {
  const context = useContext(ContextUserInfo);
  if (context === undefined) {
    throw new Error(`useUserInfo must be used within a UserInfoContext.`);
  }
  return context;
};
function UserInfoContext({
  user,
  children,
}: {
  user: ContextUserInfoProps["userInfo"];
  children: ReactNode;
}) {
  const [userInfo, setUserInfo] = useState(user);
  const value = { userInfo, setUserInfo };
  useEffect(() => {
    const supabaseClient = supabase;
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        setUserInfo(undefined);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <ContextUserInfo.Provider value={value}>
      {children}
    </ContextUserInfo.Provider>
  );
}

export default UserInfoContext;
