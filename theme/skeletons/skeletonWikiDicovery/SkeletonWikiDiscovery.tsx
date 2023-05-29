import React, { useEffect, useState } from "react";
import useWindowSize from "../../../components/utility/useWindowSize";
import SkeletonElement from "../SkeletonElement";

interface Props {
  height?: string;
}

const SkeletonWikiDiscovery = ({ height = "215px" }: Props) => {
  const [slideSize, setSlideSize] = useState(4);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width <= 600) {
      setSlideSize(1);
    } else if (width >= 600 && width < 1250) {
      setSlideSize(2);
    } else if (width >= 1250 && width < 1450) {
      setSlideSize(3);
    } else {
      setSlideSize(4);
    }
  }, [width]);

  return (
    <div style={{ display: "flex", columnGap: "16px", alignItems: "center" }}>
      {[...Array(slideSize)]?.map((_, index) => {
        return (
          <SkeletonElement
            type="thumbnail"
            key={index}
            style={{ width: "100%", height }}
          />
        );
      })}
    </div>
  );
};

export default SkeletonWikiDiscovery;
