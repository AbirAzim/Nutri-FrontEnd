import HTMLReactParser from "html-react-parser";
import React, { Dispatch, SetStateAction } from "react";
import Collapsible from "../../../../theme/collapsible";
import { FootnotesType } from "../../../../type/editorjsBlockType";
import s from "./index.module.scss";
import { DefaultLabel } from "./renderers/CollapseBlock";

interface Props {
  allFootNotes: FootnotesType[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const FootNotes = ({ allFootNotes, open, setOpen }: Props) => {
  return (
    <>
      {allFootNotes?.length ? (
        <div className={`${s.sectionDivider} ${s.footnotesContainer}`}>
          <h3 className={s.footnoteHeading}>Footnotes</h3>
          <ul className={s.footnoteContentWrapper}>
            {allFootNotes
              ?.slice(0, allFootNotes?.length >= 2 ? 2 : 1)
              ?.map((footnote, index) => {
                const { content, id, superscript } = footnote;
                return (
                  <li
                    className={s.footnoteConten}
                    key={superscript}
                    id={id}
                  >{`${superscript}. ${HTMLReactParser(content)}`}</li>
                );
              })}
            {allFootNotes?.slice(2)?.length ? (
              <Collapsible
                label={<DefaultLabel open={open} />}
                open={open}
                setOpen={setOpen}
                positionLabel="bottom"
              >
                {allFootNotes?.slice(2)?.map((footnote, index) => {
                  const { content, id, superscript } = footnote;
                  return (
                    <li
                      className={s.footnoteConten}
                      key={superscript}
                      id={id}
                    >{`${superscript}. ${HTMLReactParser(content)}`}</li>
                  );
                })}
              </Collapsible>
            ) : null}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default FootNotes;
