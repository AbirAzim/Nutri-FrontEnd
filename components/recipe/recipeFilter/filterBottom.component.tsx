import React, { useEffect, useState } from "react";
import styles from "./recipe.module.scss";
import DatacardComponent from "../../../theme/cards/dataCard/dataCard.component";
import { useLazyQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import ShowCollectionModal from "../../showLastModifiedCollection/ShowLastModifiedCollection";
import { setAllFilterRecipe } from "../../../redux/slices/recipeSlice";
import FILTER_RECIPE from "../../../gqlLib/recipes/queries/filterRecipe";
import {
  FilterCriteriaValue,
  resetAllFilters,
} from "../../../redux/slices/filterRecipeSlice";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartTreeMap,
  faShareNodes,
  faXmark,
} from "@fortawesome/pro-regular-svg-icons";
import SkeletonCollectionRecipe from "../../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollectionRecipe";
import {
  setChangeRecipeWithinCollection,
  setSingleRecipeWithinCollecions,
} from "../../../redux/slices/collectionSlice";
import { setOpenCollectionsTary } from "../../../redux/slices/sideTraySlice";

interface Props {
  allFilters: FilterCriteriaValue[];
}

function FilterPageBottom({ allFilters = [] }: Props) {
  const [filterRecipe, { data, loading }] = useLazyQuery(FILTER_RECIPE, {
    fetchPolicy: "network-only",
  });
  const { dbUser } = useAppSelector((state) => state?.user);
  const { allFilterRecipe } = useAppSelector((state) => state?.recipe);
  const dispatch = useAppDispatch();
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const { lastModifiedCollection } = useAppSelector(
    (state) => state?.collections,
  );

  // open recipe collection panel after added a recipe to a collection
  const handleOpenCollectionTray = () => {
    dispatch(setSingleRecipeWithinCollecions([lastModifiedCollection?.id]));
    dispatch(setOpenCollectionsTary(true));
    dispatch(setChangeRecipeWithinCollection(true));
    setOpenCollectionModal(false);
  };

  const fetchGetRecipesByBlendAndIngredients = async () => {
    let blendTypesArr: string[] = [];
    let ingredientIds: string[] = [];
    let nutrientFiltersMap = [];
    let nutrientMatrixMap = [];
    allFilters.forEach((filter) => {
      if (filter.filterCriteria === "blendTypes") {
        blendTypesArr.push(filter.id);
      }
      if (filter.filterCriteria === "includeIngredientIds") {
        ingredientIds.push(filter.id);
      }
      if (filter.filterCriteria === "nutrientFilters") {
        const {
          id,
          name,
          //@ts-ignore
          between,
          //@ts-ignore
          category,
          //@ts-ignore
          greaterThan,
          //@ts-ignore
          lessThan,
          //@ts-ignore
          lessThanValue,
          //@ts-ignore
          greaterThanValue,
          //@ts-ignore
          betweenStartValue,
          //@ts-ignore
          betweenEndValue,
        } = filter;
        let arrangeValue = {
          beetween: between,
          category: category.toLowerCase(),
          greaterThan,
          lessThan,
          nutrientId: id,
          value: 0,
          value1: 0,
          value2: 0,
        };
        if (lessThan) {
          arrangeValue = {
            ...arrangeValue,
            value: lessThanValue,
          };
        }
        if (greaterThan) {
          arrangeValue = {
            ...arrangeValue,
            value: greaterThanValue,
          };
        }
        if (between) {
          arrangeValue = {
            ...arrangeValue,
            value1: betweenStartValue,
            value2: betweenEndValue,
          };
        }
        nutrientFiltersMap.push(arrangeValue);
      }

      if (filter.filterCriteria === "nutrientMatrix") {
        const {
          id,
          name,
          //@ts-ignore
          between,
          //@ts-ignore
          greaterThan,
          //@ts-ignore
          lessThan,
          //@ts-ignore
          lessThanValue,
          //@ts-ignore
          greaterThanValue,
          //@ts-ignore
          betweenStartValue,
          //@ts-ignore
          betweenEndValue,
        } = filter;
        let arrangeValue = {
          matrixName: name.toLowerCase(),
          beetween: between,
          greaterThan,
          lessThan,
          value: 0,
          value1: 0,
          value2: 0,
        };
        if (lessThan) {
          arrangeValue = {
            ...arrangeValue,
            value: lessThanValue,
          };
        }
        if (greaterThan) {
          arrangeValue = {
            ...arrangeValue,
            value: greaterThanValue,
          };
        }
        if (between) {
          arrangeValue = {
            ...arrangeValue,
            value1: betweenStartValue,
            value2: betweenEndValue,
          };
        }
        nutrientMatrixMap.push(arrangeValue);
      }
    });

    try {
      const { data } = await filterRecipe({
        variables: {
          data: {
            userId: dbUser?._id,
            blendTypes: blendTypesArr,
            includeIngredientIds: ingredientIds,
            nutrientFilters: nutrientFiltersMap,
            nutrientMatrix: nutrientMatrixMap,
          },
          userId: dbUser?._id,
        },
      });

      dispatch(setAllFilterRecipe(data?.filterRecipe || []));
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchGetRecipesByBlendAndIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFilters]);

  if (loading) {
    return (
      <div style={{ marginTop: "30px" }}>
        <SkeletonCollectionRecipe />;
      </div>
    );
  }

  return (
    <>
      <div className={styles.mainDiv}>
        <div className={styles.mainDiv__results}>
          <div className={styles.mainDiv__results__heading}>
            <div>
              <p>
                {allFilterRecipe.length} <span>results</span>
              </p>
            </div>

            <div style={{ display: "flex" }}>
              <IconWarper
                defaultBg="slightGray"
                hover="bgPrimary"
                style={{ width: "28px", height: "28px", marginRight: "10px" }}
              >
                <FontAwesomeIcon icon={faChartTreeMap} />
              </IconWarper>
              <IconWarper
                defaultBg="slightGray"
                hover="bgPrimary"
                style={{ width: "28px", height: "28px" }}
              >
                <FontAwesomeIcon icon={faShareNodes} />
              </IconWarper>
            </div>
            <div>
              <IconWarper
                defaultBg="slightGray"
                hover="bgPrimary"
                style={{ width: "28px", height: "28px" }}
                handleClick={() => dispatch(resetAllFilters())}
              >
                <FontAwesomeIcon icon={faXmark} />
              </IconWarper>
            </div>
          </div>
          <div className={styles.mainDiv__results__body}>
            <ul className={styles.mainDiv__results__body__ul}>
              {allFilterRecipe?.length
                ? allFilterRecipe?.map((item, index) => {
                    const {
                      defaultVersion: {
                        calorie: { value: calorieValue },
                        gigl: { netCarbs },
                      },
                    } = item;
                    let ingredients = [];
                    item?.ingredients?.forEach((ing) => {
                      const ingredient = ing?.ingredientId?.ingredientName;
                      ingredients.push(ingredient);
                    });
                    const ing = ingredients.toString();
                    return (
                      <li
                        className={styles.mainDiv__results__body__ul__li}
                        key={"recommended" + index}
                      >
                        <div className={styles.slider__card}>
                          <DatacardComponent
                            title={item.name}
                            ingredients={ing}
                            category={item.recipeBlendCategory?.name}
                            ratings={item?.averageRating}
                            noOfRatings={item?.numberOfRating}
                            carbs={netCarbs}
                            // score={item.rxScore}
                            calorie={calorieValue}
                            noOfComments={item?.numberOfRating}
                            image={
                              item.image?.find((img) => img?.default)?.image ||
                              item?.image?.[0]?.image ||
                              ""
                            }
                            recipeId={item?._id}
                            notes={item?.notes}
                            addedToCompare={item?.addedToCompare}
                            isCollectionIds={item?.userCollections}
                            setOpenCollectionModal={setOpenCollectionModal}
                            isMatch={item?.isMatch}
                            postfixTitle={item?.defaultVersion?.postfixTitle}
                            recipeVersion={item?.versionCount}
                            personalRating={item?.personalRating}
                          />
                        </div>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
      </div>
      <ShowCollectionModal
        open={openCollectionModal}
        setOpen={setOpenCollectionModal}
        shouldCloseOnOverlayClick={true}
        lastModifiedCollectionName={lastModifiedCollection?.name}
        openCollectionPanel={handleOpenCollectionTray}
      />
    </>
  );
}

export default FilterPageBottom;
