import { FiPlusCircle } from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import styles from "./SingleIngredient.module.scss";
import DragIndicatorIcon from "../../../../public/icons/drag_indicator_black_36dp.svg";
import { IoCloseCircleOutline } from "react-icons/io5";
import Tooltip from "../../../../theme/toolTip/CustomToolTip";

interface SingleIngredient {
  label?: string;
  dargProps?: any;
  handleAdd?: () => void;
  handleClose?: () => void;
  showPlusIcon?: boolean;
  showCloseIcon?: boolean;
}

const SingleIngredient = ({
  dargProps = {},
  handleAdd = () => {},
  handleClose = () => {},
  showPlusIcon = true,
  label = "Label",
  showCloseIcon = false,
}: SingleIngredient) => {
  return (
    <div className={styles.singleIngredientContainer}>
      <div className={styles.leftSide}>
        <div {...dargProps}>
          <MdDragIndicator className={styles.dargIcon} />
        </div>

        <p className={styles.text}>{label}</p>
      </div>
      <div className={styles.rightSide}>
        {showPlusIcon ? (
          <FiPlusCircle className={styles.plusIcon} onClick={handleAdd} />
        ) : null}
        {showCloseIcon ? (
          <IoCloseCircleOutline
            className={styles.closeIcon}
            onClick={handleClose}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SingleIngredient;
