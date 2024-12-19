import { useState, useImperativeHandle, forwardRef } from "react";
import { UploadButton } from "@uploadthing/react";
import { X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

const ImageUploader = forwardRef(({ setEventDetails }, ref) => {
  const [imagePreview, setImagePreview] = useState(null);

  useImperativeHandle(ref, () => ({
    resetImage: () => {
      setImagePreview(null);
    },
  }));

  return (
    <div className="flex flex-col items-center space-y-4">
      {imagePreview ? (
        <div className="relative h-64 w-full rounded-lg bg-white">
          <Image
            src={imagePreview}
            alt="Upload preview"
            fill
            className="rounded-lg object-contain"
          />
          <button
            type="button"
            onClick={() => setImagePreview(null)}
            className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <>
          <label className="font-bold">Upload Poster</label>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const uploadedImageUrl = res[0].url;
              setImagePreview(uploadedImageUrl);
              setEventDetails((prev) => ({
                ...prev,
                posterUrl: uploadedImageUrl,
              }));
            }}
            onUploadError={(error) => {
              toast.error(error.message);
            }}
          />
        </>
      )}
    </div>
  );
});

ImageUploader.displayName = "ImageUploader";

export default ImageUploader;
