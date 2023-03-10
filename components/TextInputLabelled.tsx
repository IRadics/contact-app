import React from "react";
import TextInput, { TextInputProps } from "./TextInput";

interface TextInputLabelledProps extends TextInputProps {
  label: string;
}

/**
 * Labelled text input element
 * @param label
 * @param ...TextInputProps - All the available props for HTML text input element
 */
const TextInputLabelled = React.forwardRef<
  HTMLInputElement,
  TextInputLabelledProps
>((props, ref) => {
  const { className, ...htmlInputProps } = props;
  return (
    <div
      className={`w-full flex flex-col justify-center items-center ${className}`}
    >
      <label className="text-textcolor-secondary w-full t5 mb-1 text-left">
        {props.label}
      </label>
      <TextInput {...htmlInputProps} ref={ref} />
    </div>
  );
});

TextInputLabelled.displayName = "TextInputLabelled";

export default TextInputLabelled;
