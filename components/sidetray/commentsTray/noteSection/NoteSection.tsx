/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import CREATE_NEW_NOTE from "../../../../gqlLib/notes/mutation/createNewNote";
import { useAppSelector } from "../../../../redux/hooks";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import EDIT_MY_NOTE from "../../../../gqlLib/notes/mutation/editMyNote";
import DELETE_MY_NOTE from "../../../../gqlLib/notes/mutation/deleteMyNote";
import SkeletonNote from "../../../../theme/skeletons/skeletonNote/SkeletonNote";
import NoteBody from "./noteBody/NoteBody";
import NoteHead from "./noteHead/NoteHead";
import GET_ALL_NOTES_FOR_A_RECIPE from "../../../../gqlLib/notes/quries/getAllNotesForARecipe";
import IconForAddComment from "../../common/iconForAddComment/IconForAddComment";
import NoteForm from "./noteForm/NoteForm";
type NoteSectionProps = {
  allNotes: any[];
  setAllNotes: Dispatch<SetStateAction<any[]>>;
};

const NoteSection = () => {
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [updateNote, setUpdateNote] = useState(false);
  const [updateNoteId, setUpdateNoteId] = useState("");
  const [noteForm, setNoteForm] = useState({ title: "", body: "" });
  const [createNote, { loading: createNoteLoading }] =
    useMutation(CREATE_NEW_NOTE);
  const [editNote, { loading: editNoteLoading }] = useMutation(EDIT_MY_NOTE);
  const [deleteNote, { loading: deleteNoteLoading }] =
    useMutation(DELETE_MY_NOTE);
  const { dbUser } = useAppSelector((state) => state?.user);
  const { activeRecipeId } = useAppSelector((state) => state?.collections);
  const { openCommentsTray } = useAppSelector((state) => state?.sideTray);
  const { referenceOfRecipeUpdateFunc } = useAppSelector(
    (state) => state?.recipe,
  );

  const [getAllNotesForARecipe, { data: noteData, loading: noteLoading }] =
    useLazyQuery(GET_ALL_NOTES_FOR_A_RECIPE, {
      fetchPolicy: "cache-and-network",
    });

  // fetch all notes for a recipe
  const fetchNotes = async () => {
    try {
      getAllNotesForARecipe({
        variables: { data: { recipeId: activeRecipeId, userId: dbUser?._id } },
      });
    } catch (error) {
      reactToastifyNotification(error?.message);
    }
  };

  useEffect(() => {
    if (openCommentsTray && activeRecipeId) {
      fetchNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCommentsTray, activeRecipeId]);

  // update note form
  const updateNoteForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e?.target;
    setNoteForm((pre) => ({ ...pre, [name]: value }));
  };

  // toggle note form
  const toggleNoteForm = () => {
    setShowNoteForm((pre) => !pre);
    setNoteForm((pre) => ({ ...pre, title: "", body: "" }));
  };

  // remove a note
  const removeNote = async (id: string) => {
    try {
      const { data } = await deleteNote({
        variables: {
          data: {
            recipeId: activeRecipeId,
            userId: dbUser?._id,
            noteId: id,
          },
        },
        update(cache, { data: { removeMyNote } }) {
          cache.writeQuery({
            query: GET_ALL_NOTES_FOR_A_RECIPE,
            variables: {
              data: { recipeId: activeRecipeId, userId: dbUser?._id },
            },
            data: {
              getMyNotesForARecipe: [...removeMyNote],
            },
          });
        },
      });
      referenceOfRecipeUpdateFunc(activeRecipeId, {
        notes: data?.removeMyNote?.length ? data?.removeMyNote?.length : null,
      });

      reactToastifyNotification("info", "Delete successfully");
    } catch (error) {
      reactToastifyNotification("error", error?.message);
    }
  };

  // create or update note value
  const createOrUpdateNote = async () => {
    setShowNoteForm(false);
    try {
      if (updateNote) {
        await editNote({
          variables: {
            editMyNoteData2: {
              editableObject: { body: noteForm?.body, title: noteForm?.title },
              noteId: updateNoteId,
              userId: dbUser?._id,
              recipeId: activeRecipeId,
            },
          },
          update(cache, { data: { editMyNote } }) {
            cache.writeQuery({
              query: GET_ALL_NOTES_FOR_A_RECIPE,
              variables: {
                data: { recipeId: activeRecipeId, userId: dbUser?._id },
              },
              data: {
                getMyNotesForARecipe: [...editMyNote],
              },
            });
          },
        });
      } else {
        const { data } = await createNote({
          variables: {
            data: {
              body: noteForm?.body,
              title: noteForm?.title,
              recipeId: activeRecipeId,
              userId: dbUser?._id,
            },
          },
          update(cache, { data: { createNewNote } }) {
            cache.writeQuery({
              query: GET_ALL_NOTES_FOR_A_RECIPE,
              variables: {
                data: { recipeId: activeRecipeId, userId: dbUser?._id },
              },
              data: {
                getMyNotesForARecipe: [...createNewNote],
              },
            });
          },
        });

        referenceOfRecipeUpdateFunc(activeRecipeId, {
          notes: data?.createNewNote?.length
            ? data?.createNewNote?.length
            : null,
        });
      }

      reactToastifyNotification(
        "info",
        `Note ${updateNote ? "updated" : "created"} successfully`,
      );
    } catch (error) {
      reactToastifyNotification("error", error?.message);
    }
  };

  const updateNoteValue = (val: any) => {
    const title = val?.title;
    const id = val?._id;
    const body = val?.body;
    setUpdateNote(true);
    setNoteForm((pre) => ({ ...pre, title, body }));
    setUpdateNoteId(id);
    setShowNoteForm(true);
    // toggleNoteForm();
  };

  const handleButtonClick = () => {
    toggleNoteForm();
    setUpdateNote(false);
    setNoteForm((pre) => ({ ...pre, title: "", body: "" }));
  };

  return (
    <>
      {!showNoteForm && (
        <IconForAddComment handleIconClick={toggleNoteForm} label="Add Notes" />
      )}
      {(createNoteLoading || editNoteLoading) && (
        <SkeletonNote singleNote={true} />
      )}
      {showNoteForm && (
        <NoteForm
          toggleNoteForm={toggleNoteForm}
          noteForm={noteForm}
          updateNoteForm={updateNoteForm}
          createOrUpdateNote={createOrUpdateNote}
          variant="notes"
        />
      )}
      {/* <NoteHead
        showForm={showNoteForm}
        toggleNoteForm={toggleNoteForm}
        noteForm={noteForm}
        updateNoteForm={updateNoteForm}
        createOrUpdateNote={createOrUpdateNote}
        handleButtonClick={handleButtonClick}
        isFromRecipePage="default"
      /> */}

      <NoteBody
        data={noteData?.getMyNotesForARecipe}
        deleteItem={removeNote}
        updateItem={updateNoteValue}
        varient="notes"
        loading={noteLoading}
        isFromRecipePage="default"
        deleteItemLoading={deleteNoteLoading}
      />
    </>
  );
};

export default NoteSection;
