import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import DropDownElemSetting from "./dropDownElem/dropDownElem.component";
import IconSlider from "./iconSlider/IconSlider.component";
import styles from "./settingComponent.module.scss";

const SettingComponent = () => {
  const [settingToggle, setSettingToggle] = useState(false);
  return (
    <div className={styles.settingIconDiv}>
      <VscSettings
        className={styles.settingIconDiv__icon}
        onClick={() => setSettingToggle(!settingToggle)}
      />
      <div
        className={styles.settingIconDiv__settingTray}
        style={settingToggle ? { display: "block" } : {}}
      >
        <div className={styles.settingIconDiv__settingTray__header}>
          <div
            className={
              styles.settingIconDiv__settingTray__iconTextBox
            }
          >
            <VscSettings
              className={
                styles.settingIconDiv__settingTray__iconTextBox__settingIcon
              }
              onClick={() => setSettingToggle(!settingToggle)}
            />
            <p>Planner Setting</p>
          </div>
          <div
            className={styles.settingIconDiv__settingTray__crossIcon}
          >
            <IoMdClose onClick={() => setSettingToggle(false)} />
          </div>
        </div>
        <div
          className={styles.settingIconDiv__settingTray__grocerDiv}
        >
          <div
            className={
              styles.settingIconDiv__settingTray__grocerDiv__containerDiv
            }
          >
            <p>Select Grocer</p>{" "}
            <AiOutlineInfoCircle
              className={
                styles.settingIconDiv__settingTray__grocerDiv__containerDiv__icon
              }
            />
          </div>
          <div
            className={
              styles.settingIconDiv__settingTray__grocerDiv__numberDiv
            }
          >
            32223
          </div>
        </div>
        <div className={styles.settingIconDiv__settingTray_sliderDiv}>
          <IconSlider />
        </div>
        <div
          className={
            styles.settingIconDiv__settingTray__priorityPaymentTray
          }
        >
          <span>
            <p>Priority</p>
            <DropDownElemSetting />
          </span>
          <span>
            {" "}
            <p>Payment Method</p>
            <DropDownElemSetting iconBool />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SettingComponent;
