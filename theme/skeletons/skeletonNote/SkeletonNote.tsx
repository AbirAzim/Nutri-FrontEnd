import React from "react";
import SkeletonElement from "../SkeletonElement";
interface Props {
  singleNote?: boolean;
}
const SkeletonNote = ({ singleNote = false }: Props) => {
  return (
    <div>
      {singleNote ? (
        <div style={{ margin: "30px 0" }}>
          <SkeletonElement type="title" style={{ margin: "10px 0" }} />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
        </div>
      ) : (
        [1, 2, 3].map((item) => {
          return (
            <div style={{ margin: "30px 0" }} key={item}>
              <SkeletonElement type="title" style={{ margin: "10px 0" }} />
              <SkeletonElement type="text" />
              <SkeletonElement type="text" />
            </div>
          );
        })
      )}
    </div>
  );
};

export default SkeletonNote;
