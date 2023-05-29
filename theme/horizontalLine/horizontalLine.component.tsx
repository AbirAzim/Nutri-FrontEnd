import React from "react";

interface HorizontalLineInterface {
  width?: string;
  height?: string;
  lineColor?: string;
  margin?: string;
}
const HorizontalLine = ({
  width,
  height,
  lineColor,
  margin,
}: HorizontalLineInterface) => {
  width = width || "100%";
  height = height || "2px";
  lineColor = lineColor || "grey";
  margin = margin || "10px 0px";

  const style = {
    width: width,
    height: height,
    backgroundColor: lineColor,
    margin: margin,
  };
  return <div style={style} />;
};

export default HorizontalLine;
