"use client";
import { Check, Link } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import { useRef, useState } from "react";
import TipToast from "../general/TipToast";
import { useTranslations } from "next-intl";
const handleCopy = async (id: string) => {
  const origin = window.location.origin;

  try {
    await navigator.clipboard.writeText(`${origin}/user/${id}`);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
const removeTime = 1000;
function ProfileShareButton({ id }: { id: string }) {
  const b = useTranslations("block");
  const [click, setClick] = useState(false);

  const settimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
