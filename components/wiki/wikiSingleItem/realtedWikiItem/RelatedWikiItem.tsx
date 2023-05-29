import React from "react";
import PanelHeader from "../../../recipe/share/panelHeader/PanelHeader";
import WikiCard from "../../wikiCard/WikiCard";
import dummyData from "../dummyData";

interface Props {
  type?: string;
}

const RelatedWikiItem = ({ type = "Ingredient" }: Props) => {
  return (
    <div style={{ width: "100%" }}>
      <PanelHeader
        icon={
          "/images/telescope.svg"
          // <FontAwesomeIcon icon={faChartColumn} fontSize="24" />
        }
        title={`Related ${type}`}
      />
      {dummyData[type]?.map((wikiItem) => {
        const {
          _id,
          category,
          commentsCount,
          description,
          hasInCompare,
          image,
          isPublished,
          portions,
          publishedBy,
          status,
          type,
          wikiDescription,
          wikiTitle,
        } = wikiItem;
        return (
          <div key={_id} style={{ paddingBottom: "10px" }}>
            <WikiCard
              author={publishedBy}
              comments={commentsCount}
              description={wikiDescription}
              image={image}
              title={wikiTitle}
              type={type}
              portions={portions}
              id={_id}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RelatedWikiItem;
