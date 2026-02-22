import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <div className=" px-4 flex-1 flex items-center">
      <Link href={"/"}>
        <Image
          src={"/logo.svg"}
          width={100}
          height={47}
          alt="logo"
          className=""
        />
      </Link>
    </div>
  );
}

export default Logo;
