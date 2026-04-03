import { ReactNode } from "react";
import GeneralSettingOption from "@/ui/navbar/GeneralSettingOption";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" root container lg:max-w-[1200px]  mx-auto">
      <div className=" absolute right-4 top-4">
        <GeneralSettingOption />
      </div>

      {children}
    </div>
  );
}
