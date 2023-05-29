import React, { forwardRef, Dispatch, SetStateAction } from "react";
type Props = (
  id: string,
  ref: any,
  changeState?: Dispatch<SetStateAction<boolean>>,
) => void;

const useFindBlock = () => {
  const handleFindBlock = (id, ref, changeState) => {
    if (id) {
      const titleElement = document.getElementById(id);

      if (titleElement) {
        titleElement?.scrollIntoView({ behavior: "smooth" });
        titleElement.style.backgroundColor = "#d2e7bc";
        changeState(true);

        ref.current = setTimeout(() => {
          titleElement.style.backgroundColor = "";
        }, 2500);
      }
    }
  };

  return handleFindBlock;
};

export default useFindBlock;
