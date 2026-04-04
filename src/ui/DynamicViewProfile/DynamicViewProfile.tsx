import ProfileViewContent from "../profile/ProfileViewContent";
import EmptyData from "../general/EmptyData";
import { getUserDynamicProfileCache } from "@/database/serverCacheData";

async function DynamicViewProfile({ id }: { id: string }) {
  const { data, status, error } = await getUserDynamicProfileCache(id);
  if (error || status !== 200) {
    throw new Error("page-load-error");
  }
  if (!data) return <EmptyData />;
  return <ProfileViewContent profileData={data} />;
}

export default DynamicViewProfile;
