import React from "react";
import SkeletonElement from "../SkeletonElement";

const SkeletonCollections = () => {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <SkeletonElement
          type="thumbnail"
          style={{ width: "47px", height: "47px", marginRight: "16px" }}
        />
        <SkeletonElement type="title" />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <SkeletonElement
          type="thumbnail"
          style={{ width: "47px", height: "47px", marginRight: "16px" }}
        />
        <SkeletonElement type="title" />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <SkeletonElement
          type="thumbnail"
          style={{ width: "47px", height: "47px", marginRight: "16px" }}
        />
        <SkeletonElement type="title" />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <SkeletonElement
          type="thumbnail"
          style={{ width: "47px", height: "47px", marginRight: "16px" }}
        />
        <SkeletonElement type="title" />
      </div>
    </div>
  );
};

export default SkeletonCollections;
