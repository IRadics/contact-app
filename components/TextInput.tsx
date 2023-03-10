import React, { InputHTMLAttributes } from "react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

/**
 * Text input element
 * @param ...TextInputProps - All the available props for HTML text input element
 */
const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const { className, error, ...htmlInputProps } = props;
    return (
      <input
        className={`w-full h-10 px-3 py-2  rounded-lg  border 
     placeholder:text-textcolor-disabled
     bg-uicolor-80  border-uicolor-60
     hover:bg-uicolor-80 hover:border-uicolor-30
     focus:bg-uicolor-60 focus:border-uicolor-10 
     ${
       error
         ? "border-uicolor-error hover:border-uicolor-error focus:border-uicolor-error"
         : ""
     }
     ${className}`}
        ref={ref}
        {...htmlInputProps}
      ></input>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
