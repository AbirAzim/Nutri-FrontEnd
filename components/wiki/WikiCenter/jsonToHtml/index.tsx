import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { BlockType, FootnotesType } from "../../../../type/editorjsBlockType";
import s from "./index.module.scss";
import FootNotes from "./FootNotes";
import JsonToHtml from "./JsonToHtml";
import ShowBlocksWithinCollapse from "./SectionDivideByHeader";
import "@fortawesome/fontawesome-pro/css/all.min.css";

export interface BlockProps {
  block: BlockType;
  addBlockPadding?: boolean;
}

interface FootnotesDynamicStyleType {
  top: string;
  bottom: string;
  left: string;
  right: string;
  height: string;
  width: string;
  x: string;
  y: string;
}

export interface FootnotesDynamicContentType {
  isOpen: boolean;
  content: string;
  position: FootnotesDynamicStyleType;
}

export interface SectionDivideByHeaderType {
  header: BlockType;
  content: BlockType[];
}

interface Props {
  blocks: BlockType[];
  scrollPoint?: string;
  expandAllCollapse?: boolean;
  setExpandAllCollapse?: Dispatch<SetStateAction<boolean>>;
}

const checkBlock = (
  block: BlockType,
  copyBlocks: BlockType[],
  index: number,
) => {
  const blockType = block.type;
  if (blockType === "toggle") {
    let spliceBlock: BlockType[] = copyBlocks.splice(
      index + 1,
      parseInt(block?.data?.items),
    );
    let newBlock = {
      ...block,
      nestedBlocks: loopBlock(spliceBlock),
    };
    return newBlock;
  } else {
    return block;
  }
};

const loopBlock = (copyBlocks: BlockType[]) => {
  let arr: BlockType[] = [];
  copyBlocks?.forEach((block, index) => {
    arr.push(checkBlock(block, copyBlocks, index));
  });
  return arr;
};

const checkFootnotes = (copyBlocks: BlockType[]) => {
  let arr: FootnotesType[] = [];
  copyBlocks?.forEach((block) => {
    if (block?.tunes?.footnotes?.length) {
      const footnotes = block?.tunes?.footnotes;
      arr = [...arr, ...footnotes];
    }
  });
  return arr;
};

const sectionDivideByHeader = (
  blocks: BlockType[],
): SectionDivideByHeaderType[] => {
  let arr = [];
  let obj: { [key: string]: any } = {};
  blocks?.forEach((block, index) => {
    const { type, data } = block;
    if (type === "header" && data?.level === 2) {
      if (arr.length) {
        arr.push(obj);
        obj = {};
        obj.header = block;
        obj.content = [];
      } else {
        if (obj.header || obj.content) {
          arr.push(obj);
          obj = {};
          obj.header = block;
          obj.content = [];
        } else {
          obj.header = block;
          obj.content = [];
        }
      }
    } else {
      if (obj.content) {
        obj.content.push(block);
      } else {
        obj.content = [];
        obj.content?.push(block);
      }

      if (blocks?.length === index + 1) {
        arr.push(obj);
      }
    }
  });
  return arr;
};

