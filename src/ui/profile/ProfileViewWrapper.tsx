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

  const { data: profileData, status } = queryData || {
    data: null,
    error: "something went wrong",
    status: !user_id ? 401 : 500,
  };

  if (isFetching) return <ProfileLoading />;
  if (queryError || (status !== 200 && status !== 401)) {
    throw new Error("page-load-error");
  }
  if (!profileData || status !== 200) return <EmptyData />;
  return <ProfileViewContent profileData={profileData} />;
}

export default ProfileViewWrapper;
