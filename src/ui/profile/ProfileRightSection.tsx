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
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["user-profile", user_id],
    queryFn: () => getUserProfileClient(),
    enabled: !!user_id,
  });
  const { data: profileData, status } = queryData || {
    data: null,
    error: "something went wrong",
    status: !user_id ? 401 : 500,
  };
  if (queryError || (status !== 200 && status !== 401)) {
    throw new Error("page-load-error");
  }
  if (!profileData || status !== 200) return;
  if (profileData.id.length === 0) return;
  return (
    <>
      <ProfileShareButton id={profileData.id} />
      <ProfileDeleteButton />
    </>
  );
}

export default ProfileRightSection;
