/* eslint-disable @next/next/no-img-element */
import React, { ReactNode, useState } from "react";
import Icon from "../../component/atoms/Icon/Icon.component";
import styles from "./button.module.scss";

interface buttonInterface {
  type?:
    | "text"
    | "primary"
    | "buttonWithIcon"
    | "transparent"
    | "transparentHover"
    | "border";
  fontName?: any;
  value: string;
  fullWidth?: number;
  width?: number;
  style?: object;
  icon?: string | ReactNode;
  onClick?: () => void;
}

export default function ButtonComponent({
  type,
  style,
  value,
  fullWidth,
  width,
  icon,
  fontName,
  onClick,
}: buttonInterface) {
  // STEP 1: INITIALIZE PROPS TO AVOID UI FALL
  type = type || "text";
  style = style || {};
  if (fullWidth) style = { ...style, width: "100%" };
  if (width) style = { ...style, width: width };
  value = value || type;
  icon = icon || "/images/formulate.svg";

  const clickHandler = () => {
    onClick && onClick();
  };

  // CASE PRIMARY: IF TYPE IS PRIMARY RETURN PRIMARY BUTTON
  if (type === "primary")
    return (
      <button
        className={styles.button + " " + styles.primary}
        style={style}
        onClick={clickHandler}
      >
        {value}
      </button>
    );
  if (type === "buttonWithIcon")
    return (
      <button
        className={styles.button + " " + styles.primary}
        style={style}
        onClick={clickHandler}
      >
        {typeof icon === "string" ? (
          <img src={icon} alt="icon" className={styles.icon} />
        ) : (
          <div className={styles.icon}>{icon}</div>
        )}

        {value}
      </button>
    );

  if (fontName)
    return (
      <button
        className={styles.button + " " + styles.primary}
        style={style}
        onClick={clickHandler}
      >
        <Icon fontName={fontName} size={"2rem"} />
        <span className="ml-10">{value}</span>
      </button>
    );

  // CASE TRANSPARENT: RETURN TRANSPARENT BUTTON
  if (type === "transparent")
    return (
      <button
        className={styles.button + " " + styles.transparent}
        style={style}
        onClick={clickHandler}
      >
        {value}
      </button>
    );

  if (type === "transparentHover")
    return (
      <button
        className={styles.button + " " + styles.transparent__hover}
        style={style}
        onClick={clickHandler}
      >
        {value}
      </button>
    );

  if (type === "border")
    return (
      <button
        className={styles.border__button}
        style={style}
        onClick={clickHandler}
      >
        {value}
      </button>
    );

  // CASE DEFAULT: RETURN WHITE BUTTON
  return (
    <button className={styles.button} style={style} onClick={clickHandler}>
      {value}
    </button>
  );
}
