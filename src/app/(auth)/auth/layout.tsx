import { ReactNode, Suspense } from "react";
import PageLoading from "@/ui/loading/PageLoading";
import { NextIntlClientProvider } from "next-intl";
import GeneralSettingOption from "@/ui/navbar/GeneralSettingOption";
import DeviceCheckFetcher from "@/ui/DeviceCheck/DeviceCheckFetcher";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<PageLoading />}>
      <DeviceCheckFetcher>
        <NextIntlClientProvider>
          <div className=" root container lg:max-w-[1200px]  mx-auto">
            <div className=" absolute right-4 top-4">
              <GeneralSettingOption />
            </div>

            {children}
          </div>
        </NextIntlClientProvider>
      </DeviceCheckFetcher>
    </Suspense>
  );
}
