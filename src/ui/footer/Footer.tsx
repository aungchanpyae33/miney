import Link from "next/link";
import Copyright from "./Copyright";
import { getTranslations } from "next-intl/server";
async function Footer() {
  const b = await getTranslations("block");
  return (
    <footer className="w-full bg-background  block  space-y-4 pt-8">
      <hr className="border-t border-bordersoft" />

      <div className="grid  px-5 grid-cols-1 gap-8">
        <div className="space-y-4 sm:col-span-2 lg:col-auto col-auto">
          <h3 className="font-bold text-lg">{b("noti")}</h3>
          <p className="text-ink-400 text-sm">{b("footerNoti")}</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg">{b("legal")}</h3>
          <ul className="grid grid-cols-2 gap-2">
            <li className="text-ink-400 text-sm">
              <div className=" flex gap-1">
                <span>•</span>
                <Link href={"/privacy"}>
                  <span>{b("privacy")}</span>
                </Link>
              </div>
            </li>
            <li className="text-ink-400 text-sm">
              <div className=" flex gap-1">
                <span>•</span>
                <Link href={"/terms"}>
                  <span>{b("terms")}</span>
                </Link>
              </div>
            </li>
            <li className="text-ink-400 text-sm">
              <div className=" flex gap-1">
                <span>•</span>
                <Link href={"/cookie"}>
                  <span>{b("cookie")}</span>
                </Link>
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg">{b("contact")}</h3>
          <p className="text-ink-400 text-sm"></p>
          <div className="flex flex-col space-y-3">
            <Link
              target="_"
              href={`mailto:${b("email")}`}
              className="text-ink-400 hover:transition-colors text-sm flex items-center gap-2"
            >
              {/* <Mail size={16} /> */}
              <span className=" block truncate">{b("email")}</span>
            </Link>
          </div>
        </div>
      </div>
      <hr className="border-t border-bordersoft" />

      <div className="flex py-3  justify-center items-center">
        <Copyright />
      </div>
    </footer>
  );
}

export default Footer;
