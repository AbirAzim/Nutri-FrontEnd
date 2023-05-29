import HTMLReactParser from "html-react-parser";
import React from "react";
import { BlockProps } from "..";

import { BlockType } from "../../../../../type/editorjsBlockType";
import useBlock from "../useBlock";

const Raw = ({ block }: BlockProps) => {
  const { data, tunes } = block;
  const handleBlockData = useBlock();
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align: any = alignment || "left";
  return <>{data?.html && HTMLReactParser(data.html)}</>;
};

export default Raw;
