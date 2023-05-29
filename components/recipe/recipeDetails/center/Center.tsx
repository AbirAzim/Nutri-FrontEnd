/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState } from "react";
import SlickSlider from "../../../../theme/carousel/carousel.component";
import styles from "./Center.module.scss";
import { MdOutlineInfo } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import Modal from "../../../../theme/modal/customModal/CustomModal";
import ShareRecipeModal from "../../../../theme/shareRecipeModal/ShareRecipeModal";
import SaveRecipe from "../../../../theme/lastModifiedColletionModalContent/LastModifiedCollectionModalContent";
import Image from "next/image";
import { useRouter } from "next/router";
import CircularRotatingLoader from "../../../../theme/loader/circularRotatingLoader.component";
import useGetDefaultPortionOfnutration from "../../../../customHooks/useGetDefaultPortionOfNutration";
import PanelHeaderCenter from "../../share/panelHeader/PanelHeaderCenter";
import IconWithText from "./Icon/IconWithText";
import useForAddToCollection from "../../../../customHooks/useForAddToCollection";
import useForOpenCollectionTray from "../../../../customHooks/useForOpenCollection";
import useForOpenCommentsTray from "../../../../customHooks/useForOpenCommentsTray";
import useForSelectCommentsAndNotesIcon from "../../../../customHooks/useForSelectCommentsAndNotesIcon";
import {
  setOpenVersionTray,
  setOpenVersionTrayFormWhichPage,
  setShouldCloseVersionTrayWhenClickAVersion,
} from "../../../../redux/slices/versionTraySlice";
import { VscVersions } from "react-icons/vsc";
import IngredientDetails from "../../../../component/module/Recipe/Ingredient-Details.module";
import { RecipeDetailsType } from "../../../../type/recipeDetailsType";
import { GiGl } from "../../../../type/nutrationType";
import Share from "../../../../component/organisms/Share/Distribute.component";
import ShareRecipe from "./shareRecipe";
import { setDetailsARecipe } from "../../../../redux/slices/recipeSlice";
import HowTo from "./howTo/HowTo";
import { ReferenceOfRecipeUpdateFuncType } from "../../../../type/recipeType";
import useToAcceptRecipeShare from "../../../../customHooks/notification/useToAcceptRecipeShare";
import useToRejectRecipeShare from "../../../../customHooks/notification/useToRejectRecipeShare";

interface center {
  recipeData: RecipeDetailsType;
  counter: any;
  setCounter: any;
  nutritionState: any;
  setNutritionState: any;
  giGl: GiGl;
  pageComeFrom?: "edit" | "details";
}

