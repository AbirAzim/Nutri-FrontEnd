import React from "react";
import styles from "../header.module.scss";
import { SiInstagram } from "react-icons/si";
import {
  FaPinterestP,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

export default function SocialComponent(props) {
  return (
    <div className={styles.social}>
      <div className={styles.social__child}>
        <FaFacebookF />
      </div>
      <div className={styles.social__child}>
        <SiInstagram />
      </div>
      <div className={styles.social__child}>
        <FaPinterestP />
      </div>
      <div className={styles.social__child}>
        <FaYoutube />
      </div>
      <div className={styles.social__child}>
        <FaTwitter />
      </div>
    </div>
  );
}
