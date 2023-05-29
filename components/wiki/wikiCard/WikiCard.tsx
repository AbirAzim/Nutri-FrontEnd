import { faMessageDots as faMessageDotsSolid } from "@fortawesome/pro-solid-svg-icons";
import { faMessageDots as faMessageDotsLight } from "@fortawesome/pro-light-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setIsOpenWikiCommentsTray,
  setWikiCommentsCurrentIngredient,
} from "../../../redux/slices/wikiSlice";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import { WikiListType, WikiType } from "../../../type/wikiListType";
import styles from "./WikiCard.module.scss";

interface PortionsType {
  default: boolean;
  measurement: string;
  meausermentWeight: string;
}

interface WikiCardProps {
  style?: React.CSSProperties;
  title?: string;
  description?: string;
  image?: string;
  type?: WikiType;
  research?: number;
  rxScore?: number;
  comments?: number;
  author?: string;
  portions?: PortionsType[];
  id?: string;
  hasInCompare?: boolean;
  setWikiList?: Dispatch<SetStateAction<WikiListType[]>>;
  handleAddOrRemoveToWikiCompareList?: (
    ingredientId: string,
    isCompared: boolean,
  ) => void;
}

const WikiCard = ({
  style = {},
  comments = 0,
  description = "",
  image = "/images/imgbig4.png",
  research = 20,
  rxScore = 20,
  title = "",
  type = "Ingredient",
  author = "",
  portions = [],
  id = "",
  hasInCompare = false,
  setWikiList = () => {},
  handleAddOrRemoveToWikiCompareList = () => {},
}: WikiCardProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isOpenWikiCommentsTray } = useAppSelector((state) => state?.wiki);

  // click wiki item title
  const handleClickTitle = async (
    id: string,
    portions: PortionsType[],
    type: string,
  ) => {
    if (type === "Nutrient") {
      router?.push(`/wiki/${type}/${id}`);
    } else {
      const measurementWeight = portions?.find(
        (items) => items?.default,
      )?.meausermentWeight;

      if (measurementWeight) {
        router?.push(`/wiki/${type}/${id}/${measurementWeight}`);
      }
    }
  };

  const openWikiCommentsTray = (
    e: React.SyntheticEvent,
    id: string,
    title: string,
    image: string,
  ) => {
    e?.stopPropagation;
    if (!isOpenWikiCommentsTray) {
      dispatch(setIsOpenWikiCommentsTray(true));
    }
    dispatch(
      setWikiCommentsCurrentIngredient({
        id,
        image,
        title,
        type,
      }),
    );
  };
  return (
    <div className={styles.wikiCardContainer} style={style}>
      <header className={styles.header}>
        <p
          className={styles.title}
          onClick={() => {
            handleClickTitle(id, portions, type);
            dispatch(
              setWikiCommentsCurrentIngredient({
                id: "",
                image: image || "/images/imgbig4.png",
                title,
                type,
              }),
            );
          }}
        >
          {title}
        </p>
        <IconWarper hover="bgSlightGray">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </IconWarper>
      </header>
      <body className={styles.body}>
        <div className={styles.bodyMain}>
          <div className={styles.imageWarper}>
            <img src={image || "/images/imgbig4.png"} alt="img" />
          </div>
          <div className={styles.infoWarper}>
            <div className={styles.category}>
              <p>{type}</p>
            </div>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
        <div className={styles.bodyFooter}>
          <p className={styles.text}>
            Research <span>{research}</span>{" "}
          </p>
          <p className={styles.text}>
            Rx Score <span>{rxScore}</span>{" "}
          </p>
        </div>
      </body>
      <div className={styles.footer}>
        <div className={styles.author}>
          <p className={styles.text}>{author}</p>
        </div>
        <div className={styles.iconBox}>
          {type === "Ingredient" ? (
            <div className={styles.icon}>
              <img
                src={
                  hasInCompare ? "/icons/compare-1.svg" : "/icons/eclipse.svg"
                }
                alt="icon"
                onClick={() =>
                  handleAddOrRemoveToWikiCompareList(
                    id,
                    hasInCompare ? true : false,
                  )
                }
              />
            </div>
          ) : null}

          <div
            className={styles.commentsIconBox}
            onClick={(e) =>
              openWikiCommentsTray(e, id, title, image || "/images/imgbig4.png")
            }
          >
            <FontAwesomeIcon
              icon={comments ? faMessageDotsSolid : faMessageDotsLight}
              className={`${comments ? styles.activeIcon : ""}`}
            />
            <p
              className={`${styles.text} ${comments ? styles.activeIcon : ""}`}
            >
              {comments}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WikiCard;
