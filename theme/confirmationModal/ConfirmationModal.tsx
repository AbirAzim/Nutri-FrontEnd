import React from "react";
import CommentAndNoteButton from "../button/commentAndNoteButton/CommentAndNoteButton";
import CircularRotatingLoader from "../loader/circularRotatingLoader.component";
import CustomModal from "../modal/customModal/CustomModal";
import styles from "./ConfirmationModal.module.scss";

interface ConfirmationModalProps {
  text: string;
  submitFunc: () => void;
  cancleFunc: () => void;
  loading?: boolean;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  submitButText?: string;
}

const ConfirmationModal = ({
  cancleFunc,
  submitFunc,
  text,
  loading = false,
  openModal = false,
  setOpenModal = () => {},
  submitButText = "Delete",
}: ConfirmationModalProps) => {
  return (
    <CustomModal open={openModal} setOpen={setOpenModal}>
      <div className={styles.confirmationModalContainer}>
        <div className={styles.modalBody}>
          <p className={styles.text}>{text}</p>
          <div className={styles.buttonBox}>
            <CommentAndNoteButton
              type="cancleBtn"
              text="Cancel"
              handleClick={cancleFunc}
              style={{ marginRight: "20px" }}
            />
            <CommentAndNoteButton
              type="submitBtn"
              text={
                loading ? (
                  <CircularRotatingLoader
                    color="white"
                    style={{ fontSize: "24px" }}
                  />
                ) : (
                  submitButText
                )
              }
              handleClick={submitFunc}
            />
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ConfirmationModal;
