import { faArrowLeft, faHouse } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import HeadTagInfo from "../../../theme/headTagInfo";
import styles from "./index.module.scss";

interface Props {
  errorMessage?: string;
  image?: string;
  style?: React.CSSProperties;
  showBackIcon?: boolean;
  showHomeIcon?: boolean;
  imageWidth?: number;
  imageHight?: number;
}

const ErrorPage = ({
  errorMessage = "An error occurred",
  image = "/icons/page_not_found.svg",
  imageHight = 400,
  imageWidth = 400,
  showBackIcon = true,
  showHomeIcon = true,
  style = {},
}: Props) => {
  const router = useRouter();

  return (
    <div className={styles.errorPageContainer} style={style}>
      <HeadTagInfo
        description={errorMessage || "page not found(404)"}
        title={errorMessage || "Page not found"}
      />
      <Image
        src={image}
        alt="error"
        width={imageWidth}
        height={imageHight}
        objectFit="contain"
      />
      <div className={styles.info}>
        <p className={styles.text}>{errorMessage} </p>
        {showBackIcon && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={styles.icon}
            onClick={() => router.back()}
          />
        )}
        {showHomeIcon && (
          <FontAwesomeIcon
            icon={faHouse}
            className={styles.icon}
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
