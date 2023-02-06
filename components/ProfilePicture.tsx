import Image from "next/image";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (src) setImageSrc(src);
  }, [src]);

  const sizePx = size === "small" ? 40 : 88;
  const sizeClasses = size === "small" ? "h-[40px] " : "h-[88px]";

  const replaceToDefault = () => {
    setImageSrc(defaultImage.src);
  };

  return (
    <div
      className={`rounded-full border border-uicolor-70 overflow-hidden ${className} ${sizeClasses}`}
    >
      <Image
        className={`rounded-full  object-cover  ${sizeClasses}`}
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
