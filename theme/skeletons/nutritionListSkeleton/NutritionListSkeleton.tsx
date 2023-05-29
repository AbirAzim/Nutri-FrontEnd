import React from "react";
import randomNum from "../randomNum";
import SkeletonElement from "../SkeletonElement";

const NutritionListSkeleton = () => {
  return (
    <>
      {[...Array(20)]?.map((item) => {
        return (
          <SkeletonElement
            key={item}
            type="text"
            style={{ width: `${randomNum()}%` }}
          />
        );
      })}
    </>
  );
};

export default NutritionListSkeleton;
