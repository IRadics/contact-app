import Image from "next/image";
import { useState } from "react";
import defaultImage from "../assets/images/profilePicDefault.png";

const UserPicture = ({
  src,
  className,
}: {
  src?: string;
  className?: string;
}) => {
  if (!src) src = defaultImage.src;
  const [imageSrc, setImageSrc] = useState<string>(src);

  const sizePx = 24;

  const replaceToDefault = () => {
    setImageSrc(defaultImage.src);
  };

  return (
    <span
      className={`rounded-full border border-x-textcolor-primary w-[${sizePx}px] h-[${sizePx}px] overflow-hidden ${className}`}
    >
      <Image
        className={`rounded-full w-[${sizePx}px] h-[${sizePx}px] object-cover`}
        src={imageSrc}
        onError={replaceToDefault}
        alt="user picture"
        width={sizePx}
        height={sizePx}
      ></Image>
    </span>
  );
};

export default UserPicture;
