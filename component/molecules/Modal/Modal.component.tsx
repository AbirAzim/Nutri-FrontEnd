import { faTimes } from "@fortawesome/pro-solid-svg-icons";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import IconButton from "../../atoms/Button/IconButton.component";

import styles from "./Modal.module.scss";

interface ModalProps {
  show?: boolean;
  title?: string;
  hideModal?: () => any;
  height?: number | string;
  width?: number | string;
  overlayClass?: string;
  closeClass?: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { show, children, ...modalProps } = props;
  if (!show || typeof window === "undefined") return null;
  const modalEl = window.document?.getElementById("modal-portal");
  return ReactDOM.createPortal(
    <ModalBody {...modalProps}>{children}</ModalBody>,
    modalEl!,
  );
};

const ModalBody: React.FC<ModalProps> = (props) => {
  const {
    children,
    title,
    hideModal,
    height,
    width,
    overlayClass,
    closeClass,
  } = props;
  return (
    <Fragment>
      <div
        className={`${styles.overlay} ${overlayClass || ""}`}
        onClick={hideModal}
      />
      <div
        className={styles.modal}
        style={{
          minHeight: typeof height === "number" ? `${height}px` : height,
          minWidth: typeof width === "number" ? `${width}px` : width,
        }}
      >
        {title && (
          <Fragment>
            {typeof title === "string" ? (
              <h3 className={styles.modal__title}>{title}</h3>
            ) : (
              title
            )}
            <hr style={{ border: "1px solid #e7e7e7" }} />
          </Fragment>
        )}
        {children}
        <IconButton
          fontName={faTimes}
          size="small"
          variant="primary"
          className={`${styles.modal__close} ${closeClass}`}
          onClick={hideModal}
        />
      </div>
    </Fragment>
  );
};

export default Modal;
