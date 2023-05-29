import { useQuery } from "@apollo/client";
import { faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import GET_ALL_BLEND_NUTRIENTS_CATEGORIES from "../../../gqlLib/nutrition/query/getAllBlendNutrientCategory";
import GET_ALL_BLEND_NUTRIENTS from "../../../gqlLib/nutrition/query/getAllBlendNutrients";
import CheckIcon from "../../../theme/checkIcon/CheckIcon";
import DropDown from "../../../theme/dropDown/DropDown.component";
import InputComponent from "../../../theme/input/input.component";
import NutritionListSkeleton from "../../../theme/skeletons/nutritionListSkeleton/NutritionListSkeleton";
import s from "./WikiNutritionPanel.module.scss";

interface List {
  nutrientName: string;
  _id: string;
  category: {
    _id: string;
  };
}

type Props = {
  handleNutritionClick?: (item: any, exist: boolean) => void;
  checkActiveNutrition?: (arg: any) => boolean;
};

const WikiNutritionPanel = ({
  checkActiveNutrition = () => false,
  handleNutritionClick = () => {},
}: Props) => {
  const [nutrientCategory, setNutrientCategory] = useState<
    { name: string; value: string }[]
  >([{ name: "All", value: "all" }]);
  const [selectedNutrientCategory, setSelectedNutrientCategory] =
    useState<string>("all");
  const [searchInput, setSearchInput] = useState("");
  const [nutrientList, setNutrientList] = useState<List[]>([]);
  const isMounted = useRef(false);
  const {
    data: nutrientData,
    loading: nutrientLoading,
    error: nutrientError,
  } = useQuery(GET_ALL_BLEND_NUTRIENTS);
  const {
    data: nutrientCategoryData,
    loading: nutrientCategoryLoading,
    error: nutrientCategoryError,
  } = useQuery(GET_ALL_BLEND_NUTRIENTS_CATEGORIES);

  useEffect(() => {
    if (
      !nutrientCategoryLoading &&
      nutrientCategoryData?.getAllBlendNutrientCategories
    ) {
      const data = nutrientCategoryData?.getAllBlendNutrientCategories?.map(
        (item) => ({ name: item?.categoryName, value: item?._id }),
      );
      setNutrientCategory((pre) => [...pre, ...data]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    nutrientCategoryData?.getAllBlendNutrientCategories,
    nutrientCategoryLoading,
  ]);

  useEffect(() => {
    if (!nutrientLoading && nutrientData?.getAllBlendNutrients) {
      setNutrientList(nutrientData?.getAllBlendNutrients);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nutrientData?.getAllBlendNutrients, nutrientLoading]);

  useEffect(() => {
    if (isMounted.current) {
      if (searchInput === "") {
        setNutrientList(nutrientData?.getAllBlendNutrients);
      } else {
        const filter = nutrientData?.getAllBlendNutrients?.filter(
          (item: List) =>
            item?.nutrientName
              ?.toLowerCase()
              ?.includes(searchInput?.toLowerCase()),
        );
        setNutrientList(filter);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    if (isMounted.current) {
      if (selectedNutrientCategory === "all") {
        setNutrientList(nutrientData?.getAllBlendNutrients);
      } else {
        const filter = nutrientData?.getAllBlendNutrients?.filter(
          (item: List) => item?.category?._id === selectedNutrientCategory,
        );
        setNutrientList(filter);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNutrientCategory]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className={s.wikiNutritionPanelContainer}>
      <h3 className={s.title}>Nutrition List</h3>
      <div className={s.borderBottom}></div>
      <div className={s.dropdown}>
        <DropDown
          value={selectedNutrientCategory}
          listElem={nutrientCategory}
          handleChange={(e) => setSelectedNutrientCategory(e?.target?.value)}
        />
      </div>
      <div className={s.dropdown}>
        <InputComponent
          borderSecondary={true}
          style={{ padding: "10px", fontSize: "12px", borderRadius: "10px" }}
          inputWithIcon={true}
          icon={<FontAwesomeIcon icon={faMagnifyingGlass} fontSize="16" />}
          placeholder="Search Nutrition"
          value={searchInput}
          onChange={(e) => setSearchInput(e?.target?.value)}
        />
      </div>
      <div className={`${s.nutrientListWarper} y-scroll`}>
        {nutrientLoading ? (
          <NutritionListSkeleton />
        ) : (
          nutrientList?.map((item, index) => {
            return (
              <p
                key={index}
                className={s.text}
                onClick={() =>
                  handleNutritionClick(item, checkActiveNutrition(item?._id))
                }
              >
                {item?.nutrientName}
                {checkActiveNutrition(item?._id) && (
                  <CheckIcon
                    style={{ position: "absolute", top: "0px", right: "5px" }}
                  />
                )}
              </p>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WikiNutritionPanel;
