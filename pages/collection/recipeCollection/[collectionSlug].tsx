import { useRouter } from "next/router";
import React, { FC, useCallback, useEffect, useState } from "react";
import AContainer from "../../../containers/A.container";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import styles from "../../../components/recipe/recipeDiscovery/recipeDiscovery.module.scss";
import classes from "../../../styles/pages/viewAll.module.scss";
import { useLazyQuery } from "@apollo/client";
import GET_SINGLE_COLLECTION from "../../../gqlLib/collection/query/getSingleCollection";
import GET_ALL_MY_CREATED_RECIPES from "../../../gqlLib/collection/query/getAllMyCreatedRecipes";
import GET_ALL_RECIPES_WITHIN_COLLECTIONS from "../../../gqlLib/collection/query/getAllRecipesWhithiCollections";
import ShowRecipeContainer from "../../../components/showRecipeContainer";
import CommonSearchBar from "../../../components/searchBar/CommonSearchBar";
import WikiBanner from "../../../components/wiki/wikiBanner/WikiBanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/pro-regular-svg-icons";
import ErrorPage from "../../../components/pages/404Page";
import ShowLastModifiedCollection from "../../../components/showLastModifiedCollection/ShowLastModifiedCollection";
import ShareRecipe from "../../../components/recipe/recipeDetails/center/shareRecipe";
import {
  setChangeRecipeWithinCollection,
  setSingleRecipeWithinCollecions,
} from "../../../redux/slices/collectionSlice";
import {
  setOpenCollectionsTary,
  setOpenFilterTray,
} from "../../../redux/slices/sideTraySlice";
import useFetchGetRecipesByBlendAndIngredients from "../../../components/recipe/recipeDiscovery/helperFunc/useFetchGetRecipesByBlendAndIngredients";
import SearchtagsComponent from "../../../components/searchtags/searchtags.component";
import {
  resetAllFilters,
  updateAllFilterRecipes,
} from "../../../redux/slices/filterRecipeSlice";
import GET_SHARE_WITH_ME_COLLECTIONS from "../../../gqlLib/collection/query/getShareWithMeCollections";
import { ShowRecipes } from "../../../components/recipe/recipeDiscovery/regularRecipes";
import Tooltip from "../../../theme/toolTip/CustomToolTip";
import RecipeDiscoverButton from "../../../theme/button/recipeDiscoverButton/RecipeDiscoverButton";
import GET_MY_RECENT_RECIPES from "../../../gqlLib/collection/query/getMyRecientRecipes";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import { faXmark } from "@fortawesome/pro-light-svg-icons";
import HeaderTextBtn from "../../../components/recipe/share/panelHeader/HeaderTextBtn";
import useToAcceptCollectionShare from "../../../customHooks/collection/useToAcceptCollectionShare";
let dataLimit = 12;

