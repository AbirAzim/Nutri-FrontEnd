/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@apollo/client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import { GET_ALL_BLEND_NUTRIENTS } from "../../gqlLib/recipeDiscovery/query/recipeDiscovery";
import Dropdown from "../dropDown/DropDown.component";
import styles from "./calcium.module.scss";

interface calciumStyle {
  style: any;
}

interface List {
  name: string;
  value: string;
}

interface CalciumSearchElemInterface {
  ascendingDescending?: boolean;
  setascendingDescending?: Dispatch<SetStateAction<boolean>>;
  list?: List[];
  setList?: Dispatch<SetStateAction<List[]>>;
  dropDownState?: string;
  setDropDownState?: Dispatch<SetStateAction<string>>;
}
const CalciumSearchElem = ({
  ascendingDescending,
  setascendingDescending,
  list,
  setList,
  dropDownState,
  setDropDownState,
}: CalciumSearchElemInterface) => {
  const [sortState, curSortState] = useState(true);

  const SortingOrder = () => {
    curSortState(!sortState);
    setascendingDescending(!ascendingDescending);
    return sortState;
  };
  const { data: allBlendNutrients } = useQuery(GET_ALL_BLEND_NUTRIENTS);

  useEffect(() => {
    if (!allBlendNutrients?.getAllBlendNutrients) return;
    let tempArray: List[] = [];
    allBlendNutrients?.getAllBlendNutrients.map((itm) => {
      tempArray = [...tempArray, { name: itm.nutrientName, value: itm._id }];
    });
    const sortArry = tempArray?.sort((a, b) => {
      let na = a?.name?.toLowerCase(),
        nb = b?.name?.toLowerCase();
      if (na < nb) return -1;
      if (na > nb) return 1;
      return 0;
    });
    setList(sortArry);
  }, [allBlendNutrients?.getAllBlendNutrients]);

  useEffect(() => {
    setDropDownState(list?.[0]?.value);
  }, [list]);

  return (
    <div className={styles.calciumMg}>
      <Dropdown
        value={dropDownState}
        listElem={list}
        handleChange={(e) => setDropDownState(e?.target?.value)}
      />

      <div className={styles.calciumIcon}>
        <div>
          {sortState ? (
            <span>
              <FaSortAmountDown onClick={SortingOrder} />
            </span>
          ) : (
            <span>
              <FaSortAmountDownAlt onClick={SortingOrder} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalciumSearchElem;
