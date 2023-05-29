/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import styles from "./ingredientList&Howto.module.scss";
import Image from "next/image";
import AddSharpIcon from "../../../../../public/icons/add_black_36dp.svg";
import RemoveSharpIcon from "../../../../../public/icons/remove_black_36dp.svg";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import DragIndicatorIcon from "../../../../../public/icons/drag_indicator_black_36dp.svg";
import ModeEditOutlineOutlinedIcon from "../../../../../public/icons/mode_edit_black_36dp.svg";
import {
  setIngredientArrayForNutrition,
  setRecipeInstruction,
  setSelectedIngredientsList,
} from "../../../../../redux/edit_recipe/editRecipeStates";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CircularRotatingLoader from "../../../../../theme/loader/circularRotatingLoader.component";
import { MdOutlineDelete, MdOutlineInfo } from "react-icons/md";
import { BiBarChart } from "react-icons/bi";
import useGetDefaultPortionOfnutration from "../../../../../customHooks/useGetDefaultPortionOfNutration";
import IngredientSection from "../../../../../component/module/Recipe/Ingredient.module";
import { IngredientAddingType } from "../../../../../type/recipeEditType";

type IngredientListPorps = {
  recipeInstructions?: string[];
  allIngredients?: any[];
  adjusterFunc: any;
  nutritionState: object;
  setNutritionState: any;
  calculatedIngOz?: number;
  ingredientAddingType?: IngredientAddingType;
};

