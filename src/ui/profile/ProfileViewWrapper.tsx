import ProfileViewContent from "./ProfileViewContent";
import { useQuery } from "@tanstack/react-query";
import { getUserProfileClient } from "@/database/client";
import EmptyData from "../general/EmptyData";
import ProfileLoading from "../loading/ProfileLoading";
import { useUserInfoContext } from "../UserInfoFetch/UserInfoContext";
import { returnUserId } from "@/lib/returnUserId";
function ProfileViewWrapper() {
  const { userInfo } = useUserInfoContext();
  const user_id = returnUserId(userInfo);
  const {
    data: queryData,
    error: queryError,
    isFetching,
  } = useQuery({
    queryKey: ["user-profile", user_id],
    queryFn: () => getUserProfileClient(),
    enabled: !!user_id,
  });

  const {
    data: profileData,
    error,
    status,
  } = queryData || {
    data: null,
    error: "something went wrong",
  };

  if (isFetching) return <ProfileLoading />;
  if (!profileData || error || status !== 200 || queryError)
    return <EmptyData />;
  return <ProfileViewContent profileData={profileData} />;
}

export default ProfileViewWrapper;
