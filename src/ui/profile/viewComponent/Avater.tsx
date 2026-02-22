import Image from "next/image";

function Avater({ url }: { url: string }) {
  return (
    <div className="relative overflow-hidden rounded-full size-36 sm:size-40 ">
      <Image src={url} fill sizes="160px" alt="user profile picture" />
    </div>
  );
}

export default Avater;
