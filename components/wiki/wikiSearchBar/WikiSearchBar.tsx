import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import RecipeDiscoverButton from "../../../theme/button/recipeDiscoverButton/RecipeDiscoverButton";
import Tooltip from "../../../theme/toolTip/CustomToolTip";
import { WikiType } from "../../../type/wikiListType";
import CommonSearchBar from "../../searchBar/CommonSearchBar";

interface Props {
  openTray?: boolean;
  setOpenTray?: (agr: boolean) => void | Dispatch<SetStateAction<boolean>>;
  type?: WikiType;
}

const WikiSearchBar = ({
  openTray = false,
  setOpenTray = () => {},
  type = "Ingredient",
}: Props) => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const { dbUser } = useAppSelector((state) => state?.user);

  const toggleFilterPanel = () => {
    setOpenTray(true);
  };
  const handleSubmit = () => {};
  const handleSearchTagClean = () => {};
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <CommonSearchBar
        input={input}
        setInput={setInput}
        handleSubmitFunc={handleSubmit}
        handleSearchTagCleanFunc={handleSearchTagClean}
        openPanel={toggleFilterPanel}
        isOpenPanel={openTray}
        isSearchTag={false}
      />

      <div
        style={{ marginLeft: "40px" }}
        // className={styles.buttonContainer}
      >
        <Tooltip content="Compare wiki" direction="bottom">
          <RecipeDiscoverButton
            icon={
              dbUser?.wikiCompareCount
                ? "/images/compare-fill-icon.svg"
                : "/icons/eclipse.svg"
            }
            text={`Compare(${
              dbUser?.wikiCompareCount ? dbUser?.wikiCompareCount : 0
            })`}
            disable={dbUser?.wikiCompareCount ? false : true}
            style={{
              backgroundColor: dbUser?.compareLength ? "#fff" : "#ececec",
            }}
            handleClick={() => router.push(`/wiki/compare`)}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default WikiSearchBar;
