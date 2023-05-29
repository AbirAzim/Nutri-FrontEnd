import React, { useCallback, useRef } from "react";
import { faPlus, faTimes } from "@fortawesome/pro-light-svg-icons";
import { useDropzone } from "react-dropzone";
import styles from "./Upload.module.scss";
import Icon from "../../atoms/Icon/Icon.component";
import Checkbox from "../Forms/Checkbox.component";

interface UploadProps {
  label?: string;
  multiple?: boolean;
  required?: boolean;
  className?: string;
  imageState: [(Image | any)[], any];
  featuredState?: [string, any];
  imagesLimit?: number;
  size?: "medium" | "large";
}

const Upload = (props: UploadProps) => {
  const {
    label,
    multiple,
    required,
    className,
    imageState,
    featuredState,
    imagesLimit,
    size,
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);
  const [images, setImages] = imageState;
  let featuredImage: string, setFeaturedImage: any;
  if (featuredState) {
    featuredImage = featuredState[0];
    setFeaturedImage = featuredState[1];
  }

  const addImageHandler = useCallback(
    (e: any) => {
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setImages((images) => images.concat(file));
      }
      fileInput.current.value = "";
    },
    [setImages],
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      addImageHandler({ target: { files: acceptedFiles } });
    },
    [addImageHandler],
  );

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   // accept: {
  //   //   "image/jpeg": [".jpeg", ".png", ".jpg", ".webp"],
  //   // },
  //   noClick: true,
  //   onDrop,
  // });

  let sizeClass = "";
  switch (size) {
    case "large":
      sizeClass = styles.large;
      break;
    case "medium":
      sizeClass = styles.medium;
      break;
    default:
      sizeClass = "";
      break;
  }
  return (
    <div className={className ? className : ""}>
      {label && (
        <label
          htmlFor={label}
          className={`${styles.label} ${required ? styles.required : ""}`}
        >
          {label}
        </label>
      )}
      <div
        className={`${styles["product-images"]} ${sizeClass}`}
        // {...getRootProps()}
        style={{
          padding: "1rem 0",
          // background: isDragActive ? "#f7f7f7" : "inherit",
        }}
      >
        {images.map((img, idx) => {
          const isFileType = !img.hasOwnProperty("url");
          const src = isFileType ? URL.createObjectURL(img) : img?.url;
          return (
            <figure key={idx}>
              <button
                type="button"
                className={styles["remove-image"]}
                onClick={(e) => {
                  const newImages = images.filter((image) => {
                    if (image.hasOwnProperty("url")) {
                      return image?.url !== img?.url;
                    } else {
                      URL.revokeObjectURL(src);
                      return (
                        image.name + image.lastModified !==
                        img?.name + img?.lastModified
                      );
                    }
                  });
                  setImages(newImages);
                  e.stopPropagation();
                }}
              >
                <Icon fontName={faTimes} />
              </button>
              <img src={src} alt="" />
              {featuredState && (
                <Checkbox
                  name={img}
                  checked={img === featuredImage}
                  className={styles["featured-image"]}
                  onChange={(e) => setFeaturedImage(img)}
                />
              )}
            </figure>
          );
        })}
        {
          // If multiple images are allowed and there is no limit
          ((multiple && !imagesLimit) ||
            // If the Upload component is multiple & there is limit for number of Image Upload
            (multiple && imagesLimit && images.length < imagesLimit) ||
            // If the Upload component is not multiple & No Image is Uploaded Yet
            (!multiple && images.length === 0)) && (
            <label className={styles["add-new-image"]}>
              <Icon fontName={faPlus} size="3.5rem" />
              <input
                ref={fileInput}
                type="file"
                onChange={(e) => {
                  addImageHandler(e);
                  e.stopPropagation();
                }}
                style={{ display: "none" }}
                multiple
                // {...getInputProps()}
              />
            </label>
          )
        }
      </div>
    </div>
  );
};

export default Upload;
