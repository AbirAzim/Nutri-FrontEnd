import { faSquareCaretUp } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HTMLReactParser from "html-react-parser";
import Image from "next/image";
import React, {
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  useEffect,
} from "react";
import Collapsible from "../../../../../theme/collapsible";
import ReadMore from "../../../../../theme/readMore";
import { BlockType } from "../../../../../type/editorjsBlockType";
import s from "../index.module.scss";
import Header from "./Header";
import Paragraph from "./Paragraph";

interface Props {
  label?: string | React.ReactNode;
  positionLabel?: "top" | "bottom";
  headingThree?: BlockType[];
  findImage?: BlockType;
  findParagraph?: BlockType;
  header?: BlockType;
}

const CollapseBlock: React.FC<Props> = ({
  children,
  label,
  positionLabel = "bottom",
  headingThree = [],
  findImage,
  findParagraph,
  header,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {!open && (
        <SectionSummeryView
          heading={header}
          image={findImage}
          paragraph={findParagraph}
        />
      )}
      <Collapsible
        label={label || <DefaultLabel open={open} />}
        open={open}
        setOpen={setOpen}
        positionLabel={positionLabel}
        extraLabel={
          <ShowHeadingThree headingThree={headingThree} setOpen={setOpen} />
        }
      >
        {children}
      </Collapsible>
    </>
  );
};

export default CollapseBlock;

interface DefaultLabelProps {
  open: boolean;
}

export const DefaultLabel = ({ open }: DefaultLabelProps) => {
  return (
    <div className={s.readMoreBox}>
      <FontAwesomeIcon
        icon={faSquareCaretUp}
        className={`${s.icon} ${open && s.rotatedIcon180Deg} ${
          open && s.activeIcon
        }`}
      />
      <span className={s.showMoreText} style={{ marginRight: "20px" }}>{`Read ${
        open ? "less" : "More"
      }`}</span>
    </div>
  );
};

interface ShowHeadingThreeProps {
  headingThree?: BlockType[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const ShowHeadingThree = ({
  headingThree = [],
  setOpen = () => {},
}: ShowHeadingThreeProps) => {
  let timer = useRef(null);
  const openBlock = (id: string) => {
    const titleElement = document.getElementById(id);
    if (titleElement) {
      setOpen(true);

      timer.current = setTimeout(() => {
        titleElement?.scrollIntoView({ behavior: "smooth" });
        titleElement.style.backgroundColor = "#d2e7bc";
        // titleElement.style.backgroundColor = "";
      }, 300);
      timer.current = setTimeout(() => {
        titleElement.style.backgroundColor = "";
      }, 2500);
    }
  };
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  if (!headingThree?.length) {
    return null;
  }
  return (
    <div className={s.showHeadingThreeTitleBox}>
      {headingThree?.map((block) => {
        const { data, id, tunes } = block;
        const anchor = tunes?.anchorTune?.anchor;
        const anchorId = anchor ? anchor : id;
        return (
          <span
            key={id}
            className={s.headingThreeTitle}
            onClick={() => openBlock(anchorId)}
          >
            {data?.text && HTMLReactParser(data.text)}
          </span>
        );
      })}
    </div>
  );
};

interface SectionSummeryViewProps {
  heading?: BlockType;
  image?: BlockType;
  paragraph?: BlockType;
}

const SectionSummeryView = ({
  heading,
  image,
  paragraph,
}: SectionSummeryViewProps) => {
  return (
    <>
      {heading?.data?.text && (
        <Header
          block={heading}
          addBlockPadding={true}
          showIcon={true}
          headerAlinement="left"
        />
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        {image?.data?.file?.url && (
          <div
            style={{
              width: "100px",
              height: "100px",
              flexShrink: 0,
              marginRight: "10px",
            }}
          >
            <Image
              src={image?.data?.file?.url}
              alt="img"
              width={100}
              height={100}
              objectFit="cover"
              style={{ borderRadius: "10px" }}
            />
          </div>
        )}
        {paragraph?.data?.text && (
          <ReadMore showReadMoreButton={false}>
            <Paragraph block={paragraph} />
          </ReadMore>
        )}
      </div>
    </>
  );
};
