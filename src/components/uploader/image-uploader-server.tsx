/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "react-advanced-cropper/dist/style.css";

import { ImageIcon, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Cropper, CropperRef } from "react-advanced-cropper";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string, publicId: string) => void;
  initialImage?: string | null;
  initialPublicId?: string | null;
  uploadPreset: string;
  aspectRatio?: number;
}

export function ImageUploaderServer({
  onImageUploaded,
  initialImage,
  aspectRatio,
  initialPublicId,
  uploadPreset,
}: ImageUploaderProps) {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [publicId, setPublicId] = useState<string | null>(initialPublicId || null);
  const [cropperImage, setCropperImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCropper, setShowCropper] = useState(false);
  const cropperRef = useRef<CropperRef>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        setCropperImage(reader.result as string);
        setShowCropper(true);
      };

      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleCropComplete = useCallback(
    async (cropper: any) => {
      const canvas = cropper.getCanvas();
      if (canvas) {
        const croppedImage = canvas.toDataURL();
        setUploading(true);

        try {
          // Simulate progress
          const progressInterval = setInterval(() => {
            setProgress((prev) => {
              if (prev >= 90) {
                clearInterval(progressInterval);
                return prev;
              }
              return prev + 10;
            });
          }, 300);

          // Convert data URL to Blob
          const blob = await (await fetch(croppedImage)).blob();
          const file = new File([blob], "cropped-image.jpg", {
            type: "image/jpeg",
          });

          // Create form data for upload
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", uploadPreset);
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const result = await response.json();

          clearInterval(progressInterval);
          setProgress(100);

          if (result.secure_url && result.public_id) {
            setImage(result.secure_url);
            setPublicId(result.public_id);
            onImageUploaded(result.secure_url, result.public_id);
          }
        } catch (error) {
          console.error("Upload failed:", error);
        } finally {
          setTimeout(() => {
            setUploading(false);
            setProgress(0);
            setShowCropper(false);
          }, 500);
        }
      }
    },
    [onImageUploaded, uploadPreset],
  );

  const handleRemoveImage = () => {
    setImage(null);
    setPublicId(null);
    onImageUploaded("", "");
  };

  return (
    <div className="mx-auto w-full max-w-md">
      {!image && !showCropper && (
        <div
          {...getRootProps()}
          className={`h-[250px] cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
            isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {isDragActive
                ? "Drop the image here"
                : "Drag & drop an image here, or click to select"}
            </p>
          </div>
        </div>
      )}

      {showCropper && cropperImage && !uploading && (
        <div className="rounded-lg border p-4">
          <h3 className="mb-2 font-medium">Crop Image</h3>
          <Cropper
            src={cropperImage}
            className="h-[250px] rounded border"
            stencilProps={aspectRatio ? { aspectRatio } : {}}
            ref={cropperRef}
          />
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setShowCropper(false)} variant="outline" className="mr-2">
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                if (cropperRef.current) {
                  handleCropComplete(cropperRef.current);
                }
              }}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>
        </div>
      )}

      {uploading && (
        <div className="flex h-[250px] w-full flex-col items-center justify-center border-2 border-dashed">
          <p className="mb-2 flex items-center gap-2 text-sm">
            <Loader2 className="h-7 w-7 animate-spin text-blue-500" />
            Uploading image...
          </p>
          <div className="w-full px-10">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      )}

      {image && !showCropper && !uploading && (
        <div className="relative rounded-lg border">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-background/80"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="relative h-[250px]">
            <Image
              fill
              src={image && image.startsWith("http") ? image : "/placeholder.svg"}
              alt="Uploaded image"
              className="rounded object-contain"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        </div>
      )}
    </div>
  );
}
