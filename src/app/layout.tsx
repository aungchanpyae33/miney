import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import PageLoading from "@/ui/loading/PageLoading";
import DeviceCheckFetcher from "@/ui/DeviceCheck/DeviceCheckFetcher";
import { NextIntlClientProvider } from "next-intl";
import { outputBaseUrl } from "@/lib/outputBaseUrl";
import LayoutLocalFetch from "@/ui/general/layout/LocalLayoutFetch";

export const metadata: Metadata = {
  title: {
    template: "%s | Miney",
    default: "Miney",
  },
  verification: {
    google: "qUiD6zMa2G5hXsaRx_P2lfhYardVPp1UbjZDHvj_ulA",
  },
  metadataBase: outputBaseUrl(),
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    url: "/",
    siteName: "Miney",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<PageLoading />}>
      <LayoutLocalFetch>
        <body className="antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
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
            <DeviceCheckFetcher>
              <NextIntlClientProvider>{children}</NextIntlClientProvider>
            </DeviceCheckFetcher>
          </ThemeProvider>
        </body>
      </LayoutLocalFetch>
    </Suspense>
  );
}
