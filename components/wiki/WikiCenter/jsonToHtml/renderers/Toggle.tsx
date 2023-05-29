import { BlockType } from "../../../../../type/editorjsBlockType";
import HTMLReactParser from "html-react-parser";
import s from "../index.module.scss";
import useBlock from "../useBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/pro-solid-svg-icons";
import { useEffect, useState } from "react";
import JsonToHtml from "../JsonToHtml";
import { BlockProps } from "..";
import Collapsible from "../../../../../theme/collapsible";

const Toggle = ({
  block,
  addBlockPadding,
  nestedBlocks = [],
}: BlockProps & { nestedBlocks?: BlockType[] }) => {
  const { data, tunes } = block;
  const { text, status } = data;

  const handleBlockData = useBlock();
  const alignment = tunes?.alignmentTuneTool?.alignment;
  const align: any = alignment || "left";
  const [toggleNestedBlock, setToggleNestedBlock] = useState(false);

  useEffect(() => {
    setToggleNestedBlock(status === "open" ? true : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${s.toggle} ${addBlockPadding ? "" : s.noBlockPadding}`}
      {...handleBlockData(block)}
    >
      <Collapsible
        label={
          <div className={s.header}>
            <FontAwesomeIcon
              icon={faCaretRight}
              className={`${s.icon} ${toggleNestedBlock && s.activeIcon} ${
                toggleNestedBlock && s.iconRotate
              }`}
            />

            <p className={s.text}>{text && HTMLReactParser(text)}</p>
          </div>
        }
        open={toggleNestedBlock}
        setOpen={setToggleNestedBlock}
      >
        <div className={s.nestedContainer}>
          {nestedBlocks?.map((block: BlockType) => JsonToHtml(block))}
        </div>
      </Collapsible>
    </div>
  );
};

export default Toggle;
