import Image, { StaticImageData } from "next/image";
import React from "react";
import { HTMLProps } from "react";

type ButtonType = "primary" | "secondary" | "special";

/**
 * Styled Button element with optional icon.
 * @param icon - statically imported icon data
 * @param type - style type , primary, secondary or special
 * @param ...ButtonProps - All the available props for HTML button element
 */
const Button = React.forwardRef<
  HTMLButtonElement,
  {
    icon?: StaticImageData;
    type?: ButtonType;
  } & HTMLProps<HTMLButtonElement>
>((props, ref) => {
  const { type = "primary", icon, ...htmlButtonProps } = props;

  const baseStyle = `relative t4 flex flex-row justify-center items-center h-10 px-3 py-2
  ${
    //Apply the gap only for base style if both icon and children (label) are present
    icon && props.children ? "gap-2" : ""
  }`;

  const getStyling = (type: ButtonType) => {
    switch (type) {
      case "primary":
        return "rounded-lg bg-uicolor-60 hover:bg-uicolor-50 active:bg-uicolor-40";
      case "secondary":
        return "rounded-lg bg-transparent hover:bg-uicolor-90 active:bg-uicolor-80";
    }
  };

  if (type !== "special") {
    return (
      <button
        {...htmlButtonProps}
        ref={ref}
        className={`${baseStyle} ${getStyling(type)}`}
      >
        {icon && <Image src={icon} alt=""></Image>}
        {props.children}
      </button>
    );
  } else {
    //if the type is special, make a psuedo gradient colored border with 2 containers
    return (
      <button
        {...htmlButtonProps}
        ref={ref}
        className={`group relative rounded-full 
        bg-gradient-to-b from-uicolor-20/100 to-uicolor-20/0 ${baseStyle}`}
      >
        <div
          className={`rounded-full box-content absolute w-[calc(100%-(2*1px))] h-[calc(100%-(2*1px))] 
          bg-gradient-to-b from-uicolor-60/70 to-uicolor-60/100
          group-hover:bg-[#FFFFFF0A] group-active::bg-[#FFFFFF0A]
          z-[1]`}
        ></div>
        {icon && <Image src={icon} alt="" className="z-[2]"></Image>}
        <span className="z-[2]">{props.children}</span>
      </button>
    );
  }
});

export default Button;
