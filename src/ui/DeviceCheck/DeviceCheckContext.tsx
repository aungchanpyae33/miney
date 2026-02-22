"use client";
import { createContext, ReactNode } from "react";
export interface ContextDeviceProps {
  device:
    | "mobile"
    | "tablet"
    | "console"
    | "smarttv"
    | "wearable"
    | "xr"
    | "embedded"
    | "desktop";
}
export const ContextDevice = createContext<ContextDeviceProps>({
  device: "mobile",
});
function DeviceCheckContext({
  device,
  children,
}: {
  device: ContextDeviceProps["device"];
  children: ReactNode;
}) {
  const value = { device };
  return (
    <ContextDevice.Provider value={value}>{children}</ContextDevice.Provider>
  );
}

export default DeviceCheckContext;
