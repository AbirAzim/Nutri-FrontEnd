import ArrowDropUp from "../../public/icons/arrow_drop_up_black_36dp.svg";
import ArrowDropDown from "../../public/icons/arrow_drop_down_black_36dp.svg";
import React, { useRef, useState } from "react";
import styles from "./dpd.module.scss";

interface Arri {
  title: string;
  val: string;
}

interface dropdownInterface {
  value?: Arri;
  setValue?: Function;
  height?: Number;
  list: Array<Arri>;
}

export default function DropdownTwoComponent({
  value,
  setValue,
  height,
  list,
}: dropdownInterface) {
  const ref = useRef<any>();
  const [active, setActive] = useState(false);
  const style = height ? { height: `${height}px` } : { height: "40px" };

  const handleToggle = () => {
    setActive(() => !active);
  };

  const handleToggleVlaue = (item) => {
    setValue(item);
    handleToggle();
  };

  return (
    <div className={styles.dpd}>
      <div className={styles.dropdown} ref={ref} style={style}>
        <div className={styles.dropdown__top} style={style} onClick={handleToggle}>
          {value && value.title}
          <div>
            {!active ? (
              <ArrowDropDown className={styles.dropdown__top__icon} />
            ) : (
              <ArrowDropUp className={styles.dropdown__top__icon} />
            )}
          </div>
        </div>
        {active ? (
          <div className={styles.dropdown__bottom}>
            <div className={styles.menu}>
              {list &&
                list.map((item, i) => (
                  <div
                    key={"item" + i}
                    className={styles.dropdown__bottom__list}
                    onClick={() => handleToggleVlaue(item)}
                  >
                    {item.title}
                  </div>
                ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
