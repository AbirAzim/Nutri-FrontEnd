import Image from "next/image";
import React from "react";
import styles from "./titledImageCard.module.scss";

interface TitledImageCardInterface {
  heading?: string;
  image?: string;
}
const TitledImageCard = ({
  heading,
  image,
}: TitledImageCardInterface) => {
  return (
    <div className={styles.mainContainer}>
      <h5>{heading || "Turmeric Tonic"}</h5>
      <div className={styles.imageContainer}>
        <Image
          src={image || "/images/5.jpeg"}
          alt={""}
          objectFit={"fill"}
          layout={"fill"}
        />
      </div>
    </div>
  );
};

export default TitledImageCard;
