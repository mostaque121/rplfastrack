"use client";

import Image, { type ImageLoader, type ImageProps } from "next/image";

const UPLOAD_PATH = "/image/upload/";

/**
 * Resizes on Cloudinary's CDN (f_auto picks AVIF/WebP, q_auto picks the quality) instead of
 * Vercel's optimizer: faster first loads, and it doesn't use the Vercel Hobby image quota.
 */
const cloudinaryLoader: ImageLoader = ({ src, width, quality }) => {
  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality ?? "auto"}`].join(",");
  return src.replace(UPLOAD_PATH, `${UPLOAD_PATH}${params}/`);
};

function isCloudinary(src: ImageProps["src"]): src is string {
  return typeof src === "string" && src.startsWith("https://res.cloudinary.com/") && src.includes(UPLOAD_PATH);
}

/** Drop-in for next/image. Cloudinary URLs use the loader above; anything else uses Next's own. */
export default function CloudinaryImage(props: ImageProps) {
  return <Image {...props} loader={isCloudinary(props.src) ? cloudinaryLoader : undefined} />;
}
