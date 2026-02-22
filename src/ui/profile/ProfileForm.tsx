"use client";
import { uploadData } from "@/actions/uploadData";
import { getUserProfileClient, upLoadImageClient } from "@/database/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FormChildContainer from "./formChild/FormChildContainer";
import { useForm, FormProvider } from "react-hook-form";
import ProfileImageUploader from "./formChild/ProfileImageUploader";
import { RemoveUnused, removeUnusedFields } from "@/utils/formUtils";
import SubmitSection from "./SubmitSection";
import {
  setFormSubmitMsgProps,
  SetIsChangeForTabProps,
  useCheckChangeForTab,
  useFormSubmitMsg,
} from "@/lib/zustand";
import { motion } from "motion/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Link from "next/link";
import NeedToSignIn from "../general/NeedToSignIn";
import ProfileLoading from "../loading/ProfileLoading";
import { useUserInfoContext } from "../UserInfoFetch/UserInfoContext";
import { returnUserId } from "@/lib/returnUserId";
import type { ProfileDataOutput } from "@/type/dataType";

export const defaultProfile = {
  id: "",
  profile_avatar_url: "",
  text_name: "",
  text_select_gender: "",
  text_select_friendness: "",
  text_textarea_bio: "",
  text_date_birth: "",
  text_select_relationship: "",
  text_pick_mbti: "",
  multiple_own_hobby: [],
  multiple_fav_song: [],
  multiple_fav_artist: [],
  multiple_fav_books: [],
  multiple_fav_food: [],
  multiple_fav_movie: [],
  multiple_own_comfort_zone: [],
};

interface visualInputTypes {
  visual_avatar_file: File | "default" | null;
  visualmultiple_own_hobby: string;
  visualmultiple_fav_song: string;
  visualmultiple_fav_artist: string;
  visualmultiple_fav_books: string;
  visualmultiple_fav_food: string;
  visualmultiple_fav_movie: string;
  visualmultiple_own_comfort_zone: string;
}

const visualInput = {
  visual_avatar_file: null,
  visualmultiple_own_hobby: "",
  visualmultiple_fav_song: "",
  visualmultiple_fav_artist: "",
  visualmultiple_fav_books: "",
  visualmultiple_fav_food: "",
  visualmultiple_fav_movie: "",
  visualmultiple_own_comfort_zone: "",
};

type FormDataType = ProfileDataOutput & visualInputTypes;

export default function ProfileForm() {
  const { userInfo } = useUserInfoContext();
  const user_id = returnUserId(userInfo);
  const queryClient = useQueryClient();

  const b = useTranslations("block");
  const e = useTranslations("ErrorMsg");
  const n = useTranslations("NotiMsg");
  const setFormSubmitMsg = useFormSubmitMsg(
    (state: setFormSubmitMsgProps) => state.setFormSubmitMsg,
  );
  const setIsChangeForTab = useCheckChangeForTab(
    (state: SetIsChangeForTabProps) => state.setIsChangeForTab,
  );
  const {
    data: queryData,
    error: queryError,
    isFetching,
  } = useQuery({
    queryKey: ["user-profile", user_id],
    queryFn: () => getUserProfileClient(),
    enabled: !!user_id,
  });

  const { data: profileData, status } = queryData || {
    data: null,
    error: "something went wrong",
    status: 500,
  };
  const data = profileData ?? defaultProfile;
  const methods = useForm<FormDataType>({
    mode: "onChange",
    values: { ...data, ...visualInput },
  });

  // Mutation for submitting changed fields
  const mutation = useMutation({
    mutationFn: async (data: RemoveUnused<FormDataType>) => {
      const changedFields: Record<string, unknown> = {};

      const dirtyFields = methods.formState.dirtyFields as Record<
        string,
        boolean
      >;
      const isEmpty = Object.keys(dirtyFields).length === 0;
      console.log("dirtyFields", dirtyFields);
      for (const key in methods.formState.dirtyFields) {
        changedFields[key] = data[key as keyof RemoveUnused<FormDataType>];
      }
      const profileImgFile = methods.getValues("visual_avatar_file");

      if (isEmpty) {
        const err = new Error(e("notFieldChange"));
        err.name = "custom_error";
        throw err;
      }

      const { data: imageData, error: imageError } = await upLoadImageClient(
        user_id,
        profileImgFile,
      );
      if (imageError) {
        const err = new Error(e("wentWrong"));
        err.name = "custom_error";
        throw err;
      }
      if (imageData && imageData === "default") {
        changedFields.profile_avatar_url = null;
      } else if (imageData) {
        changedFields.profile_avatar_url = imageData;
      }

      const originalData = { data, error: null, status: 200 };
      const {
        data: uploadedData,
        error: uploadedError,
        status,
      } = await uploadData(originalData, changedFields, data.id);
      if (!data || uploadedError || status !== 200) {
        const err = new Error(e("wentWrong"));
        err.name = "custom_error";
        throw err;
      }
      return { data: uploadedData, error: uploadedError, status };
    },
    onSuccess: (updatedProfile) => {
      setIsChangeForTab(false);
      queryClient.setQueryData(["user-profile", user_id], updatedProfile);
      setFormSubmitMsg(n("editSuccess"));
    },
    onError: (error) => {
      if (error instanceof Error) {
        if (error.name === "custom_error") {
          setFormSubmitMsg(error.message);
        } else {
          setFormSubmitMsg(e("wentWrong"));
        }
      } else {
        setFormSubmitMsg(e("wentWrong"));
      }
    },
  });

  if (queryError || (status !== 200 && status !== 401 && user_id)) {
    return null;
  }
  const handleAction = async (data: FormDataType) => {
    const cleanedProfile = removeUnusedFields(data);
    mutation.mutate(cleanedProfile);
  };
  if (queryError) return null;
  if (isFetching) return <ProfileLoading />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl relative w-full md:p-5 p-2  py-5 shadow-[_3px_-3px_#D3DAD9] bg-cardcontainer"
    >
      <FormProvider {...methods}>
        <form
          className={clsx("flex    items-center flex-col gap-4", {
            "blur-[2px] pointer-events-none": !user_id || status === 401,
          })}
          onSubmit={methods.handleSubmit(handleAction)}
          onKeyDown={(e) => {
            // Prevent Enter from submitting the form
            if (e.key === "Enter") {
              const target = e.target as HTMLElement;
              if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
                e.preventDefault();
              }
            }
          }}
        >
          <div
            className={clsx("w-full space-y-10", {
              "pointer-events-none opacity-50": mutation.isPending,
            })}
          >
            <ProfileImageUploader key={data.id} url={data.profile_avatar_url} />

            <FormChildContainer data={data} />
          </div>
          <p className="text-zinc-400 text-sm">
            {b.rich("beforeSubmitNotice", {
              privacy: (chunk) => (
                <Link className=" underline" href={"/privacy"}>
                  {chunk}
                </Link>
              ),
              terms: (chunk) => (
                <Link className=" underline" href={"/terms"}>
                  {chunk}
                </Link>
              ),
            })}
          </p>
          <SubmitSection isPending={mutation.isPending} />
        </form>
      </FormProvider>

      {(!user_id || status === 401) && <NeedToSignIn />}
    </motion.div>
  );
}
