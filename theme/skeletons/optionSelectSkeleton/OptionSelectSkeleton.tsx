import React from "react";
import SkeletonElement from "../SkeletonElement";

const OptionSelectSkeleton = () => {
  return (
    <div>
      {[1, 2, 3, 5, 6, 9].map((item) => {
        return (
          <div key={item}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <SkeletonElement
                type="title"
                style={{
                  width: "100%",
                  borderRadius: "25px",
                  marginBottom: "0px",
                }}
              />
              <SkeletonElement
                type="title"
                style={{
                  width: "100%",
                  borderRadius: "25px",
                  marginBottom: "0px",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "5px",
              }}
            >
              <SkeletonElement
                type="title"
                style={{
                  width: "100%",
                  borderRadius: "25px",
                  marginBottom: "0px",
                }}
              />
              <SkeletonElement
                type="title"
                style={{
                  width: "100%",
                  borderRadius: "25px",
                  marginBottom: "0px",
                }}
              />
              <SkeletonElement
                type="title"
                style={{
                  width: "100%",
                  borderRadius: "25px",
                  marginBottom: "0px",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OptionSelectSkeleton;
