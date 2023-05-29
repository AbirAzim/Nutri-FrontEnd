import { useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { FC, useRef, useState, useEffect } from "react";
import AContainer from "../../../containers/A.container";
import GET_ALL_RECIPE_VERSION from "../../../gqlLib/versionCompare/query/getAllRecipeVersions";
import SkeletonComparePage from "../../../theme/skeletons/skeletonComparePage/SkeletonComparePage";
import styles from "./index.module.scss";
import Slider from "react-slick";
import { compareRecipeResponsiveSetting } from "./utility";
import { useAppSelector } from "../../../redux/hooks";
import ErrorPage from "../404Page";
import ArrowBackIcon from "../../../public/icons/arrow_back_black_36dp.svg";
import VersionDetailsIndex from "./versionDetails";
import { DragDropContext } from "react-beautiful-dnd";
import { reorder } from "../../recipe/compareRecipe/utility";
import notification from "../../utility/reactToastifyNotification";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import {
  faPen,
  faRectangleVerticalHistory,
} from "@fortawesome/pro-light-svg-icons";
import { useDispatch } from "react-redux";
import {
  RecipeDetailsType,
  VersionDataType,
} from "../../../type/recipeDetailsType";
import { CompareRecipeType } from "../../../type/compareRecipeType";
import useToEditOfARecipeVersion from "../../../customHooks/useToEditOfARecipeVersion";
import ConfirmationModal from "../../../theme/confirmationModal/ConfirmationModal";
import {
  setIsNewVersionInfo,
  setOpenVersionTray,
  setOpenVersionTrayFormWhichPage,
} from "../../../redux/slices/versionTraySlice";
import { setDetailsARecipe } from "../../../redux/slices/recipeSlice";
import { VersionAddDataType } from "../../../type/versionAddDataType";
import useToUpdateAfterEditVersion from "../../../customHooks/useToUpdateAfterEditVersion";

const compareRecipeResponsiveSettings = {
  ...compareRecipeResponsiveSetting,
  dotsClass: styles.button__bar,
};

const VersionCompare = () => {
  const [newVersionInfo, setNewVersionInfo] = useState<VersionAddDataType>(
    {} as VersionAddDataType,
  );
  const [openModal, setOpenModal] = useState(false);
  const [normalizeData, setNormalizeData] = useState<CompareRecipeType[]>([]);
  const [singleVersionsEditMode, setSingleVersionsEditMode] = useState(null);
  const [allVersionsEditMode, setAllVersionsEditMode] = useState(false);
  const [newRecipe, setNewRecipe] = useState<{
    versionId: string;
    name: string;
    image: string[];
    description: string;
    recipeBlendCategory: string;
    ingredients: {
      ingredientId: string;
      selectedPortionName: string;
      weightInGram: number;
      selectedPortionQuantity: number;
      ingredientName: string;
      label: string; // `${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`;
      comment?: string;
    }[];
  }>({
    versionId: "",
    name: "",
    image: [],
    description: "",
    recipeBlendCategory: "",
    ingredients: [],
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const recipeId = router.query?.recipeId as string;
  const { dbUser } = useAppSelector((state) => state.user);
  const { data, loading, error } = useQuery(GET_ALL_RECIPE_VERSION, {
    variables: { recipeId, userId: dbUser._id },
  });
  const sliderRef = useRef(null);
  const { handleToEditARecipeVersion, loading: versionUpdateLoading } =
    useToEditOfARecipeVersion();
  const isMounted = useRef(false);
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const handleToUpdateARecipeVersionAfterEdit = useToUpdateAfterEditVersion();
  const { allIngredients } = useAppSelector((state) => state?.ingredients);

  // open confirmation modal
  const openConfirmationModal = (data: VersionAddDataType) => {
    setOpenModal(true);
    setNewVersionInfo(data);
  };

  // open version tray
  const handleOpenVersionTray = async () => {
    dispatch(setOpenVersionTray(true));
    dispatch(setOpenVersionTrayFormWhichPage("edit"));
    dispatch(setIsNewVersionInfo(newVersionInfo));
    setOpenModal(false);
  };

  const versionHandler = (
    recipeId: string,
    versionInfo?: VersionDataType,
    isVersionEditMode: boolean = false,
  ) => {
    dispatch(setOpenVersionTray(true));
    dispatch(setOpenVersionTrayFormWhichPage("edit"));
    let ingredientsArr = [];

    versionInfo?.ingredients?.forEach((ing) => {
      const ingredientId = ing?.ingredientId?._id;
      const selectedPortionName = ing?.selectedPortion?.name;
      const selectedPortionGram = ing?.selectedPortion?.gram;
      ingredientsArr.push({
        ingredientId: ingredientId,
        selectedPortionName: selectedPortionName,
        weightInGram: selectedPortionGram,
      });
    });

    let obj: VersionAddDataType = {
      postfixTitle: versionInfo?.postfixTitle,
      recipeId: versionInfo?.recipeId || recipeId,
      userId: dbUser?._id,
      description: versionInfo?.description,
      ingredients: ingredientsArr,
      recipeInstructions: versionInfo?.recipeInstructions,
      servingSize: versionInfo?.servingSize,
    };
    dispatch(setIsNewVersionInfo(isVersionEditMode ? obj : null));
  };

  // arrange array for working
  const handleNormalizeData = (
    data: RecipeDetailsType,
  ): CompareRecipeType[] => {
    const {
      recipeId,
      defaultVersion,
      turnedOffVersions,
      turnedOnVersions,
      isMatch,
      addedToCompare,
      allRecipes,
      myRecipes,
      notes,
      userCollections,
      versionsCount,
      tempVersionInfo,
    } = data;

    // map version to recipe
    let mapVersionToRecipe = (
      version: VersionDataType[],
      isVersionSharable: boolean,
    ): CompareRecipeType[] => {
      return version?.map((item) => ({
        addedToCompare,
        allRecipes,
        defaultVersion: { ...item, isVersionSharable },
        isMatch: false,
        myRecipes,
        notes,
        recipeId,
        userCollections,
        versionCount: 0,
      }));
    };

    let normalizeData: CompareRecipeType[] = [
      {
        addedToCompare,
        allRecipes,
        defaultVersion: { ...defaultVersion, isVersionSharable: true },
        isMatch: true,
        myRecipes,
        notes,
        recipeId,
        userCollections,
        versionCount: 0,
      },
      ...(mapVersionToRecipe(turnedOnVersions, true) || []),
      ...(mapVersionToRecipe(turnedOffVersions, false) || []),
    ];

    if (!isMatch) {
      normalizeData = [
        {
          addedToCompare,
          allRecipes,
          defaultVersion: {
            ...recipeId?.originalVersion,
            isVersionSharable: true,
          },
          isMatch: false,
          myRecipes,
          notes,
          recipeId,
          userCollections,
          versionCount: 0,
        },
        ...normalizeData,
      ];
    }

    return normalizeData;
  };

  // handle go edit mode
  const handleEditMode = (editMode: boolean, index: number | null = null) => {
    setAllVersionsEditMode(editMode);
    setSingleVersionsEditMode(index);
  };

  // update create new recipe data
  const handleUpdateData = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | any
    >,
  ) => {
    const target = e?.target;
    const { name, value } = target;
    if (target?.files) {
      setNewRecipe((state) => ({ ...state, image: e?.target?.files }));
    } else {
      setNewRecipe((state) => ({ ...state, [name]: value }));
    }
  };

  // find version by id
  const findVersion = (id: string) => {
    const findOne = normalizeData?.find(
      (version) => version?.defaultVersion?._id === id,
    );
    return findOne;
  };

  // find existing ingredient
  const findItem = (id) => {
    return newRecipe?.ingredients?.find((item) => item?.ingredientId === id);
  };

  // click to add ingredient form others versions
  const addIngredient = (id: string, index: number) => {
    const findRecipe = findVersion(id);

    if (findRecipe) {
      const findIngredient = findRecipe?.defaultVersion?.ingredients?.[index];
      const ingredientId = findIngredient?.ingredientId?._id;
      const selectedPortionName = findIngredient?.selectedPortion?.name;
      const selectedPortionGram = findIngredient?.selectedPortion?.gram;
      const ingredientName = findIngredient?.ingredientId?.ingredientName;
      const selectedPortionQuantity = findIngredient?.selectedPortion?.quantity;
      const item = findItem(ingredientId);

      if (!item) {
        const newIngredient = {
          ingredientId: ingredientId,
          selectedPortionName: selectedPortionName,
          weightInGram: selectedPortionGram,
          selectedPortionQuantity: selectedPortionQuantity,
          ingredientName,
          label: `${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`,
        };

        setNewRecipe((state) => ({
          ...state,
          ingredients: [...state?.ingredients, newIngredient],
        }));
      } else {
        return;
      }
    }
  };

  // click to version edit
  const editVersionClick = (
    recipe: CompareRecipeType,
    editMode: boolean,
    index: number,
  ) => {
    const {
      defaultVersion: { ingredients, description, postfixTitle, _id },
      recipeId: { image, recipeBlendCategory },
    } = recipe;
    let ingredientsArr = [];

    ingredients?.forEach((ing) => {
      const ingredientId = ing?.ingredientId?._id;
      const selectedPortionName = ing?.selectedPortion?.name;
      const selectedPortionGram = ing?.selectedPortion?.gram;
      const ingredientName = ing?.ingredientId?.ingredientName;
      const selectedPortionQuantity = ing?.selectedPortion?.quantity;
      ingredientsArr.push({
        ingredientId: ingredientId,
        selectedPortionName: selectedPortionName,
        weightInGram: selectedPortionGram,
        selectedPortionQuantity,
        ingredientName,
        label: `${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`,
      });
    });

    const defaultImage =
      image?.find((img) => img?.default)?.image || image[0]?.image || "";
    setNewRecipe((state) => ({
      ...state,
      versionId: _id,
      name: postfixTitle,
      description,
      image: [defaultImage],
      recipeBlendCategory: recipeBlendCategory?._id,
      ingredients: [...ingredientsArr],
    }));
    handleEditMode(editMode, index);
  };

  // darg and drop data handle
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId !== "droppable") {
      if (destination.droppableId === "droppable") {
        addIngredient(source?.droppableId, source?.index);
      } else {
        return;
      }
    } else {
      if (source.droppableId === destination.droppableId) {
        setNewRecipe((state) => ({
          ...state,
          ingredients: [
            ...reorder(state?.ingredients, source.index, destination.index),
          ],
        }));
      } else {
        return;
      }
    }
  };

  const handleSubmitEditedVersion = async (
    recipeId: string,
    versionId: string,
    isOriginalVersion: boolean,
    isVersionSharable: boolean,
  ) => {
    const version = findVersion(versionId);
    let ingArr = [];
    let newIngredientObj = [];
    newRecipe.ingredients?.forEach((item) => {
      const {
        ingredientId,
        selectedPortionName,
        weightInGram,
        ingredientName,
        selectedPortionQuantity,
        comment = "",
      } = item;
      ingArr?.push({
        ingredientId: item?.ingredientId,
        selectedPortionName: item?.selectedPortionName,
        weightInGram: item?.weightInGram,
        comment: comment || null,
      });
      newIngredientObj.push({
        ingredientId: {
          _id: ingredientId,
          ingredientName,
        },
        selectedPortion: {
          gram: weightInGram,
          name: selectedPortionName,
          quantity: selectedPortionQuantity,
        },
        weightInGram,
      });
    });

    let objForEditARecipe = {
      editId: newRecipe?.versionId,
      recipeId: recipeId,
      turnedOn: version?.defaultVersion?.isVersionSharable || null,
      userId: dbUser?._id,
      editableObject: {
        postfixTitle: newRecipe?.name,
        description: newRecipe?.description,
        ingredients: ingArr,
      },
    };

    const objForCreateNewVersion: VersionAddDataType = {
      postfixTitle: newRecipe?.name,
      recipeId: recipeId,
      userId: dbUser?._id,
      description: newRecipe?.description,
      ingredients: ingArr,
      recipeInstructions: [],
      servingSize: 0,
    };

    const findRecipe = findVersion(versionId);
    if (
      findRecipe?.defaultVersion?._id ===
      findRecipe?.recipeId?.originalVersion?._id
    ) {
      openConfirmationModal(objForCreateNewVersion);
    } else {
      try {
        const returnObj = await handleToEditARecipeVersion(
          dbUser._id,
          recipeId,
          versionId,
          isVersionSharable,
          objForEditARecipe?.editableObject,
          isOriginalVersion,
        );

        handleToUpdateARecipeVersionAfterEdit(
          versionId,
          isVersionSharable,
          {
            postfixTitle: objForEditARecipe?.editableObject.postfixTitle,
            description: objForEditARecipe?.editableObject.description,
            ingredients: newIngredientObj,
          },
          returnObj,
        );

        handleEditMode(false, null);
        // notification("info", "Version updated successfully");
      } catch (error) {
        notification("error", "Version updated failed");
      }
    }
  };

  const handleToUpdateDataAfterChangeDefaultVersion = (
    versionId: string,
    returnObj: { [key: string]: any } = {},
  ) => {
    // dispatch(
    //   setDetailsARecipe({
    //     ...detailsARecipe,
    //     ...returnObj,
    //   }),
    // );
  };

  useEffect(() => {
    setNormalizeData(handleNormalizeData(detailsARecipe));
  }, [detailsARecipe]);

  useEffect(() => {
    if (!loading && data?.getAllVersions) {
      const recipe = data?.getAllVersions;
      dispatch(
        setDetailsARecipe({
          ...recipe,
          tempVersionInfo: {
            isOriginalVersion: recipe?.isMatch,
            isShareAble: true,
            version: recipe?.defaultVersion,
          },
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.getAllVersions, loading]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const customEditIcon = (recipe: any, isEditMode: boolean, index: number) => (
    <IconWarper
      hover="bgSlightGray"
      handleClick={() => editVersionClick(recipe, true, index)}
      style={{ width: "24px", height: "24px" }}
    >
      <FontAwesomeIcon icon={faPen} fontSize={12} />
    </IconWarper>
  );

  if (loading) {
    return (
      <LayoutComponent>
        <SkeletonComparePage />
      </LayoutComponent>
    );
  }

  if (error) {
    return (
      <LayoutComponent>
        <ErrorPage />
      </LayoutComponent>
    );
  }

  return (
    <>
      <LayoutComponent>
        <div className={styles.versionCompareNav} onClick={() => router.back()}>
          <ArrowBackIcon className={styles.versionCompareNav__icon} />
          <p>Back</p>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Slider {...compareRecipeResponsiveSettings} ref={sliderRef}>
            {normalizeData?.map((recipe, index) => {
              return (
                <VersionDetailsIndex
                  key={index}
                  recipe={recipe}
                  recipeId={recipe?.recipeId?._id}
                  isOriginalVersion={
                    recipe?.recipeId?.originalVersion?._id ===
                    recipe?.defaultVersion?._id
                  }
                  id={recipe?.defaultVersion?._id}
                  dragAndDrop={allVersionsEditMode}
                  newRecipe={newRecipe}
                  setNewRecipe={setNewRecipe}
                  addItem={addIngredient}
                  handleUpdateData={handleUpdateData}
                  index={index}
                  singleVersionsEditMode={singleVersionsEditMode}
                  handleSubmitEditedVersion={handleSubmitEditedVersion}
                  handleEditMode={handleEditMode}
                  customMenu={customEditIcon(recipe, true, index)}
                  versionUpdateLoading={versionUpdateLoading}
                  showMoreMenuAtHover={true}
                  footerMenuType="OnlyStar"
                  updateDataAfterChangeDefaultVersion={
                    handleToUpdateDataAfterChangeDefaultVersion
                  }
                  handleToOpenVersionTray={versionHandler}
                  showTopCancelButton={false}
                  isVersionSharable={recipe?.defaultVersion?.isVersionSharable}
                />
              );
            })}
          </Slider>
        </DragDropContext>
      </LayoutComponent>
      <ConfirmationModal
        text="You can't edit original recipe but you can make a new version like original one !!!"
        cancleFunc={() => {
          setOpenModal(false);
          dispatch(setIsNewVersionInfo(null));
        }}
        submitFunc={handleOpenVersionTray}
        openModal={openModal}
        setOpenModal={setOpenModal}
        submitButText="Proceed"
      />
    </>
  );
};

const LayoutComponent: FC = ({ children }) => {
  return (
    <AContainer
      logo={false}
      headerIcon={
        <FontAwesomeIcon
          icon={faRectangleVerticalHistory}
          color="#7cbc39"
          fontSize={20}
        />
      }
      headerTitle="Compare versions"
      showCollectionTray={{
        show: true,
        showPanle: "left",
        showTagByDeafult: false,
      }}
      showCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
      showVersionTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
      headTagInfo={{
        title: "Recipe version compare",
        description: "recipe version compare",
      }}
    >
      <div className={styles.versionCompareContainer}>{children}</div>
    </AContainer>
  );
};

export default VersionCompare;
