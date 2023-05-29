import React, { TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.scss";

interface InputComponentProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  style?: React.CSSProperties;
  value?: string | number;
  placeholder?: string;
  name?: string;
  borderSecondary?: boolean;
  rows?: number;
}

export default function TextArea({
  style = {},
  value = "",
  placeholder = "Add your text here",
  name = "",
  borderSecondary = false,
  rows = 4,
  ...InputProps
}: InputComponentProps) {
  return (
    <textarea
      name={name}
      className={`${styles.textArea} ${
        borderSecondary ? styles.borderSecondary : null
      }`}
      style={style}
      value={value}
      placeholder={placeholder}
      rows={rows}
      {...InputProps}
    />
  );
}
