"use client";

import InfoMessage from "./InfoBox/InfoMessage";
import TabRootReset from "./notiReset/TabRootReset";
import ProfileDelete from "./profileDelete/ProfileDelete";
import UserDelete from "./userDelete/UserDelete";

function ModalBox() {
  return (
    <>
      <UserDelete />
      <ProfileDelete />
      <TabRootReset />
      <InfoMessage />
    </>
  );
}

export default ModalBox;
