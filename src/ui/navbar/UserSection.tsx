import { cacheUserFn } from "@/utils/cacheUserfn";
import UserProfile from "./UserProfile/UserProfile";
import UnAuthLeftSection from "./UnAuthLeftSection";

async function UserSection() {
  const { user, error } = await cacheUserFn();
  if (error) return null;
  if (!user) return <UnAuthLeftSection />;
  return <UserProfile email={user.user_metadata!.email} />;
}

export default UserSection;
