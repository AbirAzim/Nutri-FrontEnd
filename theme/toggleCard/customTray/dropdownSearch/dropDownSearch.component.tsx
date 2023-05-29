import React from "react";
import { BsSearch } from "react-icons/bs";
import { VscTriangleDown } from "react-icons/vsc";
import styles from "./dropDownSearch.module.scss";

interface DropDownSearchInterface {
  selectedType?: string;
}
const DropDownSearch = ({
  selectedType,
}: DropDownSearchInterface) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContainer__tray}>
        <div className={styles.mainContainer__tray__type}>
          <span className={styles.mainContainer__tray__type__text}>
            {selectedType}
          </span>

          <VscTriangleDown
            className={styles.mainContainer__tray__type__arrow}
          />
        </div>
        <BsSearch
          className={styles.mainContainer__tray__type__search}
        />
      </div>
    </div>
  );
};
export default DropDownSearch;
