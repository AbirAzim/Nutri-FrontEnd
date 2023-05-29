import React from "react";
import { BlockProps } from "..";
import { BlockType } from "../../../../../type/editorjsBlockType";
import useBlock from "../useBlock";

const Delimiter = ({ block }: BlockProps) => {
  const { data, tunes } = block;
  const handleBlockData = useBlock();
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align: any = alignment || "left";

  return <hr {...handleBlockData(block)} />;
};

export default Delimiter;
