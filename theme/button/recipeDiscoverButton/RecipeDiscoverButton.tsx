/* eslint-disable @next/next/no-img-element */
import React, { ReactNode } from "react";
import styles from "./RecipeDiscoverButton.module.scss";

type RecipeDiscoverButtonProps = {
  text?: string | number;
  handleClick?: () => void;
  icon?: string | ReactNode;
  disable?: boolean;
  style?: React.CSSProperties;
};

const RecipeDiscoverButton = ({
  handleClick = () => {},
  icon = "",
  text = "Recipe",
  disable = false,
  style = {},
}: RecipeDiscoverButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={handleClick}
      style={style}
      disabled={disable ? true : false}
    >
      {typeof icon === "string" ? (
        <img src={icon} alt="icon" className={styles.img} />
      ) : (
        icon
      )}
      <p className={styles.text}>{text}</p>
    </button>
  );
};

export default RecipeDiscoverButton;
