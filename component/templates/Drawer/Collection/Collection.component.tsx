import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { faBookmark } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddCollectionModal from "../../../../components/sidetray/common/addCollectionModal/AddCollectionModal";
import CollectionComponent from "../../../../components/sidetray/collection/content/collection.component";
import TrayTag from "../../../../components/sidetray/TrayTag";
import TrayWrapper from "../../../../components/sidetray/TrayWrapper";
import GET_COLLECTIONS_AND_THEMES from "../../../../gqlLib/collection/query/getCollectionsAndThemes";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { setChangeRecipeWithinCollection } from "../../../../redux/slices/collectionSlice";
import { setOpenCollectionsTary } from "../../../../redux/slices/sideTraySlice";
import CustomModal from "../../../../theme/modal/customModal/CustomModal";
import styles from "./Collection.module.scss";

interface CollectionTrayProps {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

function CollectionDrawer({
  showTagByDefaut = true,
  showPanle = "left",
}: CollectionTrayProps) {
  const [input, setInput] = useState<any>({
    image: null,
    name: "",
  });
  const { dbUser } = useAppSelector((state) => state?.user);
  const { openCollectionsTary } = useAppSelector((state) => state?.sideTray);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();

  const closeTray = () => {
    dispatch(setOpenCollectionsTary(!openCollectionsTary));
    dispatch(setChangeRecipeWithinCollection(false));
  };

  const [
    getCollectionsAndThemes,
    {
      data: collectionsData,
      loading: collectionsLoading,
      error: collectionsError,
    },
  ] = useLazyQuery(GET_COLLECTIONS_AND_THEMES, {
    // fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (openCollectionsTary) {
      getCollectionsAndThemes({ variables: { userId: dbUser?._id } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCollectionsTary]);

  return (
    <TrayWrapper
      showTagByDefaut={showTagByDefaut}
      closeTray={closeTray}
      openTray={openCollectionsTary}
      showPanle={showPanle}
      panleTag={(hover) => (
        <TrayTag
          icon={<FontAwesomeIcon icon={faBookmark} />}
          placeMent="left"
          hover={hover}
        />
      )}
    >
      <div className={styles.main}>
        <CollectionComponent
          collections={
            collectionsData?.getUserCollectionsAndThemes?.collections || []
          }
          collectionsLoading={collectionsLoading}
        />

        <AddCollectionModal
          input={input}
          setInput={setInput}
          setOpenModal={setOpenModal}
          openModal={openModal}
        />
      </div>
    </TrayWrapper>
  );
}

export default CollectionDrawer;
