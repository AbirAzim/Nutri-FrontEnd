import React, { useState } from "react";
import styles from "./cards.module.scss";
import AddCircleOutlineIcon from "../../../public/icons/add_circle_outline_black_36dp.svg";
import RemoveCircleOutlineIcon from "../../../public/icons/remove_circle_outline_black_36dp.svg";

const Cards = () => {
  const [isReadMore, setIsReadMore] = useState(0);
  const toggleReadMore = (index) => {
    setIsReadMore(index);
  };

  const CardData = [
    {
      Title: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
      Content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
    },
    {
      Title: "Title hjlljclg",
      Content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
    },
    {
      Title: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
      Content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
    },
    {
      Title: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
      Content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ",
    },
    {
      Title: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
      Content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
    },
  ];
  return (
    <ul className={styles.card}>
      {CardData.map(({ Title, Content }, index: number) => {
        return (
          <div
            className={styles.cardDiv}
            key={index}
            onClick={() => toggleReadMore(index)}
          >
            <h5>
              {Title}
              {isReadMore == index ? (
                <AddCircleOutlineIcon />
              ) : (
                <RemoveCircleOutlineIcon />
              )}
            </h5>
            {isReadMore === index ? (
              <div style={{ display: "block" }}>{Content}</div>
            ) : (
              <div style={{ display: "none" }} />
            )}
          </div>
        );
      })}
    </ul>
  );
};

export default Cards;
