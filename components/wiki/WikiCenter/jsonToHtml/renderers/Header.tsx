import HTMLReactParser from "html-react-parser";
import React from "react";
import { BlockProps } from "..";
import s from "../index.module.scss";
import useBlock from "../useBlock";

const Header = ({
  block,
  addBlockPadding = true,
  showIcon = false,
  headerAlinement,
}: BlockProps & {
  showIcon?: boolean;
  headerAlinement?: "left" | "right" | "center";
}) => {
  const { data, tunes } = block;
  const handleBlockData = useBlock();
  const alignment = headerAlinement || tunes?.alignmentTuneTool?.alignment;
  const align: any = alignment || "left";

  const Tag = `h${data?.level || 1}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={`${s[Tag]} ${addBlockPadding ? "" : s.noBlockPadding}`}
      {...handleBlockData(block)}
      style={{ textAlign: align }}
    >
      {/* {showIcon && (
        <FontAwesomeIcon
          icon={faSquareExclamation}
          color="#7dbd3b"
          style={{
            paddingRight: "10px",
            fontSize: "24px",
          }}
        />
      )} */}

      {data?.text && HTMLReactParser(data.text)}
    </Tag>
  );
};

export default Header;
