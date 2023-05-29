import React from "react";
import ButtonComponent from "../../button/buttonA/button.component";
import styles from "./helpBox.module.scss";

const HelpBox = () => {
  let dropdownItem = [
    "Select Categories",
    "Leafy Green",
    "Berry",
    "Herbal",
    "Fruity",
    "Balancer",
    "Fatty",
    "Seasoning",
    "Flavor",
    "Rooty",
    "Flowering",
    "Liquid",
  ];
  return (
    <div className={styles.helpBox}>
      <div className={styles.container}>
        <h2>How we can help you</h2>
        <div className={styles.formGroup}>
          <select
            name="dropdown"
            id="dropdown"
            className={styles.customSelectbx}
            style={{ backgroundImage: `url(/icons/dropdown.svg)` }}
          >
            {dropdownItem.map((item, index) => {
              return (
                <option value={item.toLowerCase()} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <textarea placeholder={"Write a review pr comment here"} className={styles.reviewBox}/>
        <div className={styles.buttonDiv}>
              <ButtonComponent
                type="primary"
                style={{ height: "100%" }}
                value="Sign"
                fullWidth={true}
              />
            </div>
      </div>
    </div>
  );
};

export default HelpBox;
