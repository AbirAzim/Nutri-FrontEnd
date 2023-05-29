import React from "react";
import IconForAddComment from "../../../common/iconForAddComment/IconForAddComment";
import NoteForm from "../noteForm/NoteForm";
import styles from "../NoteSection.module.scss";

type NoteFormProps = {
  showForm: boolean;
  toggleNoteForm: () => void;
  noteForm: { title: string; body: string };
  updateNoteForm: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  createOrUpdateNote: () => void;
  handleButtonClick: () => void;
  isFromRecipePage?: "details" | "edit" | "default";
  variant?: "notes" | "versions";
  addNewItemLoading?: boolean;
};

const NoteHead = ({
  createOrUpdateNote,
  noteForm,
  showForm,
  toggleNoteForm,
  updateNoteForm,
  handleButtonClick,
  isFromRecipePage = "default",
  variant = "notes",
  addNewItemLoading = false,
}: NoteFormProps) => {
  return (
    <div>
      {showForm ? (
        <NoteForm
          toggleNoteForm={toggleNoteForm}
          noteForm={noteForm}
          updateNoteForm={updateNoteForm}
          createOrUpdateNote={createOrUpdateNote}
          variant={variant}
          addNewItemLoading={addNewItemLoading}
        />
      ) : isFromRecipePage === "default" || isFromRecipePage === "edit" ? (
        <div className={styles.commentsIconBox}>
          <IconForAddComment
            handleIconClick={handleButtonClick}
            label="Add version"
          />
        </div>
      ) : null}
    </div>
  );
};

export default NoteHead;
