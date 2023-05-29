import HTMLReactParser from "html-react-parser";
import React from "react";
import { BlockProps } from "..";
import s from "../index.module.scss";
import useBlock from "../useBlock";

const Callout = ({ block, addBlockPadding }: BlockProps) => {
  const { data } = block;
  const handleBlockData = useBlock();
  return (
    <div
      className={`${s.callout} ${addBlockPadding ? "" : s.noBlockPadding}`}
      {...handleBlockData(block)}
    >
      <div className={s.icon}>💡</div>
      <pre className={s.text}>{data?.code && HTMLReactParser(data?.code)}</pre>
    </div>
  );
};

export default Callout;
