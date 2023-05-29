import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction } from "react";
import InputComponent from "../../../../theme/input/input.component";
import { faMagnifyingGlass } from "@fortawesome/pro-solid-svg-icons";
import styles from "../filter.module.scss";
import CheckCircle from "../../../../public/icons/check_circle_black_24dp.svg";
import SkeletonBlendType from "../../../../theme/skeletons/skeletonBlendType/SkeletonBlendType";
import {
  FilterCriteriaOptions,
  FilterCriteriaValue,
} from "../../../../redux/slices/filterRecipeSlice";
import useWindowSize from "../../../utility/useWindowSize";

interface Props {
  searchInput?: string;
  setSearchInput?: Dispatch<SetStateAction<string>>;
  ingredientCategory?: string;
  loading?: boolean;
  searchIngredientData?: any[];
  scrollAreaMaxHeight?: React.CSSProperties;
  checkActiveItem: (id: string) => boolean;
  handleBlendAndIngredientUpdate: (
    value?: any | FilterCriteriaValue,
    present?: boolean,
    extraInfo?: any | FilterCriteriaValue,
  ) => void;
}

const IngredientPictureSection = ({
  ingredientCategory = "",
  searchInput = "",
  setSearchInput = () => {},
  loading = false,
  searchIngredientData = [],
  checkActiveItem = () => false,
  handleBlendAndIngredientUpdate = () => {},
  scrollAreaMaxHeight = { maxHeight: "350px" },
}: Props) => {
  const { height } = useWindowSize();
  return (
    <div>
      {ingredientCategory === "All" && (
        <InputComponent
          borderSecondary={true}
          style={{
            padding: "10px",
            fontSize: "12px",
            borderRadius: "10px",
          }}
          inputWithIcon={true}
          icon={<FontAwesomeIcon icon={faMagnifyingGlass} fontSize="16" />}
          placeholder="Search ingredient"
          value={searchInput}
          onChange={(e) => setSearchInput(e?.target?.value)}
        />
      )}

      {loading ? (
        <SkeletonBlendType amount={16} />
      ) : (
        <>
          {searchIngredientData.length ? (
            <div
              className={`${styles.ingredientContainer} y-scroll`}
              style={{ maxHeight: `${height - 350}px` }}
            >
              {searchIngredientData?.map((item, i) => (
                <div
                  key={item?.ingredientName + i}
                  className={styles.item}
                  onClick={() =>
                    handleBlendAndIngredientUpdate(
                      item,
                      checkActiveItem(item?._id),
                      {
                        id: item?._id,
                        image: item?.featuredImage || "/food/chard.png",
                        name: item?.ingredientName,
                        tagLabel: "",
                        filterCriteria: "includeIngredientIds",
                        origin: {
                          activeSection: "visual",
                          filterCriteria: "includeIngredientIds",
                          activeTab: "Ingredients",
                          childTab: item?.ingredientName || "",
                        },
                      },
                    )
                  }
                >
                  <div className={styles.image}>
                    <img
                      src={item?.featuredImage || "/food/chard.png"}
                      alt={item?.ingredientName}
                    />
                    {checkActiveItem(item?._id) && (
                      <div className={styles.tick}>
                        <CheckCircle className={styles.ticked} />
                      </div>
                    )}
                  </div>

                  <p>{item?.ingredientName}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noResult}>
              <p>No Ingredients</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default IngredientPictureSection;
