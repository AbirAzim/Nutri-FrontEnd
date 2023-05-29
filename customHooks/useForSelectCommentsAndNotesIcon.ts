interface returnType {
  icon: string;
  amount: number | string;
}

const useForSelectCommentsAndNotesIcon = () => {
  const handleShowIconAndAmount = (
    comments: number,
    notes: number,
  ): returnType => {
    if (!comments && !notes) {
      return { icon: "noComments&NoNotes", amount: 0 };
    } else if (comments && !notes) {
      return { icon: "commentsOnly", amount: comments };
    } else if (!comments && notes) {
      return { icon: "notesOnly", amount: "" };
    } else {
      return { icon: "comments&notes", amount: comments };
    }
  };

  return handleShowIconAndAmount;
};

export default useForSelectCommentsAndNotesIcon;
