import Image from "next/image";

function BrandTitle() {
  return (
    <div className=" flex items-center justify-center">
      <Image
        src={"/logo.svg"}
        width={100}
        height={26.7}
        alt="logo"
        className=""
      />
    </div>
  );
}

export default BrandTitle;
