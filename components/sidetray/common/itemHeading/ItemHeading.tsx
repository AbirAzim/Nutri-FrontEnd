import Image from "next/image";
import React from "react";
import styles from "./ItemHeading.module.scss";

const ItemHeading = ({
  image = "",
  title = "",
}: {
  image: string;
  title: string;
}) => {
  return (
    <section className={styles.headingContainer}>
      <header className={styles.titleBox}>
        <div className={styles.imgBox}>
          <Image
            src={image}
            alt="img"
            width={45}
            height={45}
            objectFit="cover"
          />
        </div>
        <h3 className={styles.title}>{title}</h3>
      </header>
    </section>
  );
};

export default ItemHeading;
