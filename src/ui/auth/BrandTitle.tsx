import Image from "next/image";

function BrandTitle() {
  return (
    <div className=" flex items-center justify-center">
      <Image src={"/logo.svg"} width={90} height={47} alt="logo" className="" />
    </div>
  );
}

export default BrandTitle;
