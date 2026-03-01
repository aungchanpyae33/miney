"use client";
import { Trash2 } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import { deleteProfileAction, useDeleteProfile } from "@/lib/zustand";

function ProfileDeleteButton() {
  const deleteProfileAction = useDeleteProfile(
    (state: deleteProfileAction) => state.deleteProfileAction,
  );

  function handleClick() {
    deleteProfileAction(true);
  }
  return (
    <button className="p-2 bg-zonecontainer rounded-full" onClick={handleClick}>
      <IconWrapper Icon={Trash2} size="exSmall" />
    </button>
  );
}

export default ProfileDeleteButton;
