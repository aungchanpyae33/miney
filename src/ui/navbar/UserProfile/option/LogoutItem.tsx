import IconWrapper from "@/ui/general/IconWrapper";
import OptionIconEl from "@/ui/general/modalOption/OptionIconEl";
import OptionItem from "@/ui/general/modalOption/OptionItem";
import OptionText from "@/ui/general/modalOption/OptionText";
import { supabase } from "@/database/supabaseClient";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "nextjs-toploader/app";
import OptionButton from "@/ui/general/modalOption/OptionButton";
import { useTopLoader } from "nextjs-toploader";

function LogoutItem() {
  const b = useTranslations("block");
  const queryClient = useQueryClient();
  const router = useRouter();
  const loader = useTopLoader();
  const logout = async () => {
    loader.start();
    await supabase.auth.signOut();
    router.refresh();
    queryClient.clear();
    loader.done();
  };
  return (
    <OptionItem>
      <OptionButton action={logout}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={LogOut} />
        </OptionIconEl>
        <OptionText>{b("logout")}</OptionText>
      </OptionButton>
    </OptionItem>
  );
}

export default LogoutItem;
