import Image from "next/image";
import { useState } from "react";
import defaultImage from "../assets/images/profilePicDefault.png";

/**
 * Profile picture component
 * @param src - optional - source to the image. if not provided, the default placeholder will be used
 * @param size - small or large
 * @param className
 */
const ProfilePicture = ({
  src,
  size,
  className,
}: {
  src?: string;
  size: "small" | "large";
  className?: string;
}) => {
  if (!src) src = defaultImage.src;
  const [imageSrc, setImageSrc] = useState<string>(src);

  const sizePx = size === "small" ? 40 : 88;

  const replaceToDefault = () => {
    setImageSrc(defaultImage.src);
  };

  return (
    <div
      className={`rounded-full border border-uicolor-70 w-[${sizePx}px] h-[${sizePx}px] overflow-hidden ${className}`}
    >
      <Image
        className={`rounded-full w-[${sizePx}px] h-[${sizePx}px] object-cover`}
        src={imageSrc}
        onError={replaceToDefault}
        alt="profile picture"
        width={sizePx}
        height={sizePx}
      ></Image>
    </div>
  );
};

export default ProfilePicture;