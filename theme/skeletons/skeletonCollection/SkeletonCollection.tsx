import React from "react";
import SkeletonElement from "../SkeletonElement";

const SkeletonCollection = () => {
  return (
    <>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <SkeletonElement
          type="thumbnail"
          style={{ width: "47px", height: "47px", marginRight: "16px" }}
        />
        <SkeletonElement type="title" />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <SkeletonElement
          type="thumbnail"
          style={{ width: "47px", height: "47px", marginRight: "16px" }}
        />
        <SkeletonElement type="title" />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <SkeletonElement
          type="thumbnail"
          style={{ width: "47px", height: "47px", marginRight: "16px" }}
        />
        <SkeletonElement type="title" />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <SkeletonElement
          type="thumbnail"
          style={{ width: "47px", height: "47px", marginRight: "16px" }}
        />
        <SkeletonElement type="title" />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <SkeletonElement
          type="thumbnail"
          style={{ width: "47px", height: "47px", marginRight: "16px" }}
        />
        <SkeletonElement type="title" />
      </div>
    </>
  );
};

export default SkeletonCollection;
