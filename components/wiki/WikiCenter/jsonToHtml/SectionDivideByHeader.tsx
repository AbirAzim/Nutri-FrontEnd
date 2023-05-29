import React from "react";
import { SectionDivideByHeaderType } from ".";
import { BlockType } from "../../../../type/editorjsBlockType";
import s from "./index.module.scss";
import JsonToHtml from "./JsonToHtml";
import CollapseBlock from "./renderers/CollapseBlock";

interface Props {
  dividedBlocksByHeader: SectionDivideByHeaderType[];
}

const SectionDivideByHeader = ({ dividedBlocksByHeader }: Props) => {
  return (
    <>
      {dividedBlocksByHeader?.map(
        ({ content, header }: SectionDivideByHeaderType, index) => {
          const findImage: BlockType = content?.find(
            (block) => block?.type === "image",
          );
          const findParagraph: BlockType = content?.find(
            (block) => block?.type === "paragraph",
          );
          const filterHeadingThree = content?.filter(
            (block) => block?.type === "header" && block?.data?.level === 3,
          );

          return (
            <div key={index} className={s.sectionDivider}>
              <CollapseBlock
                headingThree={filterHeadingThree}
                findImage={findImage}
                findParagraph={findParagraph}
                header={header}
              >
                {header && JsonToHtml(header, true, true)}

                {content?.map((block: BlockType) => JsonToHtml(block))}
              </CollapseBlock>
            </div>
          );
        },
      )}
    </>
  );
};

export default SectionDivideByHeader;
