import React, { useState, useEffect } from "react";
import SectionTitleWithIcon from "../../../../theme/recipe/sectionTitleWithIcon/SectionTitleWithIcon.component";
import styles from "./RecipeDetails.module.scss";
import { Droppable, Draggable } from "react-beautiful-dnd";
import uniqueId from "../../../utility/uniqueId";
import NutrationPanelSkeleton from "../../../../theme/skeletons/nutrationPanelSkeleton/NutrationPanelSkeleton";
import UpdatedRecursiveAccordian from "../../../customRecursiveAccordian/updatedRecursiveAccordian.component";
import useDraggableInPortal from "../../../../customHooks/useDraggableInPortal";
import SingleIngredient from "../singleIngredient/SingleIngredient";
import { IoClose } from "react-icons/io5";
import IconWraper from "../../../../theme/iconWarper/IconWarper";
import { useQuery } from "@apollo/client";
import GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS from "../../../../gqlLib/nutrition/query/getNutrientsListAndGiGlByIngredients";
import { CompareRecipeType } from "../../../../type/compareRecipeType";
import joniIngredients from "../../../../helperFunc/joinIngredients";
import DatacardComponent from "../../../../theme/cards/dataCard/dataCard.component";
import { ReferenceOfRecipeUpdateFuncType } from "../../../../type/recipeType";
import { VersionDataType } from "../../../../type/recipeDetailsType";

