import React from "react";
import styles from "./ContentTray.module.scss";
import Image from "next/image";
import Slider from "../../../../theme/carousel/carousel.component";
import MenubarComponent from "../../../../theme/menuBar/menuBar.component";
import Link from "next/link";

const ContentTray = (props) => {
  const { id, hasFilter, filters, customHTML, tabState, allUrl, settings } =
    props;
  const responsiveSetting = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1380,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    ...settings,
  };

  return (
    <div className={styles.main__slider}>
      <div className={styles.heading}>
        <div className={styles.leftSide}>
          {typeof props?.image === "string" ? (
            <Image
              src={props.image}
              alt={"Icon"}
              objectFit={"contain"}
              height={30}
              width={30}
            />
          ) : (
            props?.image
          )}

          <h3 className={styles.title}>{props.heading}</h3>
          {hasFilter && (
            <MenubarComponent
              className={styles.main__slider__tabmenu}
              containerId={id}
              childs={filters}
              setValue={tabState[1]}
              value={tabState[0]}
            />
          )}
        </div>
        <Link href={allUrl || "#"} passHref>
          <span className={styles.rightSide}>View All</span>
        </Link>
      </div>
      <div>
        {customHTML ? (
          <div
            style={{
              height: "277px",
              background: "#fff",
              width: "99.5%",
              borderRadius: "8px",
            }}
          >
            <h3
              style={{
                display: "flex",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Sorry, No Recipe Found!!!
            </h3>
          </div>
        ) : (
          <Slider moreSetting={responsiveSetting}>{props.children}</Slider>
        )}
      </div>
    </div>
  );
};
export default ContentTray;
