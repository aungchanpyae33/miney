import ProfileViewContent from "../profile/ProfileViewContent";
import EmptyData from "../general/EmptyData";
import { getUserDynamicProfileCache } from "@/database/serverCacheData";

async function DynamicViewProfile({ id }: { id: string }) {
  const { data, status } = await getUserDynamicProfileCache(id);

  if (!data || status !== 200) return <EmptyData />;
  return <ProfileViewContent profileData={data} />;
}

export default DynamicViewProfile;
