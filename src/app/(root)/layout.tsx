import Logo from "@/ui/navbar/Logo";
import NavTopBar from "@/ui/navbar/NavTopBar";
import NavLink from "@/ui/navbar/NavLink";
import QueryClientPrv from "@/utils/QueryClient";
import { Suspense } from "react";
import PageLoading from "@/ui/loading/PageLoading";
import Footer from "@/ui/footer/Footer";
import ModalBox from "@/ui/general/DialogParent/ModalBox";
import UserInfoFetcher from "@/ui/UserInfoFetch/UserInfoFetcher";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="root mx-auto max-w-[600px] w-full py-2">
      <QueryClientPrv>
        <Suspense fallback={<PageLoading />}>
          <UserInfoFetcher>
            <NavTopBar>
              <Logo />
              <NavLink />
            </NavTopBar>
            <main className=" p-2">{children}</main>
            <ModalBox />
            <Footer />
          </UserInfoFetcher>
        </Suspense>
      </QueryClientPrv>
    </div>
  );
}
