import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "../globals.css";
import Logo from "@/ui/navbar/Logo";
import NavTopBar from "@/ui/navbar/NavTopBar";
import NavLink from "@/ui/navbar/NavLink";
import QueryClientPrv from "@/utils/QueryClient";
import { NextIntlClientProvider } from "next-intl";
import { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";
import PageLoading from "@/ui/loading/PageLoading";
import Footer from "@/ui/footer/Footer";
import ModalBox from "@/ui/general/DialogParent/ModalBox";
import DeviceCheckFetcher from "@/ui/DeviceCheck/DeviceCheckFetcher";
import UserInfoFetcher from "@/ui/UserInfoFetch/UserInfoFetcher";
import { ThemeProvider } from "next-themes";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Miney",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${notoSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="root mx-auto max-w-[600px] w-full py-2">
            <QueryClientPrv>
              <NextTopLoader
                color="#76abae"
                initialPosition={0.08}
                crawlSpeed={200}
                height={4}
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
                  <UserInfoFetcher>
                    <NextIntlClientProvider>
                      <NavTopBar>
                        <Logo />
                        <NavLink />
                      </NavTopBar>
                      <main className=" p-2">{children}</main>
                      <ModalBox />
                      <Footer />
                    </NextIntlClientProvider>
                  </UserInfoFetcher>
                </DeviceCheckFetcher>
              </Suspense>
            </QueryClientPrv>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
