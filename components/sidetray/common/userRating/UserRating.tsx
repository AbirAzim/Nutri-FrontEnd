import { faUser } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import StarRating from "../../../../theme/starRating/StarRating";
import styles from "./UserRating.module.scss";

interface Props {
  userImage: string;
  userName: string;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}
const UserRating = ({ rating, setRating, userImage, userName }: Props) => {
  return (
    <div className={styles.userRatingContainer}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className={styles.imageBox}>
          {userImage ? (
            <img src={userImage} alt="user_img" />
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
        </div>
        <h6 className={styles.userName}>{userName}</h6>
      </div>
      <StarRating rating={rating} setRating={setRating} />
    </div>
  );
};

export default UserRating;
