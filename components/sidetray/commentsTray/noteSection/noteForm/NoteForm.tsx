import React from "react";
import CommentAndNoteButton from "../../../../../theme/button/commentAndNoteButton/CommentAndNoteButton";
import InputComponent from "../../../../../theme/input/input.component";
import CircularRotatingLoader from "../../../../../theme/loader/circularRotatingLoader.component";
import TextArea from "../../../../../theme/textArea/TextArea";
import styles from "./NoteForm.module.scss";

type NoteFormProps = {
  toggleNoteForm: () => void;
  noteForm: { title: string; body: string };
  updateNoteForm: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  createOrUpdateNote: () => void;
  variant?: "notes" | "versions";
  addNewItemLoading?: boolean;
};

const NoteForm = ({
  toggleNoteForm,
  noteForm = { body: "", title: "" },
  updateNoteForm,
  createOrUpdateNote,
  variant = "notes",
  addNewItemLoading = false,
}: NoteFormProps) => {
  return (
    <div className={styles.noteFormContainer}>
      <h3>Add {`${variant}`}</h3>
      <InputComponent
        name="title"
        value={noteForm?.title}
        onChange={updateNoteForm}
        placeholder={`${variant} title`}
        borderSecondary={true}
        style={{ fontSize: "12px", marginBottom: "10px", borderRadius: "10px" }}
      />
      <TextArea
        name="body"
        value={noteForm?.body}
        onChange={updateNoteForm}
        placeholder={`${variant} description`}
        style={{ fontSize: "12px", marginBottom: "10px", borderRadius: "10px" }}
        borderSecondary={true}
      />
      <div className={styles.btnBox}>
        <CommentAndNoteButton
          type="submitBtn"
          submitBtnVarient="secondary"
          style={{ boxShadow: "5px 5px 15px #e5e6e4" }}
          text={
            addNewItemLoading ? (
              <CircularRotatingLoader
                color="white"
                style={{ fontSize: "16px" }}
              />
            ) : (
              "Save"
            )
          }
          handleClick={createOrUpdateNote}
        />
        <CommentAndNoteButton
          type="cancleBtn"
          text="Cancel"
          handleClick={toggleNoteForm}
        />
      </div>
    </div>
  );
};

export default NoteForm;