const RenderJsonToHtml = ({
  blocks,
  scrollPoint = "",
  expandAllCollapse = true,
  setExpandAllCollapse = () => {},
}: Props) => {
  const [normalizeBlocks, setNormalizeBlocks] = useState<BlockType[]>([]);
  const [dividedBlocksByHeader, setDividedBlocksByHeader] = useState<
    SectionDivideByHeaderType[]
  >([]);
  const [allFootNotes, setAllFootNotes] = useState<FootnotesType[]>([]);
  const [openFootnotesCollapse, setOpenFootnotesCollapse] = useState(false);
  let timer = useRef(null);

  useEffect(() => {
    if (blocks?.length) {
      const prepareBlock: BlockType[] = loopBlock([...blocks]);
      const footnotes: FootnotesType[] = checkFootnotes([...blocks]);
      const divideByHeader: SectionDivideByHeaderType[] = sectionDivideByHeader(
        [...prepareBlock],
      );
      setNormalizeBlocks(prepareBlock);
      setDividedBlocksByHeader(divideByHeader);
      setAllFootNotes(footnotes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  useEffect(() => {
    if (scrollPoint) {
      const titleElement = document.getElementById(scrollPoint);

      if (titleElement) {
        timer.current = setTimeout(() => {
          titleElement?.scrollIntoView({ behavior: "smooth" });
          titleElement.style.backgroundColor = "#d2e7bc";
          // titleElement.style.backgroundColor = "";
        }, 300);
        timer.current = setTimeout(() => {
          titleElement.style.backgroundColor = "";
        }, 2500);
      }
    } else {
      setExpandAllCollapse(false);
    }
    return () => {
      clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPoint]);

  useEffect(() => {
    const onHashChanged = () => {
      const hash = window.location.hash;
      if (hash) {
        setExpandAllCollapse(true);
        const scrollPoint = hash?.slice(1);
        const titleElement = document.getElementById(scrollPoint);
        if (titleElement) {
          titleElement?.scrollIntoView({ behavior: "smooth" });
          titleElement.style.backgroundColor = "#d2e7bc";
          timer.current = setTimeout(() => {
            titleElement.style.backgroundColor = "";
          }, 2500);
        }
      }
    };

    window.addEventListener("hashchange", onHashChanged);

    return () => {
      window.removeEventListener("hashchange", onHashChanged);
      clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // click wiki blog specific element.
  const handleClickWikiBlog = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e?.target;
    //  @ts-ignore
    const datasetTune = target?.dataset?.tune;
    //  @ts-ignore
    const datasetId = target?.dataset?.id;
    if (target && datasetTune && datasetId) {
      const targetFootnote: FootnotesType = allFootNotes?.find(
        (footnote) => footnote?.id === datasetId,
      );

      if (targetFootnote) {
        const titleElement = document.getElementById(targetFootnote.id);

        if (titleElement) {
          titleElement?.scrollIntoView({ behavior: "smooth" });
          titleElement.style.backgroundColor = "#d2e7bc";
          setOpenFootnotesCollapse(true);

          timer.current = setTimeout(() => {
            titleElement.style.backgroundColor = "";
          }, 2500);
        }
      }

      // //  @ts-ignore
      // const rect: FootnotesDynamicStyleType = target.getBoundingClientRect();

      // let obj: FootnotesDynamicStyleType = {} as FootnotesDynamicStyleType;
      // for (const key in rect) {
      //   if (key !== "toJSON") {
      //     obj[key] = `${rect[key]?.toFixed()}`;
      //   }
      // }
    }
  };

  return (
    <div onClick={handleClickWikiBlog}>
      {expandAllCollapse ? (
        <ShowBlocksWithoutCollapse
          dividedBlocksByHeader={dividedBlocksByHeader}
        />
      ) : (
        /* {normalizeBlocks?.map((block: BlockType) => JsonToHtml(block))} */
        <ShowBlocksWithinCollapse
          dividedBlocksByHeader={dividedBlocksByHeader}
        />
      )}

      <FootNotes
        allFootNotes={allFootNotes}
        open={openFootnotesCollapse}
        setOpen={setOpenFootnotesCollapse}
      />
    </div>
  );
};

export default RenderJsonToHtml;

interface ShowBlocksWithoutCollapseProps {
  dividedBlocksByHeader: SectionDivideByHeaderType[];
}

const ShowBlocksWithoutCollapse = ({
  dividedBlocksByHeader,
}: ShowBlocksWithoutCollapseProps) => {
  return (
    <>
      {dividedBlocksByHeader?.map(({ content, header }, index) => {
        return (
          <div key={index} className={s.sectionDivider}>
            {header && JsonToHtml(header, true, true)}

            {content?.map((block: BlockType) => JsonToHtml(block))}
          </div>
        );
      })}
    </>
  );
};
