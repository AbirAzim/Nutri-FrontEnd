import React, { useRef, useState, useEffect, useMemo, Fragment } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./Gallery.module.scss";
import Icon from "../../atoms/Icon/Icon.component";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import { format, isSameDay } from "date-fns";

const Gallery = ({ date, galleries }) => {
  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);
  const { nav1, nav2 } = state;

  const images = useMemo(() => {
    let imageData = [];
    galleries?.forEach((gallery) => {
      // console.log(gallery.assignDate, gallery.images, gallery.images.reverse());
      const imagesOnEachDate = [];
      gallery.images.forEach((img) => {
        imagesOnEachDate.push({
          date: gallery.assignDate,
          src: img.url,
        });
      });
      imageData = [...imageData, ...imagesOnEachDate.reverse()];
    });
    return imageData.reverse();
  }, [galleries]);

  const initialSlide = useMemo(
    () => images.findIndex((img) => isSameDay(new Date(img.date), date)),
    [date, images],
  );

  return (
    <div className={styles.container}>
      <div>
        <Slider
          asNavFor={nav2}
          ref={(slider) => (slider1.current = slider)}
          nextArrow={<MainNextArrow />}
          prevArrow={<MainPrevArrow />}
          initialSlide={initialSlide}
          draggable
        >
          {images.map((item) => (
            <div
              key={item.date + item.src}
              className={styles.gallery__activeSlide}
            >
              <img src={item.src} alt={item.date} />
            </div>
          ))}
        </Slider>
      </div>
      <div className={styles.gallery__previews}>
        <Slider
          asNavFor={nav1}
          ref={(slider) => (slider2.current = slider)}
          slidesToShow={4}
          swipeToSlide={true}
          focusOnSelect={true}
          infinite={false}
          lazyLoad="progressive"
          centerPadding="0px"
          nextArrow={<PreviewNextArrow />}
          prevArrow={<PreviewPrevArrow />}
          initialSlide={initialSlide}
        >
          {images.map((item) => (
            <div key={item.date + item.src} className={styles.gallery__preview}>
              <img
                className={styles.gallery__preview__img}
                src={item.src}
                alt={item.date}
                onDragStart={() => false}
              />
              <p className={styles.gallery__preview__caption}>
                {format(new Date(item.date), "EEEE, MMM dd")}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Gallery;

function MainNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.main} ${styles["main--right"]}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <Icon fontName={faChevronRight} size="2.5rem" />
    </div>
  );
}

function MainPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.main} ${styles["main--left"]}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <Icon fontName={faChevronLeft} size="2.5rem" />
    </div>
  );
}

function PreviewNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.arrow} ${styles["arrow--right"]}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <Icon fontName={faChevronRight} size="2.5rem" />
    </div>
  );
}

function PreviewPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.arrow} ${styles["arrow--left"]}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <Icon fontName={faChevronLeft} size="2.5rem" />
    </div>
  );
}
