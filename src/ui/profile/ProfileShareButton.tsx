"use client";
import { Check, Link } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import { useQuery } from "@tanstack/react-query";
import { getUserProfileClient } from "@/database/client";
import { useRef, useState } from "react";
import TipToast from "../general/TipToast";
import { useTranslations } from "next-intl";
import { useUserInfoContext } from "../UserInfoFetch/UserInfoContext";
import { returnUserId } from "@/lib/returnUserId";
const handleCopy = async (id: string) => {
  const origin = window.location.origin;

  try {
    await navigator.clipboard.writeText(`${origin}/user/${id}`);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
const removeTime = 1000;
function ProfileShareButton() {
  const { userInfo } = useUserInfoContext();
  const user_id = returnUserId(userInfo);
  const { data: queryData } = useQuery({
    queryKey: ["user-profile", user_id],
    queryFn: () => getUserProfileClient(),
    enabled: !!user_id,
  });
  const b = useTranslations("block");
  const [click, setClick] = useState(false);
  const {
    data: profileData,
    error,
    status,
  } = queryData || {
    data: null,
    error: "something went wrong",
  };

  const settimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  if (!profileData || error || status !== 200) return;
  if (profileData.id.length === 0) return;
  const id = profileData.id;

  function handleLinkClick() {
    if (!settimeoutRef.current) {
      setClick(true);
      handleCopy(id);
      settimeoutRef.current = setTimeout(() => {
        setClick(false);
        settimeoutRef.current = null;
      }, removeTime);
    }
  }
  return (
    <button className="mx-1" onClick={handleLinkClick}>
      {click ? (
        <TipToast
          className=" flex  items-center h-full justify-center"
          tipToastContent={b("profileLinkCopy")}
        >
          <IconWrapper Icon={Check} size="exSmall" />
        </TipToast>
      ) : (
        <IconWrapper Icon={Link} size="exSmall" />
      )}
    </button>
  );
}

export default ProfileShareButton;
