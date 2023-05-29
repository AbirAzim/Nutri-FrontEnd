import React from "react";
import { BlockProps } from "..";
import { BlockType } from "../../../../../type/editorjsBlockType";
import useBlock from "../useBlock";

const Code = ({ block }: BlockProps) => {
  const { data, tunes } = block;
  const handleBlockData = useBlock();
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align: any = alignment || "left";

  return (
    <pre>
      {data?.code && <code {...handleBlockData(block)}>{`${data.code}`}</code>}
    </pre>
  );
};

export default Code;
