"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";

import { siteConfig } from "@/config/site";

type ProfileImageUploadProps = {
  profileImageUrl: string;
  setProfileImageUrl: (url: string) => void;
};

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  profileImageUrl,
  setProfileImageUrl,
}) => {
  const [uploading, setUploading] = useState<boolean>(false);

  const handleProfileImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadImage(file);
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "avatar"); // Replace with your Cloudinary preset

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
      setProfileImageUrl(imageUrl);
    } catch (error) {
      console.error("Error uploading the image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleImageRemove = () => {
    setProfileImageUrl("");
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-brand to-brand-strong p-6 shadow-lg">
      {!profileImageUrl ? (
        <>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="hidden"
          />

          <label
            htmlFor="profileImage"
            className="flex transform cursor-pointer items-center justify-center rounded-lg bg-white px-8 py-4 text-ink shadow-lg transition duration-300 hover:scale-105 hover:bg-gray-100"
          >
            <FaUpload className="mr-2 text-purple-600" />
            <span className="font-semibold">Upload Profile Image</span>
          </label>

          <p className="mt-2 text-sm text-white">Click above to upload an image (JPG, PNG, GIF)</p>
        </>
      ) : (
        <div className="relative">
          <Image
            src={profileImageUrl}
            alt="Profile Preview"
            width={300}
            height={300}
            className="mt-4 h-32 w-32 rounded-full border-4 border-purple-500 object-cover shadow-lg"
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

export default ProfileImageUpload;
