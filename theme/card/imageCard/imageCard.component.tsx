import Image from "next/image";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import styles from "./imageCard.module.scss";

const ImageCardComponent = () => {
  const [imageArrayState, setImageArrayState] = useState([]);
  const imageArray = [
    { image: "/images/5.jpeg" },
    { image: "/images/5.jpeg" },
    { image: "/images/5.jpeg" },
  ];
  const handleClick = () => {
    const elem = document.getElementById("file__picker__component");
    elem?.click();
  };

  return (
    <div className={styles.mainContainer}>
      <input
        onChange={() => {}}
        src=""
        type={"file"}
        name="files[]"
        id="file__picker__component"
        multiple
        hidden
        accept="image/jpeg, image/jpg"
      />
      {imageArray?.map(({ image }) => (
        <div className={styles.imageCard} key={`${image}`}>
          <Image
            src={image || "/images/5.jpeg"}
            alt={""}
            objectFit={"cover"}
            layout={"fill"}
          />
          <IoIosClose className={styles.imageCard__cross} />
        </div>
      ))}
      <div
        className={styles.mainContainer__addDiv}
        onClick={handleClick}
      >
        <AiOutlinePlus
          className={styles.mainContainer__addDiv__icon}
        />
      </div>
    </div>
  );
};

export default ImageCardComponent;