const IngredientList = ({
  recipeInstructions,
  allIngredients,
  adjusterFunc,
  nutritionState,
  setNutritionState,
  calculatedIngOz = 0,
  ingredientAddingType = "parsing",
}: IngredientListPorps) => {
  const dispatch = useAppDispatch();

  const [selectedElementId, setSelectedElementId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [inputIngredientValue, setInputIngredientValue] = useState("");
  const [suggestedIngredients, setSuggestedIngredients] = useState([]);
  const [ingredientId, setIngredientId] = useState("");
  useGetDefaultPortionOfnutration(ingredientId);

  const selectedIngredientsList = useAppSelector(
    (state) => state?.editRecipeReducer?.selectedIngredientsList,
  );

  const removeIngredient = (id) => {
    let updated_list = selectedIngredientsList?.filter((elem) => {
      return id !== elem?._id;
    });
    dispatch(setSelectedIngredientsList(updated_list));
  };

  const recipeIngredientsOnKeyDown = (e) => {
    let modifiedArray = [];

    if (e.key === "Enter") {
      if (selectedIngredientsList.length === 0) {
        modifiedArray = [...suggestedIngredients];
      } else {
        modifiedArray = Array.from(
          new Set([...selectedIngredientsList, ...suggestedIngredients]),
        );
      }
      dispatch(setSelectedIngredientsList(modifiedArray));
      setInputIngredientValue("");
      setSuggestedIngredients([]);
    }
  };

  const howToState = useAppSelector(
    (state) => state?.editRecipeReducer?.recipeInstruction,
  );

  const servingCounter = useAppSelector(
    (state) => state.editRecipeReducer.servingCounter,
  );

  useEffect(() => {
    let howList = [];
    recipeInstructions?.forEach((elem, index) => {
      howList = [...howList, { id: Date.now() + index + elem, step: elem }];
    });
    dispatch(setRecipeInstruction(howList));
  }, [recipeInstructions]);

  const HowToSubmitHandler = (event) => {
    let howList = [];
    if (event.key === "Enter") {
      if (!event.target.value || /^\s*$/.test(event.target.value)) {
        return;
      }

      if (selectedElementId) {
        let elemIndex = howToState.findIndex(
          (elem) => elem.id === selectedElementId,
        );
        howList = [...howToState];
        howList[elemIndex] = { id: selectedElementId, step: inputValue };
      } else {
        howList = [
          ...howToState,
          {
            id: Date.now() + Math.floor(Math.random() * 100),
            step: event.target.value,
          },
        ];
      }
      dispatch(setRecipeInstruction(howList));
      setSelectedElementId(null);
      setInputValue("");
    }
  };

  const editStep = (id) => {
    document.getElementById("myTextField").focus();
    setSelectedElementId(id);
    let newEditStep = howToState.find((elem) => {
      return elem.id === id;
    });
    setInputValue(newEditStep.step);
  };

  const removeStep = (id) => {
    let updated_list = howToState?.filter((elem) => {
      return id !== elem.id;
    });
    dispatch(setRecipeInstruction(updated_list));
  };

  const inputTagValueHandler = (e) => {
    let tempValue = e.target.value;
    setInputValue(tempValue);
  };

  const handleOnDragEnd = (result, type) => {
    if (!result) return;

    if (type === "ingredients") {
      const items = [...selectedIngredientsList];
      const [reOrderedItem] = items?.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reOrderedItem);
      dispatch(setSelectedIngredientsList(items));
    }

    if (type === "steps") {
      const items = [...howToState];
      const [reOrderedItem] = items?.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reOrderedItem);
      dispatch(setRecipeInstruction(items));
    }
  };

  return (
    <Fragment>
      <IngredientSection
        allIngredients={allIngredients}
        adjusterFunc={adjusterFunc}
        servingCounter={servingCounter}
        calculatedIngOz={calculatedIngOz}
        handleOnDragEnd={handleOnDragEnd}
        ingredients={selectedIngredientsList}
        nutritionState={nutritionState}
        setNutritionState={setNutritionState}
        setIngredientId={setIngredientId}
        removeIngredient={removeIngredient}
        recipeIngredientsOnKeyDown={recipeIngredientsOnKeyDown}
        ingredientAddingType={ingredientAddingType}
      />
      <div className={styles.how__to}>
        <h4 className={styles.how__to__heading}>
          <div className={styles.how__to__icon}>
            <Image
              src={"/icons/chef.svg"}
              alt="Picture will load soon"
              objectFit="contain"
              layout="fill"
            />
          </div>
          <span className={styles.how__to__headingText}>How to</span>
        </h4>
        <div className={styles.how__to__steps}>
          <DragDropContext
            onDragEnd={(result) => {
              handleOnDragEnd(result, "steps");
            }}
          >
            <Droppable droppableId="draggableIngredientList">
              {(provided) => (
                <ol {...provided.droppableProps} ref={provided.innerRef}>
                  {howToState ? (
                    howToState?.map((elem, index) => {
                      return (
                        <Draggable
                          key={elem.step}
                          draggableId={elem.step}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              className={styles.how__to__steps__li}
                              key={elem.id}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                            >
                              <div className={styles.how__to__steps__drag}>
                                <DragIndicatorIcon
                                  className={styles.how__to__steps__drag}
                                />
                              </div>
                              {elem.step}
                              <span
                                className={styles.how__to__steps__li__edit}
                                onClick={() => editStep(elem.id)}
                              >
                                <ModeEditOutlineOutlinedIcon />
                              </span>
                              <span
                                className={styles.how__to__steps__li__bin}
                                onClick={() => removeStep(elem.id)}
                              >
                                <div
                                  className={
                                    styles.how__to__steps__li__bin__imgDiv
                                  }
                                >
                                  <Image
                                    src={"/icons/noun_Delete_1447966.svg"}
                                    alt=""
                                    layout="fill"
                                    objectFit="contain"
                                  />
                                </div>
                              </span>
                            </li>
                          )}
                        </Draggable>
                      );
                    })
                  ) : (
                    <div style={{ margin: "30px 0px" }}>
                      <CircularRotatingLoader />
                    </div>
                  )}
                  <div style={{ listStyle: "none" }}>
                    {provided.placeholder}
                  </div>
                </ol>
              )}
            </Droppable>
          </DragDropContext>

          <div className={styles.how__to__searchBar}>
            <span>
              <input
                onKeyDown={(e) => {
                  HowToSubmitHandler(e);
                }}
                value={inputValue}
                onChange={(e) => {
                  inputTagValueHandler(e);
                }}
                type="text"
                name="recipe elements"
                id="myTextField"
                placeholder="Type Your Instructions here..."
              />
            </span>
          </div>
        </div>
      </div>
      {/* isFetching */}
      {/* <div className={styles.save__Recipe}>
        {isFetching ? (
          <div className={styles.save__Recipe__button}>
            <ButtonComponent
              type={"primary"}
              style={{}}
              fullWidth={true}
              value="Saving... ."
            />
          </div>
        ) : (
          <div
            className={styles.save__Recipe__button}
            onClick={() => editARecipeFunction()}
          >
            <ButtonComponent
              type={"primary"}
              style={{}}
              fullWidth={true}
              value="Save Recipe"
            />
          </div>
        )}
      </div> */}
    </Fragment>
  );
};

export default IngredientList;

const data = {
  __typename: "BlendIngredientData",
  _id: "620b6bce40d3f19b558f0bc1",
  ingredientName: "Amaranth leaves",
  category: "Leafy",
  blendStatus: "Active",
  classType: "Class - 1",
  description: "Amaranth leaves, raw",
  images: [],
  featuredImage: "https://blending.s3.us-east-1.amazonaws.com/7826404.png",
  portions: [
    {
      __typename: "BlendPortion",
      measurement: "cup",
      measurement2: null,
      meausermentWeight: "28",
      default: true,
    },
    {
      __typename: "BlendPortion",
      measurement: "leaf",
      measurement2: null,
      meausermentWeight: "14",
      default: false,
    },
    {
      __typename: "BlendPortion",
      measurement: "mug",
      measurement2: null,
      meausermentWeight: "100",
      default: false,
    },
  ],
};
