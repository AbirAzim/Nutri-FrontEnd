import HTMLReactParser from "html-react-parser";
import React from "react";
import s from "../index.module.scss";
import useBlock from "../useBlock";
import { BlockProps } from "..";

const Quote = ({ block, addBlockPadding }: BlockProps) => {
  const { data, tunes } = block;
  const handleBlockData = useBlock();
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align: any = alignment || "left";
  return (
    <blockquote
      {...handleBlockData(block)}
      className={`${s.blockquote} ${addBlockPadding ? "" : s.noBlockPadding}`}
    >
      {data?.text &&
        data.text
          .split("\n\n")
          .map((paragraph, i) => (
            <p key={i}>
              {HTMLReactParser(
                paragraph
                  .split("\n")
                  .reduce((total, line) => [total, "<br />", line].join("")),
              )}
            </p>
          ))}
      {data?.caption && <footer>{HTMLReactParser(data.caption)}</footer>}
    </blockquote>
  );
};

export default Quote;
