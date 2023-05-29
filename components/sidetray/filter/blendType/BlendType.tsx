import React, { useEffect, useRef } from "react";
import styles from "../filter.module.scss";
import CheckCircle from "../../../../public/icons/check_circle_black_24dp.svg";
import SkeletonBlendType from "../../../../theme/skeletons/skeletonBlendType/SkeletonBlendType";
import {
  FilterCriteriaOptions,
  FilterCriteriaValue,
} from "../../../../redux/slices/filterRecipeSlice";
import { BlendCategoryType } from "../../../../type/blendCategoryType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareMinus,
  faSquarePlus,
} from "@fortawesome/pro-regular-svg-icons";
import CustomAccordion from "../../../../theme/accordion/accordion.component";

const defaultBlendImg =
  "https://blending.s3.us-east-1.amazonaws.com/3383678.jpg";

interface Props {
  checkActiveItem: (id: string) => boolean;
  handleBlendAndIngredientUpdate: (
    value?: any | FilterCriteriaValue,
    present?: boolean,
    extraInfo?: any | FilterCriteriaValue,
  ) => void;
  blendCategoryData: BlendCategoryType[];
  blendCategoryLoading: boolean;
}

const BlendType = ({
  checkActiveItem = () => false,
  handleBlendAndIngredientUpdate = () => {},
  blendCategoryData = [],
  blendCategoryLoading = false,
}: Props) => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  if (blendCategoryLoading) {
    return <SkeletonBlendType />;
  }

  return (
    <div className={styles.filter__top}>
      <CustomAccordion
        expandByDefault={true}
        customHeader={(expand, setExpanded) => (
          <div className={styles.header}>
            <h3 className={styles.title}>Blend Type</h3>
            {expand ? (
              <FontAwesomeIcon
                icon={faSquareMinus}
                className={styles.icon}
                onClick={() => setExpanded(expand)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faSquarePlus}
                className={styles.icon}
                onClick={() => setExpanded(expand)}
              />
            )}
          </div>
        )}
      >
        <div style={{ marginTop: "20px" }}>
          <div className={`${styles.ingredientContainer} y-scroll`}>
            {blendCategoryData?.length
              ? blendCategoryData.map((blend, i) => (
                  <div
                    key={blend?.name + i}
                    className={styles.item}
                    onClick={() =>
                      handleBlendAndIngredientUpdate(
                        blend,
                        checkActiveItem(blend?._id),
                        {
                          name: blend?.name,
                          image: blend?.image || defaultBlendImg,
                          id: blend?._id,
                          tagLabel: "",
                          filterCriteria: "blendTypes",
                          origin: {
                            activeSection: "visual",
                            filterCriteria: "blendTypes",
                            activeTab: "Blend Type",
                            childTab: blend?.name || "",
                          },
                        },
                      )
                    }
                  >
                    <div className={styles.image}>
                      <img
                        src={blend?.image || defaultBlendImg}
                        alt={blend?.name}
                      />
                      {checkActiveItem(blend._id) && (
                        <div className={styles.tick}>
                          <CheckCircle className={styles.ticked} />
                        </div>
                      )}
                    </div>

                    <p>{blend?.name}</p>
                  </div>
                ))
              : null}
          </div>
        </div>
      </CustomAccordion>
    </div>
  );
};

export default BlendType;
