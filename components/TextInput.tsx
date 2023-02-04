import React, { HTMLProps } from "react";

export interface TextInputProps
  extends Omit<HTMLProps<HTMLInputElement>, "type"> {}

/**
 * Text input element
 * @param ...TextInputProps - All the available props for HTML text input element
 */
const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    return (
      <input
        className="w-full h-10 px-3 py-2  rounded-lg  border 
     placeholder:text-textcolor-disabled
     bg-uicolor-80  border-uicolor-60
     hover:bg-uicolor-80 hover:border-uicolor-30
     focus:bg-uicolor-60 focus:border-uicolor-10"
        ref={ref}
        type={"text"}
        {...props}
      ></input>
    );
  }
);

export default TextInput;
