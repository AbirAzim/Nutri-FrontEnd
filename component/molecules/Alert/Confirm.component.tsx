import React, { useEffect } from "react";
import { FaFacebookF, FaPinterestP, FaTwitter } from "react-icons/fa";
import { MdClose, MdMail } from "react-icons/md";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";

import CustomModal from "../../../theme/modal/customModal/CustomModal";
import styles from "./Confirm.module.scss";
import { useAppSelector } from "../../../redux/hooks";

interface ShareProps {
  show: boolean;
  setShow: any;
  message: string;
  onConfirm: (type: "MERGE" | "REMOVE") => void;
}

const ConfirmAlert: React.FC<ShareProps> = (props) => {
  const { message, show, onConfirm } = props;
  // useEffect(() => {
  //   if (!show) return;
  //   onShare();
  // }, [onShare, show]);

  return (
    <CustomModal open={show}>
      <div className={styles.alert}>
        <h3>{message}</h3>
        <div className={styles.buttonGroup}>
          <button
            className={styles.submitBtn}
            style={{ boxShadow: "5px 5px 15px #fe5d1f38" }}
            onClick={() => onConfirm("MERGE")}
          >
            Merge Plans
          </button>
          <button
            className={styles.cancelBtn}
            onClick={() => onConfirm("REMOVE")}
          >
            Replace Plans
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default ConfirmAlert;
