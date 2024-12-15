import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

function ImageUploader({ setEventDetails, posterUrl }) {
  const [imagePreview, setImagePreview] = useState(() => posterUrl === "" ? null : "");

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
}

export default ImageUploader;
