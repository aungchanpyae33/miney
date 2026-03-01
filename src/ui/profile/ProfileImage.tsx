import Image from "next/image";

function ProfileImage() {
  return (
    <div>
      <div className="  lg:size-[300px] size-[250px] relative  ">
        <Image
          src={"/Generated Image October 31, 2025 - 12_16PM.png"}
          alt="this is image"
          fill
        />
      </div>
    </div>
  );
}

export default ProfileImage;
