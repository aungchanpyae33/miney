import { deleteProfileData } from "@/actions/deleteProfile";
import Button, { baseButtonStyles } from "@/components/button/Button";
import { returnUserId } from "@/lib/returnUserId";
import {
  deleteProfileAction,
  setFormSubmitMsgProps,
  useDeleteProfile,
  useFormSubmitMsg,
} from "@/lib/zustand";
import { useUserInfoContext } from "@/ui/UserInfoFetch/UserInfoContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

function ProfileDeleteActionBtn() {
  const { userInfo } = useUserInfoContext();
  const user_id = returnUserId(userInfo);
  const queryClient = useQueryClient();
  const deleteProfileAction = useDeleteProfile(
    (state: deleteProfileAction) => state.deleteProfileAction,
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
      const { data, error, status } = await deleteProfileData();
      if (error || status !== 200) {
        throw new Error(e("wentWrong"));
      }
      return { data, error, status };
    },
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(["user-profile", user_id], updatedProfile);
      setFormSubmitMsg(n("deleteProfileSuccess"));
    },
    onError: () => {
      setFormSubmitMsg(e("wentWrong"));
    },
    onSettled: () => {
      deleteProfileAction(false);
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

export default ProfileDeleteActionBtn;
