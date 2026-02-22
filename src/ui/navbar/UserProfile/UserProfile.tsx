import IconWrapper from "@/ui/general/IconWrapper";
import UserProfileContainer from "./UserProfileContainer";
import MoreOption from "@/ui/general/modalOption/MoreOption";
import MoreOptionContext from "@/ui/general/modalOption/MoreOptionContext";
import { User } from "lucide-react";

export default function UserProfile({ email }: { email: string }) {
  return (
    <MoreOptionContext>
      <MoreOption
        staticDrop={true}
        targetElement={<UserProfileContainer email={email} />}
        triggerEl={
          <div className=" p-2 bg-cardcontainer rounded-full">
            <IconWrapper Icon={User} size="small" />
          </div>
        }
      />
    </MoreOptionContext>
  );
}
