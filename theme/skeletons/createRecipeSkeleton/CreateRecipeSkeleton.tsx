import React from "react";
import NutrationPanelSkeleton from "../nutrationPanelSkeleton/NutrationPanelSkeleton";
import SkeletonElement from "../SkeletonElement";

const CreateRecipeSkeleton = () => {
  return (
    <div
      style={{
        marginRight: "10px",
        border: "2px solid #f2f2f8",
        padding: "10px",
      }}
    >
      <div style={{ marginBottom: "16px" }}>
        <SkeletonElement
          type="title"
          style={{ marginBottom: "10px", width: "100%" }}
        />
        <SkeletonElement
          type="thumbnail"
          style={{ width: "100%", height: "240px" }}
        />
      </div>
      <div style={{ marginBottom: "40px" }}>
        <SkeletonElement
          type="title"
          style={{ marginBottom: "10px", width: "100%" }}
        />
        <SkeletonElement type="title" style={{ marginBottom: "10px" }} />
        <SkeletonElement
          type="thumbnail"
          style={{ width: "100%", height: "240px" }}
        />
      </div>
      <div>
        <SkeletonElement type="title" style={{ marginBottom: "10px" }} />
        <NutrationPanelSkeleton />
      </div>
    </div>
  );
};

export default CreateRecipeSkeleton;
