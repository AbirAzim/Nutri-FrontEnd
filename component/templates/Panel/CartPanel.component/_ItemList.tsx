import React, { useCallback, useMemo } from "react";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import IconButton from "../../../atoms/Button/IconButton.component";
import Checkbox from "../../../organisms/Forms/Checkbox.component";

import styles from "./Panel.module.scss";

interface ItemListProps {
  items: any[];
  toggle: 1 | 2;
  checkedGroceriesState: [string[], any];
  checkedPantriesState: [string[], any];
  checkedStaplesState: [string[], any];
  openEditPanel: (item: any, isStaple?: boolean) => void;
  deleteItems: any;
  isStaples?: boolean;
}

const ItemList = (props: ItemListProps) => {
  const {
    items,
    toggle,
    checkedGroceriesState,
    checkedPantriesState,
    checkedStaplesState,
    openEditPanel,
    deleteItems,
    isStaples,
  } = props;

  const [checkedGroceries, setCheckedGroceries] = checkedGroceriesState;
  const [checkedPantries, setCheckedPantries] = checkedPantriesState;
  const [checkedStaples, setCheckedStaples] = checkedStaplesState;

  const selectHandler = (id: string, checked: boolean) => {
    if (isStaples) {
      if (!checked)
        setCheckedStaples(checkedStaples.filter((item) => item !== id));
      else setCheckedStaples([...checkedStaples, id]);
      return;
    }
    if (toggle === 1) {
      if (!checked)
        setCheckedGroceries(checkedGroceries.filter((item) => item !== id));
      else setCheckedGroceries([...checkedGroceries, id]);
    } else {
      if (!checked)
        setCheckedPantries(checkedPantries.filter((item) => item !== id));
      else setCheckedPantries([...checkedPantries, id]);
    }
  };

  const isChecked = useCallback(
    (item) => {
      const id = item.ingredientId._id;
      return toggle === 1
        ? checkedGroceries.includes(id)
        : checkedPantries.includes(id) || checkedStaples.includes(id);
    },
    [checkedGroceries, checkedPantries, checkedStaples, toggle],
  );

  return (
    <ul>
      {items?.map((item, i) => (
        <li className={styles.ingredients__item} key={item.ingredientId._id}>
          <div className={styles.ingredients__content}>
            <Checkbox
              checked={isChecked(item)}
              onChange={(e) =>
                selectHandler(item.ingredientId._id, e.target.checked)
              }
            />
            <div className={styles.ingredients__image}>
              <figure className="mr-10">
                <img
                  src={item.ingredientId.featuredImage || "/food/frozen.png"}
                  alt="img"
                />
              </figure>
            </div>

            <div>
              <div className={styles.ingredients__title}>
                <div className="blending-item-title flex ai-center jc-between">
                  <p>{item.ingredientId.ingredientName}</p>
                </div>
              </div>
              <p className={styles.ingredients__quantity}>
                {item.quantity} {item.selectedPortion}
              </p>
            </div>
          </div>
          <div className="flex ai-center">
            {!isStaples && (
              <IconButton
                size="small"
                variant="fade"
                className={styles.button}
                style={{ marginRight: 5 }}
                onClick={() => openEditPanel(item, isStaples)}
              >
                <FaPen />
              </IconButton>
            )}
            <IconButton
              size="small"
              variant="fade"
              className={styles.button}
              onClick={() => deleteItems([item.ingredientId._id], isStaples)}
            >
              <FaRegTrashAlt />
            </IconButton>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(ItemList);
