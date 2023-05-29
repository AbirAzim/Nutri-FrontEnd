import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import styles from "./ShareRecipeModal.module.scss";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
  FaVk,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";

interface Props {
  closeModal: () => void;
}

const ShareRecipeModal = ({ closeModal }: Props) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className={styles.shareRecipeModalContainer}>
      <div className={styles.header}>
        <button onClick={closeModal} className="hvr-pop">
          <MdClose className={styles.closeIcon} />
        </button>
        <h5>Share Recipe</h5>
      </div>
      <div className={styles.modalBody}>
        <div className={styles.socialIconGroup}>
          <a className={styles.fbIcon} href="#">
            <FaFacebookF />
          </a>
          <a className={styles.instaIcon} href="#">
            <FaInstagram />
          </a>
          <a className={styles.pinterestIcon} href="#">
            <FaPinterestP />
          </a>
          <a className={styles.twitterIcon} href="#">
            <FaTwitter />
          </a>
          {showMore ? (
            <>
              <a className={styles.linkedinIcon} href="#">
                <FaLinkedinIn />
              </a>
              <a className={styles.vkIcon} href="#">
                <FaVk />
              </a>
            </>
          ) : null}
          <button onClick={() => setShowMore((pre) => !pre)}>
            <MdMoreHoriz className={styles.moreIcon} />
            <p>{showMore ? "Less" : "More"}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareRecipeModal;