function Copyable(props) {
  const { items, addItem, droppableId } = props;
  const renderDraggable = useDraggableInPortal();

  return (
    <Droppable droppableId={droppableId} isDropDisabled={true}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {items?.map((item, index) => {
            const ingredientName = item?.ingredientId?.ingredientName;
            const selectedPortionName = item?.selectedPortion?.name;
            const selectedPortionQuantity = item?.selectedPortion?.quantity;

            return (
              <Draggable
                draggableId={`${item?.ingredientId?._id}_${droppableId}`}
                index={index}
                key={`${item?.ingredientId?._id}`}
              >
                {renderDraggable((provided, snapshot) => (
                  <>
                    <div {...provided.draggableProps} ref={provided.innerRef}>
                      <SingleIngredient
                        label={`${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`}
                        handleAdd={() => addItem(droppableId, index)}
                        dargProps={provided.dragHandleProps}
                      />
                    </div>

                    {snapshot.isDragging && (
                      <SingleIngredient
                        label={`${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`}
                        handleAdd={addItem}
                        dargProps={provided.dragHandleProps}
                      />
                    )}
                  </>
                ))}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

interface RecipeDetailsProps {
  recipe: CompareRecipeType;
  id?: string;
  addItem?: (id: string, index: number) => void;
  removeCompareRecipe: (id: string, e: React.SyntheticEvent) => void;
  dragAndDrop?: boolean;
  compareRecipeList: CompareRecipeType[];
  setcompareRecipeList: React.Dispatch<
    React.SetStateAction<CompareRecipeType[]>
  >;
  showMoreMenu?: boolean;
  showOptionalEditIcon?: boolean;
  setOpenCollectionModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCopyImage?: React.Dispatch<React.SetStateAction<string>>;
  customMenu?: any;
  showMoreMenuAtHover?: boolean;
  updateCompareList: ReferenceOfRecipeUpdateFuncType;
  handleToOpenVersionTray?: (
    recipeId: string,
    version?: VersionDataType,
  ) => void;
  footerMenuType?: "allIcons" | "OnlyStar";
  updateDataAfterChangeDefaultVersion?: (versionId: string) => void;
  showTopCancelButton?: boolean;
}

const RecipeDetails = ({
  recipe = {} as CompareRecipeType,
  id = uniqueId(),
  addItem = () => {},
  removeCompareRecipe,
  dragAndDrop = false,
  compareRecipeList = [],
  setcompareRecipeList = () => {},
  showMoreMenu = true,
  showOptionalEditIcon = false,
  setOpenCollectionModal = () => {},
  setCopyImage = () => {},
  customMenu = null,
  showMoreMenuAtHover = false,
  updateCompareList = () => {},
  handleToOpenVersionTray,
  footerMenuType = "allIcons",
  updateDataAfterChangeDefaultVersion = () => {},
  showTopCancelButton = true,
}: RecipeDetailsProps) => {
  const [winReady, setwinReady] = useState(false);

  const { loading: nutritionDataLoading, data: nutritionData } = useQuery(
    GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS,
    {
      variables: {
        ingredientsInfo: recipe?.defaultVersion?.ingredients?.map((item) => ({
          ingredientId: item.ingredientId._id,
          value: item?.selectedPortion?.gram,
        })),
      },
    },
  );

  useEffect(() => {
    setwinReady(true);
  }, []);

  return (
    <div className={styles.recipeDetailsFirstContainer}>
      <div className={styles.recipeDetailsContainer}>
        {showTopCancelButton && (
          <div className={styles.cancleIcon}>
            <IconWraper
              defaultBg="gray"
              handleClick={(e) => removeCompareRecipe(recipe?.recipeId?._id, e)}
            >
              <IoClose />
            </IconWraper>
          </div>
        )}

        <DatacardComponent
          title={recipe?.recipeId?.name}
          ingredients={joniIngredients(recipe?.defaultVersion?.ingredients)}
          category={recipe?.recipeId?.recipeBlendCategory?.name}
          ratings={recipe?.recipeId?.averageRating}
          noOfRatings={recipe?.recipeId?.numberOfRating}
          noOfComments={recipe?.recipeId?.numberOfRating}
          image={
            recipe?.defaultVersion?.selectedImage ||
            recipe?.recipeId?.image?.find((img) => img?.default)?.image ||
            recipe?.recipeId?.image?.[0]?.image ||
            ""
          }
          recipeId={recipe?.recipeId?._id}
          notes={recipe?.notes}
          addedToCompare={recipe?.addedToCompare}
          isCollectionIds={recipe?.userCollections}
          setOpenCollectionModal={setOpenCollectionModal}
          isMatch={recipe?.isMatch}
          postfixTitle={recipe?.defaultVersion?.postfixTitle}
          showMoreMenu={showMoreMenu}
          showOptionalEditIcon={showOptionalEditIcon}
          isImageOverlay={dragAndDrop}
          imageOverlayFunc={(image) => setCopyImage(image)}
          customMenu={customMenu}
          showMoreMenuAtHover={showMoreMenuAtHover}
          description={recipe?.defaultVersion?.description}
          recipeVersion={recipe?.versionCount}
          defaultVersionId={recipe?.defaultVersion?._id}
          updateDataFunc={updateCompareList}
          userId={recipe?.recipeId?.userId}
          versionHandler={handleToOpenVersionTray}
          footerMenuType={footerMenuType}
          updateDataAfterChangeDefaultVersion={
            updateDataAfterChangeDefaultVersion
          }
          isVersionSharable={recipe?.defaultVersion?.isVersionSharable}
          defaultVersion={recipe?.defaultVersion}
          brand={recipe?.recipeId?.brand}
          calorie={recipe?.defaultVersion?.calorie?.value}
          carbs={recipe?.defaultVersion?.gigl?.netCarbs}
          personalRating={recipe?.personalRating}
        />
        <div className={`${styles.dividerBox}`}>
          <SectionTitleWithIcon
            title="Ingredients"
            icon="/images/right-blender.svg"
          />
          <div className={`${styles.ingredientBox} y-scroll`}>
            {dragAndDrop ? (
              winReady ? (
                <Copyable
                  items={recipe?.defaultVersion?.ingredients}
                  addItem={addItem}
                  droppableId={`${id}`}
                />
              ) : null
            ) : (
              recipe?.defaultVersion?.ingredients?.map((item, index) => {
                const ingredientName = item?.ingredientId?.ingredientName;
                const selectedPortionName = item?.selectedPortion?.name;
                const selectedPortionQuantity = item?.selectedPortion?.quantity;
                return (
                  <p key={index} className={`${styles.singleIngredient}`}>
                    {`${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`}
                  </p>
                );
              })
            )}
          </div>
        </div>

        <div className={styles.dividerBox}>
          <SectionTitleWithIcon
            title="Nutrition"
            icon="/icons/chart-bar-light-green.svg"
          />

          <div className={`${styles.ingredientsDetails} `}>
            {winReady ? (
              nutritionDataLoading ? (
                <NutrationPanelSkeleton />
              ) : (
                <UpdatedRecursiveAccordian
                  dataObject={
                    nutritionData?.getNutrientsListAndGiGlByIngredients
                      ?.nutrients &&
                    JSON?.parse(
                      nutritionData?.getNutrientsListAndGiGlByIngredients
                        ?.nutrients,
                    )
                  }
                  showUser={false}
                  counter={1}
                />
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
