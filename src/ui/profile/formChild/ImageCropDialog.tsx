import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop";
import { PlusIcon, MinusIcon, SpinnerIcon } from "./icons";
import Button from "@/components/button/Button";
import { useTranslations } from "next-intl";
import getCroppedImg from "@/utils/imageUtils";

interface ImageCropDialogProps {
  imageSrc: string;
  onCancel: () => void;
  onSave: (file: File) => void;
}

const ImageCropDialog: React.FC<ImageCropDialogProps> = ({
  imageSrc,
  onCancel,
  onSave,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const b = useTranslations("block");
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    setIsSaving(true);

    try {
      const file = await getCroppedImg(imageSrc, croppedAreaPixels);
      onSave(file);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed  inset-0 z-50 flex items-center justify-center bg-backdrop   bg-opacity-75 backdrop-blur-sm"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative shadow-md shadow-shadow bg-cardcontainer rounded-2xl  w-full max-w-lg m-4 flex flex-col border border-semicontainer">
        <div className="p-4">
          <h2
            id="crop-image-dialog"
            className="text-xl font-semibold text-center"
          >
            {b("crop")}
          </h2>
        </div>
        <div className="relative w-full h-96 ">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-2">
            <MinusIcon className="w-6 h-6" />
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-label="Zoom slider"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-1 bg-semicontainer rounded-lg appearance-none cursor-pointer accent-zonecontainer"
            />
            <PlusIcon className="w-6 h-6" />
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <Button type="button" onClick={onCancel} disabled={isSaving}>
              {b("cancel")}
            </Button>
            <Button type="button" onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <SpinnerIcon className="animate-spin h-5 w-5" />
              ) : (
                b("save")
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropDialog;
