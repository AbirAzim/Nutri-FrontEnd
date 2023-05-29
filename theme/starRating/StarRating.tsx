import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./StarRating.module.scss";

type StarRatingProps = {
  rating?: number;
  setRating?: Dispatch<SetStateAction<number>>;
  isAbleToSetRating?: boolean;
};

const StarRating = ({
  rating = 0,
  setRating = () => {},
  isAbleToSetRating = true,
}: StarRatingProps) => {
  const [hover, setHover] = useState(0);

  useEffect(() => {
    if (isAbleToSetRating) {
      setHover(rating);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={`${styles.button} ${
              index <= (hover || rating) ? styles.on : styles.off
            }`}
            style={{ cursor: isAbleToSetRating ? "pointer" : "default" }}
            onClick={() => isAbleToSetRating && setRating(index)}
            onMouseEnter={() => isAbleToSetRating && setHover(index)}
            onMouseLeave={() => isAbleToSetRating && setHover(rating)}
          >
            <span className={styles.star}>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
