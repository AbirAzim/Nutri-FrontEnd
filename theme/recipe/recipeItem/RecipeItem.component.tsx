/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "./RecipeItem.module.scss";
import AddCircleOutlineIcon from "../../../public/icons/add_circle_outline_black_36dp.svg";
import HighlightOffIcon from "../../../public/icons/highlight_off_black_24dp.svg";

interface RecipeItemProps {
  item: object;
  plusIcon?: boolean;
  dragIcon?: boolean;
  deleteIcon?: boolean;
  handleClick?: (value: object) => void;
  handleDelete?: (id: number) => void;
}

const RecipeItem = (props: RecipeItemProps) => {
  const {
    item,
    plusIcon = true,
    dragIcon = true,
    deleteIcon = false,
    handleClick = () => {},
    handleDelete = () => {},
  } = props;
  const [items, setItems] = useState({});

  // useEffect(() => {
  //   /* @ts-ignore */
  //   if (item?.label) {
  //     setItems(item);
  //   }
  // }, []);

  const handleClickk = (e) => {
    if (e.detail === 2) {
      console.log("doubke click");
    }
  };

  const handleDefault = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  return (
    <div className={styles.listContainer} onClick={handleClickk}>
      {/* @ts-ignore */}
      <p>{`${item?.selectedPortion?.quantity} ${item?.selectedPortion?.name} ${item?.ingredientId?.ingredientName}`}</p>

      {/* <span className={styles.listContainer__tooltiptext}>
        Drag to the left
      </span> */}

      {dragIcon ? (
        <button className={styles.listContainer__draggableBtn}>
          {/* <DragIndicatorIcon /> */}
          <img src="/icons/noun_drag_3124730.svg" alt="dragIcon" />
        </button>
      ) : null}

      {plusIcon ? (
        <button
          className={styles.listContainer__addBtn}
          onClick={() => (handleClick ? handleClick(items) : null)}
        >
          <AddCircleOutlineIcon />
        </button>
      ) : null}

      {deleteIcon ? (
        <button
          className={styles.listContainer__addBtn}
          onClick={() =>
            /* @ts-ignore */
            handleDelete ? handleDelete(item?.ingredientId?._id) : null
          }
        >
          <HighlightOffIcon />
        </button>
      ) : null}
    </div>
  );
};

export default RecipeItem;
