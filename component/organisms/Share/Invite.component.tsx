import React, { Dispatch, SetStateAction, useEffect } from "react";
import { faShareNodes } from "@fortawesome/pro-regular-svg-icons";
import Icon from "../../atoms/Icon/Icon.component";
import styles from "./Share.module.scss";
import CustomModal from "../../../theme/modal/customModal/CustomModal";
import InviteUserForm from "./InviteUserForm";
import { SharedUserInfoType } from "./Distribute.component";

interface ShareProps {
  id?: string;
  title?: string;
  show: boolean;
  setShow: any;
  handleInvitation?: () => void;
  handleCancel?: () => void;
  emails?: SharedUserInfoType[];
  setEmails?: Dispatch<SetStateAction<SharedUserInfoType[]>>;
  submitBtnText?: string;
  loading?: boolean;
}

const Invite = (props: ShareProps) => {
  const { id, title, show, setShow, ...rest } = props;

  return (
    <CustomModal open={show} setOpen={setShow}>
      <div className={styles.share}>
        <div className={styles.share__header}>
          <div className={styles.leftSide}>
            <Icon fontName={faShareNodes} size="2.5rem" />
            <h3>{title}</h3>
          </div>
        </div>
        <InviteUserForm {...rest} />
      </div>
    </CustomModal>
  );
};

export default Invite;
