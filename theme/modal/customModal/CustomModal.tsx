import React, { Dispatch, SetStateAction } from "react";
import styles from "./CustomModal.module.scss";

type CustomModalProps = {
  children: React.ReactNode;
  overlayStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  shouldCloseOnOverlayClick?: boolean;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

const CustomModal = ({
  children,
  contentStyle = {},
  overlayStyle = {},
  shouldCloseOnOverlayClick = true,
  open = false,
  setOpen = () => {},
}: CustomModalProps) => {
  const handleOverlayClick = () => {
    if (shouldCloseOnOverlayClick) {
      setOpen(false);
    }
  };

  return (
    <div
      className={`${styles.overlay} ${open ? styles.activeOverlay : ""}`}
      style={overlayStyle}
      onClick={handleOverlayClick}
    >
      <div
        className={`${styles.content} ${open ? styles.activeContent : ""}`}
        style={contentStyle}
        onClick={(e) => e?.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
