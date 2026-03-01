import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Myanmar } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
});

const notoSansMyanmar = Noto_Sans_Myanmar({
  subsets: ["myanmar"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Miney",
    default: "Miney",
  },
  verification: {
    google: "qUiD6zMa2G5hXsaRx_P2lfhYardVPp1UbjZDHvj_ulA",
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
      <body
        className={`${notoSans.className} ${notoSansMyanmar.className} antialiased`}
      >
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
