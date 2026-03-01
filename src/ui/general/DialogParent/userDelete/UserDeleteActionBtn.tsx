import { deleteUserAccount } from "@/actions/deleteUser";
import Button, { baseButtonStyles } from "@/components/button/Button";
import { supabase } from "@/database/supabaseClient";
import {
  deleteUserAction,
  setFormSubmitMsgProps,
  useDeleteUser,
  useFormSubmitMsg,
} from "@/lib/zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useTopLoader } from "nextjs-toploader";
import { useRouter } from "nextjs-toploader/app";

function UserDeleteActionBtn() {
  const router = useRouter();
  const loader = useTopLoader();
  const queryClient = useQueryClient();
  const deleteUserAction = useDeleteUser(
    (state: deleteUserAction) => state.deleteUserAction,
  );
  const setFormSubmitMsg = useFormSubmitMsg(
    (state: setFormSubmitMsgProps) => state.setFormSubmitMsg,
  );
  const b = useTranslations("block");
  const n = useTranslations("NotiMsg");
  const e = useTranslations("ErrorMsg");
  // Mutation for delete profile
  const mutation = useMutation({
    mutationFn: async () => {
      const { data, error, status } = await deleteUserAccount();
      if (error || status !== 200) {
        throw new Error(e("wentWrong"));
      }
      return { data, error, status };
    },
    onSuccess: async () => {
      setFormSubmitMsg(n("deleteUserSuccess"));
      loader.start();
      await supabase.auth.signOut();
      router.refresh();
      queryClient.clear();
      loader.done();
    },
    onError: () => {
      setFormSubmitMsg(e("wentWrong"));
    },
    onSettled: () => {
      deleteUserAction(false);
    },
  });
  const handleAction = async () => {
    mutation.mutate();
  };
  return (
    <Button className={baseButtonStyles} onClick={handleAction}>
      {b("delete")}
    </Button>
  );
}

export default UserDeleteActionBtn;
