"use client";
import Button from "@/components/button/Button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { NeedToSignInIcon } from "../profile/formChild/icons";

function NeedToSignIn() {
  const b = useTranslations("block");
  const au = useTranslations("Auth");
  const w = useTranslations("WarningMsg");
  return (
    <span className=" absolute flex justify-center inset-0 rounded-3xl  bg-backdrop">
      <div className="mt-20 max-w-[400px] justify-center text-center flex flex-col items-center rounded-xl shadow-sm space-y-6 bg-pop shadow-shadow border border-bordersoft h-fit p-4 w-[95%] mx-auto">
        <NeedToSignInIcon width={50} height={50} />
        <p className=" font-semibold sm:text-lg text-base ">
          {w("needToLogin")}
        </p>
        <p className="text-sm font-light ">{b("needLoginForm")}</p>
        <div className="">
          <Link href="/auth/login">
            <Button className=" w-52">{b("login")}</Button>
          </Link>
        </div>
        <p className="text-sm font-light">
          {au.rich("noAcc", {
            link: (chunks) => (
              <Link href="/auth/sign-up" className=" underline">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
    </span>
  );
}

export default NeedToSignIn;