const Center = ({
  recipeData,
  counter,
  setCounter,
  nutritionState,
  setNutritionState,
  giGl = {
    netCarbs: 0,
    totalGi: 0,
    totalGL: 0,
  },
  pageComeFrom,
}: center) => {
  const router = useRouter();
  const { token = "" } = router.query;
  const dispatch = useAppDispatch();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(true);
  const [ingredientId, setIngredientId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  useGetDefaultPortionOfnutration(ingredientId);
  const { addToCollection: handleAddToCollection } = useForAddToCollection();
  const handleOpenCollectionTray = useForOpenCollectionTray();
  const handleOpenCommentsTray = useForOpenCommentsTray();
  const handleSelectCommentsAndNotesIcon = useForSelectCommentsAndNotesIcon();
  const { lastModifiedCollection } = useAppSelector(
    (state) => state?.collections,
  );
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const userId = useAppSelector((state) => state?.user?.dbUser?._id);
  const { functionAcceptRecipeShare, acceptRecipeShareLoading } =
    useToAcceptRecipeShare();
  const { functionRejectRecipeShare, rejectRecipeShareLoading } =
    useToRejectRecipeShare();

  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    if (text?.length > 300) {
      return (
        <p className={styles.text}>
          {isReadMore ? text.slice(0, 300) : text},
          <span onClick={toggleReadMore} className={styles.read_or_hide}>
            {isReadMore ? (
              <span>&nbsp; {"Read More"}</span>
            ) : (
              <span>&nbsp; {"Read Less"}</span>
            )}
          </span>
        </p>
      );
    } else {
      return <p className={styles.text}>{text}</p>;
    }
  };

  const updateCollection = useCallback<ReferenceOfRecipeUpdateFuncType>(
    (id, obj, innerLabel) => {
      dispatch(
        setDetailsARecipe({
          ...detailsARecipe,
          ...obj,
          [innerLabel]: { ...detailsARecipe[innerLabel], ...obj },
        }),
      );
    },
    [detailsARecipe, dispatch],
  );

  const addToCollection = async (id: string, e: React.SyntheticEvent) => {
    setShowCollectionModal(true);
    await handleAddToCollection(id, setOpenModal, e, updateCollection);
  };

  // open comments tray
  const openCommentsTray = (e) => {
    const title = recipeData?.recipeId?.name;
    const recipeId = recipeData?.recipeId?._id;
    const defaultImage = recipeData?.recipeId?.image?.find(
      (img) => img?.default,
    )?.image;

    handleOpenCommentsTray(
      recipeId,
      title,
      defaultImage,
      e,
      updateCollection,
      detailsARecipe?.personalRating,
    );
  };

  const hangleShowCommentsAndNotesIcon = () => {
    const notes = recipeData?.notes;
    const comments = recipeData?.recipeId?.numberOfRating;
    const title = recipeData?.recipeId?.name;
    const recipeId = recipeData?.recipeId?._id;
    const defaultImage = recipeData?.recipeId?.image?.find(
      (img) => img?.default,
    )?.image;
    const commentsAndNotes = handleSelectCommentsAndNotesIcon(comments, notes);
    return (
      <IconWithText
        wraperStyle={{ marginRight: "16px", cursor: "pointer" }}
        handleClick={(e) =>
          handleOpenCommentsTray(
            recipeId,
            title,
            defaultImage,
            e,
            updateCollection,
            detailsARecipe?.personalRating,
          )
        }
        icon={`/icons/${commentsAndNotes?.icon}.svg`}
        text={commentsAndNotes?.amount}
        textStyle={{ color: commentsAndNotes?.amount ? "#7cbc39" : "#c4c4c4" }}
      />
    );
  };

  // edit or accept btn function
  const handleEditOrSavebtnFunc = async (variables) => {
    if (variables?.token) {
      await functionAcceptRecipeShare({
        token: variables?.token,
        userId: variables?.userId,
      });
      router?.push(`/recipe_details/${variables?.recipeId}`);
    } else {
      router?.push(`/edit_recipe/${variables?.recipeId}`);
    }
  };

  // back or decline btn function
  // const handleBackOrDeclineBtnFunc = async (variables) => {
  //   if (variables?.token) {
  //     await functionRejectRecipeShare({
  //       token: variables?.token,
  //       userId: variables?.userId,
  //     });
  //   }
  //   router?.push("/discovery");
  // };

  // handle to open version tray

  const handleToOpenVersionTray = () => {
    dispatch(setOpenVersionTray(true));
    dispatch(setOpenVersionTrayFormWhichPage("details"));
    dispatch(setShouldCloseVersionTrayWhenClickAVersion(true));
  };

  // handle open collection tray or added to collection
  const handleOpenCollectionTrayOrAddToCollection = (
    event,
    recipeDataLength,
    recipeId,
    userCollections,
    updateCollectionFunction,
  ) => {
    recipeDataLength
      ? handleOpenCollectionTray(
          recipeId,
          userCollections,
          event,
          updateCollectionFunction,
        )
      : addToCollection(recipeId, event);
  };

  // handle open collection tray

  const handleToOpenCollectionTray = () => {
    setShowCollectionModal(false);
    setShowShareModal(true);
    // setOpenModal(true);
  };

  return (
    <>
      <PanelHeaderCenter
        editOrSavebtnFunc={() =>
          handleEditOrSavebtnFunc({
            token,
            userId,
            recipeId: recipeData?.recipeId?._id,
          })
        }
        editOrSavebtnText={
          token
            ? acceptRecipeShareLoading
              ? "Loading..."
              : "Add to Collection"
            : "Edit"
        }
        pageComeFrom={pageComeFrom}
        // loading={acceptRecipeShareLoading}
        backBtnObj={{
          function: () => router?.push("/discovery"),
          text: "Back",
        }}
      />

      <div className={styles.contentBox}>
        <div className={styles.heading}>
          <h3>
            {recipeData?.tempVersionInfo?.version?.postfixTitle}
            {/* <span>
              {recipeData?.isMatch
                ? ""
                : recipeData?.defaultVersion?.postfixTitle}
            </span> */}
          </h3>
          {recipeData?.recipeId?.averageRating ? (
            <span
              className={styles.ratingBox}
              onClick={(e) => openCommentsTray(e)}
            >
              <img src="/images/rating.svg" alt="" />
              {Math.round(recipeData.recipeId?.averageRating)} (
              {recipeData?.recipeId?.numberOfRating})
            </span>
          ) : null}
        </div>
        <div className={styles.subMenu}>
          <div className={styles.alignItems}>
            <div className={styles.recipeType}>
              {recipeData?.recipeId?.recipeBlendCategory?.name}
            </div>
            <a
              href={`https://www.yummly.com/dish/981850/tomato-casserole-a-new-england-dish-thats-anything-but-common?blend-redirected=true&recipe=${recipeData?.recipeId?._id}`}
            >
              <img
                src="/images/yummly-logo.png"
                alt="recipe_logo"
                className={styles.recipeLogo}
              />
            </a>
          </div>
          <div className={styles.alignItems}>
            <>
              {recipeData?.versionsCount ? (
                <IconWithText
                  wraperStyle={{ marginRight: "16px", cursor: "pointer" }}
                  handleClick={() => !token && handleToOpenVersionTray()}
                  icon={<VscVersions color={"#7cbc39"} />}
                  text={`Versions(${recipeData?.versionsCount})`}
                />
              ) : null}

              <IconWithText
                wraperStyle={{ marginRight: "16px", cursor: "pointer" }}
                handleClick={() => {}}
                icon="/images/calendar-alt-light.svg"
                text="Planner"
              />

              <IconWithText
                wraperStyle={{ marginRight: "16px", cursor: "pointer" }}
                handleClick={(e) =>
                  !token &&
                  handleOpenCollectionTrayOrAddToCollection(
                    e,
                    recipeData?.userCollections?.length,
                    recipeData?.recipeId?._id,
                    recipeData?.userCollections,
                    updateCollection,
                  )
                }
                icon={
                  recipeData?.userCollections?.length
                    ? "/icons/compare.svg"
                    : "/images/BookmarksStar.svg" //"/images/BookmarksStar-orange.svg"
                }
                text="Saved"
              />

              <IconWithText
                wraperStyle={{ marginRight: "16px", cursor: "pointer" }}
                handleClick={() => !token && handleToOpenCollectionTray()}
                icon="/images/share-alt-light-grey.svg"
                text="Share"
              />
            </>

            {hangleShowCommentsAndNotesIcon()}
          </div>
        </div>

        <div className={styles.sliderBox}>
          {recipeData?.recipeId?.image ? (
            <SlickSlider>
              {recipeData?.recipeId?.image?.map((img, index) => {
                return (
                  <div key={index} className={styles.imageBox}>
                    <div
                      className={styles.imageBlurBox}
                      style={{
                        backgroundImage: `url(${img.image})`,
                      }}
                    />

                    <Image
                      src={img.image}
                      alt="recipe_image"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                );
              })}
            </SlickSlider>
          ) : (
            <div className={styles.imageBox__loader}>
              <CircularRotatingLoader />
            </div>
          )}
        </div>
        <div>
          <ReadMore>
            {recipeData?.tempVersionInfo?.version?.description}
          </ReadMore>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.infoBox}>
            <span>{Math?.round(giGl?.netCarbs)}</span>
            <p>Net Carbs</p>
          </div>
          <div className={styles.infoBox}>
            <span>{Math?.round(giGl?.totalGL)}</span>
            <p>Glycemic Load</p>
          </div>
          <div className={styles.infoBox}>
            <MdOutlineInfo className={styles.infoIcon} />
            <span>805</span>
            <p>Rx Score</p>
          </div>
        </div>
      </div>
      <IngredientDetails
        counter={counter}
        setCounter={setCounter}
        recipeData={recipeData}
        nutritionState={nutritionState}
        setIngredientId={setIngredientId}
        setNutritionState={setNutritionState}
      />
      <HowTo
        recipeInstructions={
          recipeData?.tempVersionInfo?.version?.recipeInstructions
        }
      />
      <Modal open={openModal} setOpen={setOpenModal}>
        {showCollectionModal ? (
          <SaveRecipe
            title={lastModifiedCollection?.name}
            handleChange={(e) =>
              handleOpenCollectionTray(
                recipeData?.recipeId?._id,
                recipeData?.userCollections,
                e,
                updateCollection,
              )
            }
          />
        ) : (
          <ShareRecipeModal closeModal={() => setOpenModal(false)} />
        )}
      </Modal>
      <ShareRecipe
        id={recipeData?.recipeId?._id}
        versionId={recipeData.tempVersionInfo?.version?._id}
        title={
          recipeData?.defaultVersion?.postfixTitle || recipeData?.recipeId?.name
        }
        image={
          recipeData?.recipeId?.image?.length > 0
            ? recipeData?.recipeId?.image[0]?.image
            : ""
        }
        turnedOnVersions={recipeData?.turnedOnVersions?.map(
          (version) => version?._id,
        )}
        show={showShareModal}
        setShow={setShowShareModal}
        type="recipe"
        heading="Share Recipe"
      />
    </>
  );
};

export default Center;
