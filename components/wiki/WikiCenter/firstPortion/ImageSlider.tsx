import React, {
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
  useState,
} from "react";
import styles from "../wikiCenter.module.scss";
import CustomSlider from "../../../../theme/carousel/carousel.component";
import Image from "next/image";
import { placeHolderImage } from "../../wikiSingleItem/WikiSingleItem";
import { CoverImageType } from "..";
import IconWarper from "../../../../theme/iconWarper/IconWarper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/pro-solid-svg-icons";

interface Props {
  imagesWithinBlock?: CoverImageType[];
  setExpandAllCollapse?: Dispatch<SetStateAction<boolean>>;
}

const ImageSlider = ({
  imagesWithinBlock = [],
  setExpandAllCollapse = () => {},
}: Props) => {
  const [play, setPlay] = useState(false);
  const captionRef = useRef<HTMLDivElement>(null);
  const imageSliderContainerRef = useRef<HTMLDivElement>(null);
  let timer = useRef(null);

  const findImageBlock = (id: string) => {
    if (!id) {
      return;
    }
    setExpandAllCollapse(true);

    let titleElement = null;
    timer.current = setTimeout(() => {
      titleElement = document.getElementById(id);
      titleElement?.scrollIntoView({ behavior: "smooth" });
      titleElement.style.backgroundColor = "#d2e7bc";
      // titleElement.style.backgroundColor = "";
    }, 300);
    timer.current = setTimeout(() => {
      titleElement.style.backgroundColor = "";
    }, 2500);
  };
  const togglePlay = (status: boolean = false) => {
    setPlay(status);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <CustomSlider>
      {imagesWithinBlock?.length ? (
        imagesWithinBlock.map((img, index) => {
          const { caption, id, url, mediaUrl, type } = img;
          return (
            <div
              key={index}
              className={styles.imageSliderContainer}
              ref={imageSliderContainerRef}
              onMouseEnter={() =>
                (type === "audio" || type === "video") && togglePlay(true)
              }
              onMouseLeave={() =>
                (type === "audio" || type === "video") && togglePlay(false)
              }
            >
              <div
                className={styles.bgBlurImage}
                style={{ backgroundImage: `url(${img.url})` }}
              ></div>

              <Image
                src={img.url}
                alt="coverImage"
                layout="fill"
                objectFit="contain"
              />
              {img?.caption && (
                <div
                  ref={captionRef}
                  className={styles.imageCaption}
                  style={{
                    top: `calc(100% - ${
                      captionRef?.current?.clientHeight || 34
                    }px)`,
                  }}
                >
                  <p
                    className={styles.captionText}
                    onClick={() => findImageBlock(img?.id)}
                  >
                    {img?.caption}
                  </p>
                </div>
              )}
              {(type === "audio" || type === "video") && !play && (
                <div className={styles.playButton}>
                  <IconWarper
                    // handleClick={() => router?.push(backLink)}
                    iconColor="iconColorWhite"
                    defaultBg="primary"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <FontAwesomeIcon icon={faPlay} />
                  </IconWarper>
                </div>
              )}
              {type === "audio" && mediaUrl && play && (
                <div className={styles.playButton}>
                  <audio controls autoPlay muted>
                    <source src={mediaUrl} />
                    Your browser does not support the video tag.
                  </audio>
                </div>
              )}
              {type === "video" && mediaUrl && play && (
                <div className={styles.playButton}>
                  <video
                    width="100%"
                    height="100%"
                    controls
                    autoPlay
                    muted
                    // onMouseLeave={() => setPlay(false)}
                  >
                    <source src={mediaUrl} />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className={styles.imageSliderContainer}>
          <Image
            src={placeHolderImage}
            alt="coverImage"
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
    </CustomSlider>
  );
};

export default ImageSlider;
