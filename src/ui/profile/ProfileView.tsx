"use client";
import { motion } from "motion/react";
import ProfileViewWrapper from "./ProfileViewWrapper";

function ProfileView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-cardcontainer shadow-[_3px_-3px_var(--semicontainer)]   rounded-3xl flex flex-col items-center gap-10"
    >
      <ProfileViewWrapper />
    </motion.div>
  );
}

export default ProfileView;
