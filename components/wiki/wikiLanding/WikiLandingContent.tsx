import React from "react";
import styles from "./WikiLanding.module.scss";
import Image from "next/image";
import Carousel from "../../../theme/carousel/carousel.component";
import { WikiListType, WikiType } from "../../../type/wikiListType";
import WikiCard from "../wikiCard/WikiCard";
import SkeletonWikiDiscovery from "../../../theme/skeletons/skeletonWikiDicovery/SkeletonWikiDiscovery";
import notification from "../../utility/reactToastifyNotification";
import ADD_OR_REMOVE_TO_WIKI_COMPARE_LIST from "../../../gqlLib/wiki/mutation/addOrRemoveToWikiCompareList";
import { useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setDbUser } from "../../../redux/slices/userSlice";
import useLocalStorage from "../../../customHooks/useLocalStorage";
import { WikiCompareList } from "../../../type/wikiCompareList";
import GET_INGREDIENT_WIKI_LIST from "../../../gqlLib/wiki/query/getIngredientWikiList";
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
};

interface Props {
  title?: WikiType;
  image?: string;
  loading?: boolean;
  list?: WikiListType[];
  setShowAll?: (arg: WikiType) => void;
}

const WikiLandingContent = ({
  image = "",
  list = [],
  loading = false,
  title = "",
  setShowAll = () => {},
}: Props) => {
  const [addOrRemoveToWikiCompareList] = useMutation(
    ADD_OR_REMOVE_TO_WIKI_COMPARE_LIST,
  );
  const dispatch = useAppDispatch();
  const { dbUser } = useAppSelector((state) => state?.user);
  const [wikiCompareList, setWikiCompareList] = useLocalStorage<
    WikiCompareList[]
  >("wikiCompareList", []);

  const setting = {
    ...responsiveSetting,
  };

  // find single wiki items
  const findCompareWikiEntity = (id: string) => {
    return wikiCompareList?.find((item) => item?._id === id);
  };

  // add Or Remove from WikiCompare List
  const handleAddOrRemoveToWikiCompareList = async (
    ingredientId: string,
    isCompared: boolean,
  ) => {
    try {
      await addOrRemoveToWikiCompareList({
        variables: { ingredientId, userId: dbUser?._id },
        update(cache) {
          const { getIngredientWikiList2 } = cache.readQuery({
            query: GET_INGREDIENT_WIKI_LIST,
            variables: {
              userId: dbUser?._id,
              page: 1,
              limit: 12,
              ids: [],
            },
          });

          cache?.writeQuery({
            query: GET_INGREDIENT_WIKI_LIST,
            variables: {
              userId: dbUser?._id,
              page: 1,
              limit: 12,
              ids: [],
            },
            data: {
              getIngredientWikiList2: {
                ...getIngredientWikiList2,
                wikiList: getIngredientWikiList2?.wikiList?.map((item) =>
                  item?._id === ingredientId
                    ? { ...item, hasInCompare: isCompared ? false : true }
                    : item,
                ),
              },
            },
          });
        },
      });

      dispatch(
        setDbUser({
          ...dbUser,
          wikiCompareCount: isCompared
            ? dbUser?.wikiCompareCount - 1
            : dbUser?.wikiCompareCount + 1,
        }),
      );

      const findCompareItem = findCompareWikiEntity(ingredientId);
      if (findCompareItem) {
        setWikiCompareList((state) => [
          ...state.filter((item) => item?._id !== ingredientId),
        ]);
      }

      notification(
        "info",
        `${isCompared ? "Remove form" : "Added"} compare list successfully`,
      );
    } catch (error) {
      notification(
        "error",
        `Failed to ${isCompared ? "Remove form" : "Added"} compare list`,
      );
    }
  };

  return (
    <div className={styles.main__slider}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>
          <Image
            src={image}
            alt={"Icon"}
            layout="fixed"
            objectFit={"contain"}
            quality={100}
            height={24}
            width={24}
          />
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.viewAll} onClick={() => setShowAll(title)}>
          View All
        </div>
      </div>

      {loading ? (
        <SkeletonWikiDiscovery />
      ) : (
        <Carousel moreSetting={setting}>
          {list?.map((wikiList) => {
            const {
              _id,

              commentsCount,
              description,
              hasInCompare,
              image,
              isPublished,
              portions,
              publishedBy,
              status,
              type,
              wikiDescription,
              wikiTitle,
            } = wikiList;
            return (
              <WikiCard
                key={_id}
                author={publishedBy}
                comments={commentsCount}
                description={wikiDescription}
                image={image}
                title={wikiTitle}
                type={type}
                portions={portions}
                id={_id}
                hasInCompare={hasInCompare}
                handleAddOrRemoveToWikiCompareList={
                  handleAddOrRemoveToWikiCompareList
                }
              />
            );
          })}
        </Carousel>
      )}
    </div>
  );
};
export default WikiLandingContent;
