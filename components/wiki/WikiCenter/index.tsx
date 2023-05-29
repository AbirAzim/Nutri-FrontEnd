/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./wikiCenter.module.scss";
import { GiGl } from "../../../type/nutrationType";
import { Portion, WikiType } from "../../../type/wikiListType";
import SecondPortion from "./jsonToHtml";
import {
  IngredientBookmarkListType,
  NutrientBookmarkListType,
} from "../../../type/wikiDetailsType";
import FirstPortion from "./firstPortion";
import { BlockType } from "../../../type/editorjsBlockType";

export interface CoverImageType {
  url: string;
  id: string;
  caption: string;
  type?: "audio" | "video" | "post";
  mediaUrl?: string;
}
export interface WikiCenterComponentProps {
  heading?: string;
  name?: string;
  description?: string;
  categroy?: string;
  author?: string;
  coverImages?: string[];
  body?: any;
  giGl?: GiGl;
  type?: WikiType;
  wikiId?: string;
  commentsCount?: number;
  scrollPoint?: string;
  ingredientBookmarkList?: IngredientBookmarkListType[];
  nutrientBookmarkList?: NutrientBookmarkListType[];
  fetchNutritionPanelData?: (measureMentWeight: string, id: string) => void;
  setDefaultMeasureMentWeight?: Dispatch<SetStateAction<string>>;
  setCurrentWikiId?: Dispatch<SetStateAction<string>>;
  setPortions?: Dispatch<SetStateAction<any[]>>;
  originalPortions?: Portion[];
}

function WikiCenterComponent(props: WikiCenterComponentProps) {
  const { body = "", scrollPoint = "", coverImages } = props;
  const [expandAllCollapse, setExpandAllCollapse] = useState(true);
  const [imagesWithinBlock, setImagesWithinBlock] = useState<CoverImageType[]>(
    [],
  );

  useEffect(() => {
    if (body) {
      const blocks: BlockType[] = JSON.parse(body)?.blocks;
      let allImagesWithinBlock: CoverImageType[] = [];
      coverImages?.forEach((img) => {
        allImagesWithinBlock?.push({
          url: img || "",
          id: "",
          caption: "",
        });
      });

      blocks?.forEach((block) => {
        if (block?.type === "image") {
          const { data, id, tunes } = block;
          const anchor = tunes?.anchorTune?.anchor;
          const anchorId = anchor ? anchor : id;

          allImagesWithinBlock?.push({
            url: data?.file?.url || "",
            id: anchorId || "",
            caption: data?.caption || "",
          });
        }
      });

      setImagesWithinBlock(allImagesWithinBlock);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body]);
  return (
    <div className={styles.centerMain}>
      <FirstPortion
        {...props}
        expandAllCollapse={expandAllCollapse}
        setExpandAllCollapse={setExpandAllCollapse}
        imagesWithinBlock={imagesWithinBlock}
      />
      {body && (
        <SecondPortion
          blocks={body ? JSON.parse(body)?.blocks : []}
          scrollPoint={scrollPoint}
          expandAllCollapse={expandAllCollapse}
          setExpandAllCollapse={setExpandAllCollapse}
        />
      )}
    </div>
  );
}

export default WikiCenterComponent;
