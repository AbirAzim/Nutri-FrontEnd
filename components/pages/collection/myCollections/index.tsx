import React, { useCallback, useState } from "react";
import { useQuery } from "@apollo/client";
import { faClock, faStar } from "@fortawesome/pro-light-svg-icons";
import { faBookmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import AContainer from "../../../../containers/A.container";
import GET_ALL_COLLECTIONS_WITH_RECIPES from "../../../../gqlLib/collection/query/getAllCollectionsWithRecipes";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import RecipeDiscoverButton from "../../../../theme/button/recipeDiscoverButton/RecipeDiscoverButton";
import SkeletonRecipeDiscovery from "../../../../theme/skeletons/skeletonRecipeDiscovery/SkeletonRecipeDiscovery";
import Tooltip from "../../../../theme/toolTip/CustomToolTip";
import { DbUserType } from "../../../../type/dbUserType";
import { ShowRecipes } from "../../../recipe/recipeDiscovery/regularRecipes";
import CommonSearchBar from "../../../searchBar/CommonSearchBar";
import WikiBanner from "../../../wiki/wikiBanner/WikiBanner";
import ErrorPage from "../../404Page";
import styles from "./myCollection.module.scss";
import ShowLastModifiedCollection from "../../../showLastModifiedCollection/ShowLastModifiedCollection";
import {
  setChangeRecipeWithinCollection,
  setSingleRecipeWithinCollecions,
} from "../../../../redux/slices/collectionSlice";
import { setOpenCollectionsTary } from "../../../../redux/slices/sideTraySlice";
import ShareRecipe from "../../../recipe/recipeDetails/center/shareRecipe";
import client from "../../../../gqlLib/client";

const MyCollections = () => {
  const { dbUser } = useAppSelector((state) => state?.user);
  const { data, loading, error } = useQuery(GET_ALL_COLLECTIONS_WITH_RECIPES, {
    variables: { userId: dbUser?._id },
  });
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [shareRecipeData, setShareRecipeData] = useState({
    id: "",
    image: "",
    name: "",
    versionId: "",
    turnedOnVersions: [],
  });
  const [openShareModal, setOpenShareModal] = useState(false);
  const { lastModifiedCollection } = useAppSelector(
    (state) => state?.collections,
  );
  const dispatch = useAppDispatch();

  // open recipe collection panel after added a recipe to a collection
  const handleOpenCollectionTray = () => {
    dispatch(setSingleRecipeWithinCollecions([lastModifiedCollection?.id]));
    dispatch(setOpenCollectionsTary(true));
    dispatch(setChangeRecipeWithinCollection(true));
    setOpenCollectionModal(false);
  };

  // update data after any interaction
  const updateContainerData = useCallback(
    (objectId: string, recipeId: string, updateObj: { [key: string]: any }) => {
      client.writeQuery({
        query: GET_ALL_COLLECTIONS_WITH_RECIPES,
        variables: { userId: dbUser?._id },
        data: {
          getAllCollectionsWithRecipes: data?.getAllCollectionsWithRecipes?.map(
            (item) =>
              item?._id === objectId
                ? {
                    ...item,
                    recipes: item?.recipes?.map((recipe) =>
                      recipe?.recipeId?._id === recipeId
                        ? { ...recipe, ...updateObj }
                        : recipe,
                    ),
                  }
                : item,
          ),
        },
      });
    },
    [data?.getAllCollectionsWithRecipes, dbUser?._id],
  );

  if (loading) {
    return (
      <Layout dbUser={dbUser}>
        <SkeletonRecipeDiscovery />
        <SkeletonRecipeDiscovery />
        <SkeletonRecipeDiscovery />
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout dbUser={dbUser}>
        <ErrorPage
          style={{ height: "50vh" }}
          errorMessage="No collection recipe found"
        />
      </Layout>
    );
  }
  return (
    <Layout dbUser={dbUser}>
      {data?.getAllCollectionsWithRecipes?.map((collection) => {
        const {
          _id,
          canContribute,
          canShareWithOther,
          description,
          image,
          isShared,
          name,
          personalizedName,
          recipes,
          sharedBy,
          slug,
        } = collection;
        return (
          <ShowRecipes
            key={collection?._id}
            headerData={{
              heading: name,
              image: (
                <FontAwesomeIcon
                  icon={name === "Recent Recipes" ? faClock : faStar}
                  color="#fe5d1f"
                  size="2x"
                />
              ),
              allUrl: `/collection/recipeCollection/${slug}`,
            }}
            loading={false}
            recipes={recipes}
            setOpenCollectionModal={setOpenCollectionModal}
            setOpenShareModal={setOpenShareModal}
            setShareRecipeData={setShareRecipeData}
            updateDataFunc={(recipeId, updateObj) =>
              updateContainerData(_id, recipeId, updateObj)
            }
          />
        );
      })}
      <ShowLastModifiedCollection
        open={openCollectionModal}
        setOpen={setOpenCollectionModal}
        shouldCloseOnOverlayClick={true}
        lastModifiedCollectionName={lastModifiedCollection?.name}
        openCollectionPanel={handleOpenCollectionTray}
      />
      <ShareRecipe
        id={shareRecipeData?.id}
        versionId={shareRecipeData.versionId}
        turnedOnVersions={shareRecipeData.turnedOnVersions}
        title={shareRecipeData?.name}
        image={shareRecipeData?.image}
        show={openShareModal}
        setShow={setOpenShareModal}
        type="recipe"
        heading="Share Recipe"
      />
    </Layout>
  );
};

const Layout: React.FC<{ dbUser: DbUserType }> = ({ children }) => {
  const { dbUser } = useAppSelector((state) => state?.user);
  const router = useRouter();
  return (
    <AContainer
      headerIcon={
        <FontAwesomeIcon
          icon={faBookmark}
          color="#fe5d1f"
          fontSize={20}
          style={{ marginRight: "5px" }}
        />
      }
      headerTitle="Recipe collection"
      showCollectionTray={{ show: true, showTagByDeafult: true }}
      showCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
      showRecipeFilterTray={{
        show: true,
        showPanle: "left",
        showTagByDeafult: false,
      }}
    >
      <div className={styles.myCollectionsContainer}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CommonSearchBar
          // input={input}
          // setInput={setInput}
          // isSearchTag={false}
          // openPanel={toggleFilterPanel}
          // isOpenPanel={openFilterTray}
          />
          <div
            style={{ marginLeft: "40px" }}
            // className={styles.buttonContainer}
          >
            <Tooltip content="Compare recipe" direction="bottom">
              <RecipeDiscoverButton
                icon={
                  dbUser?.compareLength
                    ? "/images/compare-fill-icon.svg"
                    : "/icons/eclipse.svg"
                }
                text={`Compare(${
                  dbUser?.compareLength ? dbUser?.compareLength : 0
                })`}
                disable={dbUser?.compareLength ? false : true}
                style={{
                  backgroundColor: dbUser?.compareLength ? "#fff" : "#ececec",
                }}
                handleClick={() => router.push(`/recipe/compare`)}
              />
            </Tooltip>
          </div>
        </div>

        {/* {allFilters?.length ? (
          <SearchtagsComponent allFilters={allFilters} />
        ) : null} */}

        <WikiBanner />
        <div className={styles.contentContainer}>{children}</div>
      </div>
    </AContainer>
  );
};

export default MyCollections;
