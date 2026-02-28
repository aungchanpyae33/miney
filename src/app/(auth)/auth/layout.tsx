import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import "../../globals.css";
import { Noto_Sans, Noto_Sans_Myanmar } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import PageLoading from "@/ui/loading/PageLoading";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import GeneralSettingOption from "@/ui/navbar/GeneralSettingOption";
import DeviceCheckFetcher from "@/ui/DeviceCheck/DeviceCheckFetcher";
export const metadata: Metadata = {
  title: {
    template: "%s | Miney",
    default: "Miney",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};
const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
});

const notoSansMyanmar = Noto_Sans_Myanmar({
  subsets: ["myanmar"],
  display: "swap",
  weight: "400",
});
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${notoSans.className} ${notoSansMyanmar.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {" "}
          <NextTopLoader
            color="#76abae"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #76abae,0 0 5px #76abae"
            template='<div class="bar" role="bar"><div class="peg"></div></div>' // no spinner
            zIndex={1600}
            showAtBottom={false}
          />
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
        </ThemeProvider>
      </body>
    </html>
  );
}
