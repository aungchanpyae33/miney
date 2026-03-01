import { userFetch } from "@/lib/userFetch";
import { ReactNode } from "react";
import UserInfoContext from "./UserInfoContext";

async function UserInfoFetcher({ children }: { children: ReactNode }) {
  const user = await userFetch();
  return <UserInfoContext user={user}>{children}</UserInfoContext>;
}

export default UserInfoFetcher;