const CollectionRecipes = () => {
  const [pageNum, setPageNum] = useState(1);
  const [isSharedWithMeCollection, setShareWithMeCollection] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const collectionId = router.query?.collectionId as string;
  const singleRecipeCollectionId = router.query
    ?.singleRecipeCollectionId as string;
  const token = router.query?.token as string;
  const slug = router.query?.collectionSlug as string;
  const [title, setTitle] = useState("");
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [shareRecipeData, setShareRecipeData] = useState({
    id: "",
    image: "",
    name: "",
    versionId: "",
    turnedOnVersions: [],
  });
  const [openShareModal, setOpenShareModal] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const { lastModifiedCollection } = useAppSelector(
    (state) => state?.collections,
  );
  const [getAllRecipes, { loading: getAllRecipesLoading }] = useLazyQuery(
    GET_ALL_RECIPES_WITHIN_COLLECTIONS,
  );
  const [getMyRecipes, { loading: getMyRecipesLoading }] = useLazyQuery(
    GET_ALL_MY_CREATED_RECIPES,
  );
  const [getMyRecentRecipes, { loading: getRecentRecipesLoading }] =
    useLazyQuery(GET_MY_RECENT_RECIPES);
  const [
    getCustomRecipes,
    {
      data: getCustomRecipesData,
      loading: getCustomRecipesLoading,
      error: getCollectionRecipeError,
    },
  ] = useLazyQuery(GET_SINGLE_COLLECTION);
  const [
    getShareWithMeCollection,
    {
      data: shareWithMeCollectionData,
      loading: shareWithMeCollectionLoading,
      error: shareWithMeCollectionError,
    },
  ] = useLazyQuery(GET_SHARE_WITH_ME_COLLECTIONS, {
    variables: { userId },
  });
  const {
    handleFilterRecipes,
    loading: filterRecipesLoading,
    error: filterRecipesError,
    data: filteredRecipes,
  } = useFetchGetRecipesByBlendAndIngredients();
  const { allFilters, allFilterRecipes, showFilterOrSearchRecipes } =
    useAppSelector((state) => state?.filterRecipe);
  const { functionAcceptCollectionShare, acceptCollectionShareLoading } =
    useToAcceptCollectionShare();

  // handle next page
  const handleNextPage = () => {
    setPageNum((page) => page + 1);
    handleFilterRecipes(allFilters, pageNum + 1, dataLimit, false);
  };

  const closeFilterRecipes = () => {
    dispatch(
      updateAllFilterRecipes({
        filterRecipes: [],
        isFiltering: false,
        totalItems: 0,
      }),
    );
    dispatch(resetAllFilters());
    setPageNum(1);
  };

  // open recipe collection panel after added a recipe to a collection
  const handleOpenCollectionTray = () => {
    dispatch(setSingleRecipeWithinCollecions([lastModifiedCollection?.id]));
    dispatch(setOpenCollectionsTary(true));
    dispatch(setChangeRecipeWithinCollection(true));
    setOpenCollectionModal(false);
  };

  useEffect(() => {
    if (!slug) return;
    setShareWithMeCollection(false);
    if (slug == "all-recipes") {
      setTitle("All Recipes");
      getAllRecipes({ variables: { userId } }).then((res: any) => {
        setRecipes(res?.data?.getAllRecipesFromCollection);
      });
    } else if (slug === "shared_with_me") {
      setShareWithMeCollection(true);
      getShareWithMeCollection();
    } else if (slug === "my-recipes") {
      setTitle("My Recipes");
      getMyRecipes({ variables: { userId } }).then((res: any) => {
        setRecipes(res?.data?.getAllMyCreatedRecipes);
      });
    } else if (slug === "recent-recipes") {
      setTitle("Recent Recipes");
      getMyRecentRecipes({ variables: { userId } }).then((res: any) => {
        setRecipes(res?.data?.getMyRecentRecipes);
      });
    } else {
      getCustomRecipes({
        variables: {
          userId,
          slug,
          collectionId: collectionId || "",
          token: token || "",
          singleRecipeCollectionId: singleRecipeCollectionId || "",
          page: 1,
          limit: dataLimit,
        },
      }).then((res: any) => {
        setTitle(res?.data?.getASingleCollection?.name);
        setRecipes(res?.data?.getASingleCollection?.recipes);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getAllRecipes,
    getCustomRecipes,
    getMyRecipes,
    collectionId,
    token,
    slug,
    userId,
    singleRecipeCollectionId,
  ]);

  useEffect(() => {
    // filter recipe func
    if (allFilters.length) {
      setPageNum(1);
      handleFilterRecipes(allFilters, 1, dataLimit, true);
    } else {
      dispatch(
        updateAllFilterRecipes({
          filterRecipes: [],
          isFiltering: false,
          totalItems: 0,
        }),
      );
      setPageNum(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFilters]);

  if (
    getCollectionRecipeError ||
    filterRecipesError ||
    shareWithMeCollectionError
  ) {
    return (
      <Layout>
        <ErrorPage
          style={{ height: "50vh" }}
          errorMessage="No collection recipe found"
        />
      </Layout>
    );
  }

  return (
    <Layout allFilters={allFilters}>
      {allFilters.length ? (
        <ShowRecipeContainer
          data={allFilterRecipes.filterRecipes}
          loading={filterRecipesLoading}
          closeHandler={closeFilterRecipes}
          showItems="recipe"
          showDefaultLeftHeader
          showDefaultMiddleHeader={
            allFilterRecipes.filterRecipes.length ? true : false
          }
          showDefaultRightHeader
          hasMore={allFilterRecipes?.totalItems > dataLimit * pageNum}
          totalDataCount={allFilterRecipes?.totalItems}
          nextPage={handleNextPage}
          setOpenCollectionModal={setOpenCollectionModal}
          setOpenShareModal={setOpenShareModal}
          setShareRecipeData={setShareRecipeData}
        />
      ) : isSharedWithMeCollection ? (
        <SharedWithMe
          data={shareWithMeCollectionData?.getSharedWithMeCollections}
          loading={shareWithMeCollectionLoading}
          error={shareWithMeCollectionError}
          setOpenCollectionModal={setOpenCollectionModal}
          setOpenShareModal={setOpenShareModal}
          setShareRecipeData={setShareRecipeData}
        />
      ) : (
        <ShowRecipeContainer
          data={recipes}
          loading={
            getAllRecipesLoading ||
            getMyRecipesLoading ||
            getCustomRecipesLoading ||
            getRecentRecipesLoading
          }
          headerLeftSide={
            <div className="flex ai-center">
              {slug === "my-favorite" ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  className={classes.head__icon}
                />
              ) : (
                <FontAwesomeIcon icon={faStar} className={classes.head__icon} />
              )}

              <h2 className={classes.head__title}>{title}</h2>
            </div>
          }
          headerRightSide={
            <div className="d-flex ai-center">
              {getCustomRecipesData?.getASingleCollection?.hasOwnProperty(
                "accepted",
              ) && !getCustomRecipesData?.getASingleCollection?.accepted ? (
                <HeaderTextBtn
                  style={{ marginRight: "1rem" }}
                  variant="containPrimary"
                  onClick={() =>
                    functionAcceptCollectionShare({
                      token:
                        token ||
                        getCustomRecipesData?.getASingleCollection?._id,
                      userId,
                    })
                  }
                >
                  {acceptCollectionShareLoading
                    ? "Loading..."
                    : "Add to collection"}
                </HeaderTextBtn>
              ) : null}

              <IconWarper
                iconColor="iconColorWhite"
                defaultBg="primary"
                hover="bgPrimary"
                style={{ width: "28px", height: "28px" }}
                handleClick={() => router.back()}
              >
                <FontAwesomeIcon icon={faXmark} />
              </IconWarper>
            </div>
          }
          showItems="recipe"
          setOpenCollectionModal={setOpenCollectionModal}
          setOpenShareModal={setOpenShareModal}
          setShareRecipeData={setShareRecipeData}
        />
      )}

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
        title={shareRecipeData?.name}
        image={shareRecipeData?.image}
        turnedOnVersions={shareRecipeData?.turnedOnVersions}
        show={openShareModal}
        setShow={setOpenShareModal}
        type="recipe"
        heading="Share Recipe"
      />
    </Layout>
  );
};

const Layout: FC<{ allFilters?: any[] }> = ({ children, allFilters = [] }) => {
  const [input, setInput] = useState("");
  const { openFilterTray } = useAppSelector((state) => state?.sideTray);
  const dispatch = useAppDispatch();
  const toggleFilterPanel = () => {
    dispatch(setOpenFilterTray(!openFilterTray));
  };
  const { dbUser } = useAppSelector((state) => state?.user);
  const router = useRouter();
  return (
    <AContainer
      headerIcon="/icons/juicer.svg"
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
      headTagInfo={{
        title: "Recipe collection",
        description: "Recipe collection",
      }}
    >
      <div className={styles.main__div}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CommonSearchBar
            input={input}
            setInput={setInput}
            isSearchTag={false}
            openPanel={toggleFilterPanel}
            isOpenPanel={openFilterTray}
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

        {allFilters?.length ? (
          <SearchtagsComponent allFilters={allFilters} />
        ) : null}

        <WikiBanner />
        {children}
      </div>
    </AContainer>
  );
};

const SharedWithMe = ({
  data,
  loading,
  error,
  setOpenCollectionModal,
  setOpenShareModal,
  setShareRecipeData,
}) => {
  const [containerData, setContainerData] = useState<{ [key: string]: any }[]>(
    [],
  );

  const updateContainerData = useCallback(
    (objectId: string, recipeId: string, updateObj: { [key: string]: any }) => {
      setContainerData((prev) =>
        prev.map((item) =>
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
      );
    },
    [],
  );

  useEffect(() => {
    setContainerData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <div style={{ marginTop: "20px" }}>
      {containerData?.length ? (
        containerData?.map((item, index) => {
          const { _id, description, image, name, recipes, slug, creatorInfo } =
            item;
          return (
            <ShowRecipes
              key={_id}
              headerData={{
                heading: name,
                image: creatorInfo?.image || "/images/fire-alt-light.svg",
                allUrl: `/collection/recipeCollection/${slug}?${
                  name === "Single Recipes"
                    ? "singleRecipeCollectionId"
                    : "collectionId"
                }=${_id}`,
              }}
              loading={loading}
              recipes={recipes}
              setOpenCollectionModal={setOpenCollectionModal}
              setOpenShareModal={setOpenShareModal}
              setShareRecipeData={setShareRecipeData}
              updateDataFunc={(recipeId, updateObj) =>
                updateContainerData(_id, recipeId, updateObj)
              }
            />
          );
        })
      ) : (
        <ErrorPage
          style={{ height: "50vh" }}
          image="/icons/empty_data.svg"
          errorMessage="No data found"
        />
      )}
    </div>
  );
};

export default CollectionRecipes;
