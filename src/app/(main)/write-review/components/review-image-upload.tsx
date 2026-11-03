"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";

import { siteConfig } from "@/config/site";

type ReviewImageUploadProps = {
  reviewImageUrl?: string;
  setReviewImageUrl: (url: string) => void;
};

const ReviewImageUpload: React.FC<ReviewImageUploadProps> = ({
  reviewImageUrl,
  setReviewImageUrl,
}) => {
  const [uploading, setUploading] = useState<boolean>(false);

  const handleReviewImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadImage(file);
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "review-image");

    try {
      setUploading(true);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${siteConfig.cloudinaryCloudName}/image/upload`,
        { method: "POST", body: formData },
      );
      if (!response.ok) throw new Error(`Upload failed: ${response.status}`);

      const { secure_url: imageUrl } = (await response.json()) as {
        secure_url: string;
      };
      setReviewImageUrl(imageUrl);
    } catch (error) {
      console.error("Error uploading the image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleImageRemove = () => {
    setReviewImageUrl("");
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 p-6 shadow-lg">
      {!reviewImageUrl ? (
        <>
          <input
            type="file"
            id="reviewImage"
            accept="image/*"
            onChange={handleReviewImageChange}
            className="hidden"
          />

          <label
            htmlFor="reviewImage"
            className="flex transform cursor-pointer items-center justify-center rounded-lg bg-white px-8 py-4 text-gray-800 shadow-lg transition duration-300 hover:scale-105 hover:bg-gray-100"
          >
            <FaUpload className="mr-2 text-purple-600" />
            <span className="font-semibold">Add an image to review</span>
          </label>

          <p className="mt-2 text-sm text-white">Click above to upload an image (JPG, PNG, GIF)</p>
        </>
      ) : (
        <div className="relative">
          <Image
            src={reviewImageUrl}
            alt="Preview"
            width={720}
            height={720}
            className="mt-4 h-32 w-auto border-4 border-purple-500 object-contain shadow-lg"
          />
          <button
            onClick={handleImageRemove}
            className="absolute top-0 right-0 rounded-full bg-red-600 p-1 text-white transition duration-300 hover:bg-red-700"
            title="Remove Image"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {uploading && <p className="mt-2 text-white">Uploading...</p>}
    </div>
  );
};

export default ReviewImageUpload;
