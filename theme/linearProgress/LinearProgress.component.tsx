import React, { useState } from "react";
import useGetDefaultPortionOfnutration from "../../customHooks/useGetDefaultPortionOfNutration";
import { Portion } from "../../type/wikiCompareList";
import Tooltip from "../toolTip/CustomToolTip";
import styles from "./linearProgress.module.scss";
import LinearIndicatorcomponent from "./progress/progress.component";
interface Props {
  element?: {};
  name: string;
  ingredientId?: string;
  percent: number;
  checkbox?: boolean;
  checkedState?: boolean;
  units?: string;
  highestValue: number;
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  portion?: Portion;
  highLight?: boolean;
}

const Linearcomponent = ({
  element,
  name,
  percent,
  checkbox,
  units,
  highestValue,
  ingredientId = "",
  checkedState,
  handleOnChange = () => {},
  portion = {
    default: true,
    meausermentWeight: "",
    measurement: "",
  },
  highLight = false,
}: Props) => {
  const [ingId, setIngId] = useState("");
  useGetDefaultPortionOfnutration(ingId);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.cardHeadComponent}>
        {checkbox === true ? (
          <span className={styles.container}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={checkedState}
              onChange={(e) => handleOnChange(e)}
            />
            <span className={styles.mark}></span>
          </span>
        ) : null}
        <div className={styles.title} onClick={() => setIngId(ingredientId)}>
          {name}
        </div>
        <div className={styles.score}>
          {`${percent}${units?.toLowerCase()}`}
        </div>
      </div>
      <Tooltip
        content={`1 ${portion?.measurement} (${portion?.meausermentWeight}g)`}
        direction="top"
      >
        <LinearIndicatorcomponent
          percent={percent}
          highestValue={highestValue}
          highLight={highLight}
        />
      </Tooltip>
    </div>
  );
};
export default Linearcomponent;
