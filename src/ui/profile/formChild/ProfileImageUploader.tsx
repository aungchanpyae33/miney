"use client";
import React, { useState, useRef } from "react";
import { UserIcon, UploadIcon } from "./icons";
import ImageCropDialog from "./ImageCropDialog";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Button from "@/components/button/Button";
import IconWrapper from "@/ui/general/IconWrapper";
import { CircleAlert, RotateCcw, Trash } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

const ProfileImageUploader = ({ url }: { url: string }) => {
  const [croppedImagePreview, setCroppedImagePreview] = useState<string | null>(
    null,
  );
  const [defaultImage, setDefaultImage] = useState<string | null>(url);
  const { control, setValue } = useFormContext();
  const profileAvatarUrl = useWatch({
    control,
    name: "profile_avatar_url",
  }) as string;
  const b = useTranslations("block");
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setStatusMessage({
          type: "error",
          text: "not_valid",
        });
        return;
      }
      if (file.size > 3 * 1024 * 1024) {
        setStatusMessage({
          type: "error",
          text: "exceed_size",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        setStatusMessage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    setStatusMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    fileInputRef.current?.click();
  };

  const resetFileSelect = () => {
    setStatusMessage(null);
    setCroppedImagePreview(null);
    setImageSrc(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setDefaultImage(url);
    setValue("profile_avatar_url", url, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    setValue("visual_avatar_file", null, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: false,
    });
  };

  const onCropSave = (file: File) => {
    setCroppedImagePreview(URL.createObjectURL(file)); // preview only
    setStatusMessage(null);
    setImageSrc(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
    setDefaultImage("");
    setValue("profile_avatar_url", "", {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
    setValue("visual_avatar_file", file, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: false,
    });
  };

  const onDeletDef = () => {
    setStatusMessage(null);
    setCroppedImagePreview(null);
    setDefaultImage("");
    setValue("profile_avatar_url", "", {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    //to show svg profile icon
    setValue("visual_avatar_file", "default", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: false,
    });
  };

  const onCropCancel = () => {
    setImageSrc(null); // Close the dialog
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      {imageSrc && (
        <ImageCropDialog
          imageSrc={imageSrc}
          onCancel={onCropCancel}
          onSave={onCropSave}
        />
      )}

      <div className="w-full space-y-2   bg-cardcontainer ">
        <div className="border  flex gap-3 p-3 rounded-2xl border-bordersoft">
          <span>
            <IconWrapper Icon={CircleAlert} size="small" />
          </span>

          <span className=" text-ink-400">{b("warningImage")}</span>
        </div>
        <div className="flex py-8 rounded-2xl  shadow-lg border border-bordersoft flex-col items-center space-y-5">
          <div className="relative group size-36 sm:size-40 ">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-600 transition-all duration-300 group-hover:border-indigo-500">
              {croppedImagePreview ? (
                <Image
                  src={croppedImagePreview}
                  alt="Profile preview"
                  width={160}
                  height={160}
                  sizes="160px"
                  loading="eager"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-cardcontainer  flex items-center justify-center">
                  {profileAvatarUrl.length > 0 ? (
                    <Image
                      src={profileAvatarUrl}
                      alt="Profile preview"
                      width={160}
                      height={160}
                      loading="eager"
                      sizes="160px"
                      className="object-cover"
                    />
                  ) : (
                    <UserIcon className=" size-28 rounded-full text-ink-400" />
                  )}
                </div>
              )}
            </div>
            <Button
              type="button"
              onClick={triggerFileSelect}
              className="absolute inset-0 bg-black/50 dark:bg-gray-500/50 text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              aria-label="Change profile picture"
            >
              <div className="text-center ">
                <UploadIcon className="w-8 h-8 mx-auto" />
              </div>
            </Button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            aria-hidden="true"
          />

          {statusMessage && (
            <div
              className={`p-3 rounded-md w-fit text-center text-sm font-medium ${
                statusMessage.type === "success"
                  ? "bg-green-500/20"
                  : "bg-error"
              }`}
            >
              {b(statusMessage.text)}
            </div>
          )}

          <div className="flex items-center justify-center space-x-4 w-full">
            {profileAvatarUrl && (
              <Button
                type="button"
                onClick={onDeletDef}
                className="flex items-center justify-center rounded-full shadow-md"
              >
                <IconWrapper Icon={Trash} size="small" />
              </Button>
            )}
            {croppedImagePreview && defaultImage === profileAvatarUrl && (
              <Button
                type="button"
                onClick={resetFileSelect}
                className="flex items-center justify-center  rounded-full shadow-md"
              >
                <IconWrapper Icon={RotateCcw} size="small" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileImageUploader;
