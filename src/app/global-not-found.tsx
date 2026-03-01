import "./globals.css";
import { Noto_Sans, Noto_Sans_Myanmar } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { GlobalNotFoundIcon } from "@/ui/profile/formChild/icons";
import { Suspense } from "react";
import NotFoundText from "@/ui/general/globalNotFound/NotFoundText";
import BackToHomePage from "@/ui/general/globalNotFound/BackToHomePage";
import NotFoundTextLoading from "@/ui/loading/NotFoundTextLoading";

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
  title: "404 - Page Not Found | Miney",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
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
          <div className=" flex gap-3 flex-col justify-center  min-h-screen max-h-screen items-center ">
            <GlobalNotFoundIcon className=" text-ink-400" />

            <Suspense fallback={<NotFoundTextLoading />}>
              <NotFoundText />
              <BackToHomePage />
            </Suspense>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
