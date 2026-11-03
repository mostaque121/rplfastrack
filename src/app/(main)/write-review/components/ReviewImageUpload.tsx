"use client";

import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";

type ReviewImageUploadProps = {
  reviewImageUrl?: string;
  setReviewImageUrl: (url: string) => void;
};

const ReviewImageUpload: React.FC<ReviewImageUploadProps> = ({
  reviewImageUrl,
  setReviewImageUrl,
}) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
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
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dbneycd8g/image/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent =
                (progressEvent.loaded / progressEvent.total) * 100;
              setUploadProgress(percent);
            }
          },
        }
      );

      const imageUrl = response.data.secure_url as string;
      setReviewImageUrl(imageUrl);
      setUploadProgress(0);
    } catch (error) {
      console.error("Error uploading the image:", error);
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const handleImageRemove = () => {
    setReviewImageUrl("");
    setUploadProgress(0);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg shadow-lg">
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
            className="flex items-center justify-center cursor-pointer px-8 py-4 bg-white text-gray-800 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
          >
            <FaUpload className="mr-2 text-purple-600" />
            <span className="font-semibold">Add an image to review</span>
          </label>

          <p className="mt-2 text-white text-sm">
            Click above to upload an image (JPG, PNG, GIF)
          </p>
        </>
      ) : (
        <div className="relative">
          <Image
            src={reviewImageUrl}
            alt="Preview"
            width={720}
            height={720}
            className="mt-4 w-auto h-32 object-contain border-4 border-purple-500 shadow-lg"
          />
          <button
            onClick={handleImageRemove}
            className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition duration-300"
            title="Remove Image"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {uploadProgress > 0 && (
        <div className="mt-2 w-full bg-gray-200 rounded-full">
          <div
            className="bg-white h-2 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      {uploading && <p className="text-white mt-2">Uploading...</p>}
    </div>
  );
};

export default ReviewImageUpload;
