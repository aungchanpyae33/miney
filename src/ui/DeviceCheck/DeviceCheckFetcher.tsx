import { DeviceCheck } from "@/lib/DeviceCheck";
import DeviceCheckContext from "./DeviceCheckContext";

async function DeviceCheckFetcher({ children }: { children: React.ReactNode }) {
  const device = await DeviceCheck();
  return <DeviceCheckContext device={device}>{children}</DeviceCheckContext>;
}

export default DeviceCheckFetcher;
