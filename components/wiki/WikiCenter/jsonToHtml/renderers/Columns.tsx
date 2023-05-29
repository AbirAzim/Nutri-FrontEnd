import { BlockType } from "../../../../../type/editorjsBlockType";
import HTMLReactParser from "html-react-parser";
import s from "../index.module.scss";
import useBlock from "../useBlock";
import JsonToHtml from "../JsonToHtml";
import { BlockProps } from "..";

const Columns = ({ block, addBlockPadding = true }: BlockProps) => {
  const { data, tunes } = block;
  const handleBlockData = useBlock();
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align: any = alignment || "left";
  const cols: any[] = data?.cols;

  return (
    <div
      className={`${s.columns} ${addBlockPadding ? "" : s.noBlockPadding}`}
      {...handleBlockData(block)}
      style={{
        textAlign: align,
        gridTemplateColumns: `repeat(${cols?.length},1fr)`,
      }}
    >
      {cols?.map((columns, index) => {
        const nestedBlocks: BlockType[] = columns?.blocks;
        return (
          <div key={index}>
            {nestedBlocks?.map((block: BlockType) => JsonToHtml(block, false))}
          </div>
        );
      })}
    </div>
  );
};

export default Columns;
