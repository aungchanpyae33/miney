import AuthCheckLoading from "../loading/AuthCheckLoading";
import UserSection from "./UserSection";
import { Suspense } from "react";

function NavLink() {
  return (
    <div className=" flex-1 justify-end max-w-[150px] items-center  pr-2   flex gap-4 text-nowrap">
      <Suspense fallback={<AuthCheckLoading />}>
        <UserSection />
      </Suspense>
    </div>
  );
}

export default NavLink;
