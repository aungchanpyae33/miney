"use client";

import { returnUserId } from "@/lib/returnUserId";
import { useUserInfoContext } from "../UserInfoFetch/UserInfoContext";
import { getUserProfileClient } from "@/database/client";
import { useQuery } from "@tanstack/react-query";
import ProfileShareButton from "./ProfileShareButton";
import ProfileDeleteButton from "./ProfileDeleteButton";

function ProfileRightSection() {
  const { userInfo } = useUserInfoContext();
  const user_id = returnUserId(userInfo);
  const { data: queryData } = useQuery({
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
  if (!profileData || error || status !== 200) return;
  if (profileData.id.length === 0) return;
  return (
    <>
      <ProfileShareButton id={profileData.id} />
      <ProfileDeleteButton />
    </>
  );
}

export default ProfileRightSection;
