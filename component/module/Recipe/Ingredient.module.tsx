import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import CircularRotatingLoader from "../../../theme/loader/circularRotatingLoader.component";
import AddSharpIcon from "../../../public/icons/add_black_36dp.svg";
import RemoveSharpIcon from "../../../public/icons/remove_black_36dp.svg";
import DragIndicatorIcon from "../../../public/icons/drag_indicator_black_36dp.svg";
import classes from "../../../components/recipe/editRecipe/recipe_elements/ingredientList/ingredientList&Howto.module.scss";
import styles from "./Ingredient.module.scss";
import Combobox from "../../organisms/Forms/Combobox.component";
import Textfield from "../../organisms/Forms/Textfield.component";
import IconButton from "../../atoms/Button/IconButton.component";
import { FaSave, FaTimes } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Icon from "../../atoms/Icon/Icon.component";
import ButtonComponent from "../../../theme/button/button.component";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setRecipeIngredients,
  setSelectedIngredientsList,
} from "../../../redux/edit_recipe/editRecipeStates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShoppingSimple,
  faChartSimple,
  faCircleInfo,
  faClose,
  faPen,
  faTimes,
  faTrash,
} from "@fortawesome/pro-light-svg-icons";
import { useMutation } from "@apollo/client";
import SEARCH_IN_SCRAPPED_RECIPE_FROM_USER from "../../../gqlLib/parsing/mutation/searchInScrappedRecipeFromUser";
import notification from "../../../components/utility/reactToastifyNotification";
import { useDispatch } from "react-redux";
import Tooltip from "../../../theme/toolTip/CustomToolTip";

const defaultValues = {
  ingredientId: "",
  units: "",
  quantity: "",
  preparation: "",
  parsingText: "",
  parsingTextEdit: "",
};

const IngredientSection = (props) => {
  const {
    allIngredients,
    adjusterFunc,
    servingCounter,
    calculatedIngOz,
    handleOnDragEnd,
    ingredients,
    nutritionState,
    setNutritionState,
    setIngredientId,
    removeIngredient,
    ingredientAddingType = "parsing",
  } = props;
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  const [editIngredientId, setEditIngredientId] = useState("");

  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, []),
  });

  const onReset = () => {
    setShowAddIngredient(false);
    setEditIngredientId("");
    methods.reset(defaultValues);
  };
  return (
    <div className={classes.ingredients__main__card}>
      <div className={classes.headingDiv}>
        <div className={classes.basket__icon}>
          <Image
            src={"/icons/basket.svg"}
            alt="icon"
            width={"17px"}
            height={"15px"}
          />
        </div>
        <h5>Ingredient List</h5>
      </div>
      <div className={classes.blending__ingredients}>
        <div className={classes.servings}>
          <div className={classes.servings__adjuster}>
            <span className={classes.servings__adjuster__name}>Servings :</span>
            <div
              className={classes.servings__adjuster__icondiv}
              onClick={() => {
                adjusterFunc(servingCounter - 1);
              }}
            >
              <RemoveSharpIcon />
            </div>
            <span className={classes.servings__adjuster__score}>
              {servingCounter}
            </span>
            <div
              className={classes.servings__adjuster__icondiv}
              onClick={() => {
                adjusterFunc(servingCounter + 1);
              }}
            >
              <AddSharpIcon />
            </div>
          </div>
          <div className={classes.servings__size}>
            <span className={classes.servings__adjuster__name}>Volume :</span>
            <span className={classes.servings__size__score}>
              {calculatedIngOz}&nbsp;oz
            </span>
          </div>
          <div className={classes.servings__units}>
            <div>
              <span className={classes.servings__units__country}>Us</span>
              <span className={classes.servings__units__scale}>Metric</span>
            </div>
          </div>
        </div>
      </div>
      {ingredientAddingType === "parsing" ? (
        <ParseIngredient
          methods={methods}
          onReset={() => methods.reset(defaultValues)}
          inputName="parsingText"
        />
      ) : showAddIngredient ? (
        <AddToCartForm
          allIngredients={allIngredients}
          methods={methods}
          onReset={onReset}
        />
      ) : (
        <div className={styles.ingredient__add}>
          <ButtonComponent
            value="Add Ingredient"
            type="transparentHover"
            onClick={() => {
              onReset();
              setShowAddIngredient(true);
            }}
          />
        </div>
      )}
      <div className={classes.ingredients}>
        <DragDropContext
          onDragEnd={(result) => handleOnDragEnd(result, "ingredients")}
        >
          <Droppable droppableId="draggableIngredientList">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {ingredients ? (
                  ingredients?.map((elem, index) => {
                    // const orgIngredient = orgIngredients.find(
                    //   (ing) => ing.ingredientId._id === elem?._id,
                    // );
                    // if (!orgIngredient) return;
                    return (
                      <>
                        {ingredientAddingType === "parsing" &&
                        editIngredientId === elem._id ? (
                          <ParseIngredient
                            isEditMode
                            methods={methods}
                            onReset={onReset}
                            inputName="parsingTextEdit"
                            index={index}
                          />
                        ) : (
                          <Draggable
                            key={elem?.ingredientName + elem?._id || index}
                            draggableId={`${
                              elem?.ingredientName + elem?._id || index
                            }`}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                // className={`${
                                //   (elem?.ingredientStatus === "partial_ok" ||
                                //     elem?.ingredientStatus === "not_ok") &&
                                //   classes.ingredients__partial_ok
                                // }`}
                              >
                                <div className={classes.ingredients__item}>
                                  <div
                                    className={classes.ingredients__drag}
                                    {...provided.dragHandleProps}
                                  >
                                    <DragIndicatorIcon
                                      className={classes.ingredients__drag}
                                    />
                                  </div>

                                  <SingleIngredient
                                    {...{
                                      elem,
                                      setNutritionState,
                                      setIngredientId,
                                      setEditIngredientId,
                                      setShowAddIngredient,
                                      methods,
                                      removeIngredient,
                                      editIngredientId,
                                      onReset,
                                      allIngredients,
                                      nutritionState,
                                    }}
                                  />
                                </div>
                                {ingredientAddingType === "auto" &&
                                  editIngredientId === elem._id && (
                                    <AddToCartForm
                                      isEditMode
                                      methods={methods}
                                      onReset={onReset}
                                      allIngredients={allIngredients}
                                    />
                                  )}
                              </li>
                            )}
                          </Draggable>
                        )}
                      </>
                    );
                  })
                ) : (
                  <div style={{ margin: "30px 0px" }}>
                    <CircularRotatingLoader />
                  </div>
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

const ParseIngredient = (props) => {
  const {
    methods,
    onReset,
    isEditMode,
    inputName = "parsingText",
    index,
  } = props;
  const dispatch = useDispatch();
  const { selectedIngredientsList } = useAppSelector(
    (state) => state?.editRecipeReducer,
  );
  const [handleSearchInScrappedRecipeFromUser, { loading }] = useMutation(
    SEARCH_IN_SCRAPPED_RECIPE_FROM_USER,
  );

  // Enter key was pressed
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      methods.handleSubmit(onSubmit)();
    }
  };

  // add new ingredient to ingredient list
  const addNewIngredientToIngredientList = (ing) => {
    let isIngredientExistIndex = 0;
    const isIngredientExist = selectedIngredientsList?.find((item, index) => {
      if (item?._id === ing?._id) {
        isIngredientExistIndex = index;
        return item?._id === ing?._id;
      }
    });
    if (isIngredientExist && isIngredientExistIndex) {
      const items = [...selectedIngredientsList];
      items.splice(isIngredientExistIndex, 1, ing);
      dispatch(setSelectedIngredientsList(items));
    } else {
      dispatch(setSelectedIngredientsList([ing, ...selectedIngredientsList]));
    }
  };

  // submit data
  const onSubmit = async (data) => {
    const { parsingText = "", parsingTextEdit = "" } = data;
    const recipeIngredients = isEditMode ? parsingTextEdit : parsingText;
    if (!recipeIngredients) {
      notification("warning", "Please enter text");
      return;
    }
    try {
      const { data } = await handleSearchInScrappedRecipeFromUser({
        variables: { recipeIngredients, isClient: true },
      });

      const { blendIngredients, errorIngredients, notFoundIndexes } =
        data?.searchInScrappedRecipeFromUser;

      if (notFoundIndexes?.length) {
        let partialError = errorIngredients[notFoundIndexes?.length - 1 || 0];
        partialError = {
          ...partialError,
          errorIngredientId: partialError?.ingredientId,
          ingredientStatus: "partial_ok",
          _id: partialError?.qaId,
          ingredientName: partialError?.errorString,
        };

        if (isEditMode && index !== undefined) {
          const items = [...selectedIngredientsList];
          items.splice(index, 1, partialError);
          dispatch(setSelectedIngredientsList(items));
        } else {
          addNewIngredientToIngredientList(partialError);
        }

        onReset();
        notification("warning", "data not found at database");
        return;
      }

      if (blendIngredients.length) {
        const [
          {
            ingredientId,
            selectedPortionName,
            weightInGram,
            db_name,
            featuredImage,
            quantity,
          },
        ] = blendIngredients;

        const value = {
          weightInGram,
          selectedPortion: {
            name: selectedPortionName,
            quantity: quantity,
            gram: parseInt(weightInGram),
          },
          ingredientId: {
            _id: ingredientId,
            ingredientName: db_name,
            featuredImage: featuredImage || "",
            images: featuredImage || "",
          },
          _id: ingredientId,
          ingredientName: db_name,
          featuredImage: featuredImage,
          ingredientStatus: "ok",
        };

        if (isEditMode && index !== undefined) {
          const items = [...selectedIngredientsList];
          items.splice(index, 1, value);
          dispatch(setSelectedIngredientsList(items));
        } else {
          addNewIngredientToIngredientList(value);
        }
        onReset();
      }
    } catch (error) {
      notification("error", "No data found");
      const obj = {
        errorString: recipeIngredients,
        ingredientStatus: "not_ok",
        _id: recipeIngredients + index,
        ingredientName: recipeIngredients,
      };
      if (isEditMode && index !== undefined) {
        const items = [...selectedIngredientsList];
        items.splice(index, 1, obj);
        dispatch(setSelectedIngredientsList(items));
      } else {
        addNewIngredientToIngredientList(obj);
      }
      onReset();
    }
  };

  useEffect(() => {
    if (isEditMode) {
      const field: HTMLInputElement = document.querySelector(
        `input[name=${inputName}]`,
      );
      if (field) field.focus();
    }
  }, [inputName, isEditMode]);
  return (
    <div
      className={`${styles.addToCart} ${
        isEditMode ? styles["addToCart--edit"] : styles["addToCart--top"]
      }`}
    >
      <FormProvider {...methods}>
        <div className={`${styles.inputWrapper} d-flex ai-center jc-center`}>
          <Textfield
            name={inputName}
            placeholder={isEditMode ? "Edit ingredient" : "Add ingredient"}
            onKeyDown={(e) => handleKeyPress(e)}
          />
          {loading ? (
            <CircularRotatingLoader
              color="gray"
              style={{ margin: "auto 1rem" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faTimes}
              className={`${styles.icon} ml-10 mr-10 pointer`}
              onClick={onReset}
            />
          )}
        </div>
      </FormProvider>
    </div>
  );
};

const AddToCartForm = (props) => {
  const { methods, isEditMode, allIngredients, onReset } = props;

  const dispatch = useAppDispatch();

  const ingredientList = useMemo(() => {
    return allIngredients.map((ingredient) => ({
      value: ingredient._id,
      label: ingredient.ingredientName,
    }));
  }, [allIngredients]);

  const ingredientId = useWatch({
    control: methods.control,
    name: "ingredientId",
  });

  const [ingredient, units] = useMemo(() => {
    const ingredient = allIngredients.find((elem) => elem._id === ingredientId);
    const units = ingredient
      ? ingredient.portions.map((portion) => portion.measurement)
      : [];
    return [ingredient, units];
  }, [allIngredients, ingredientId]);

  const onSubmit = (data) => {
    const portion = ingredient?.portions.find(
      (portion) => portion?.measurement === data.units,
    );
    const weightInGram =
      parseInt(portion?.meausermentWeight) * parseInt(data.quantity);
    const value = {
      ...ingredient,
      weightInGram,
      selectedPortion: {
        name: data?.units,
        quantity: data?.quantity,
        gram: parseInt(portion?.meausermentWeight),
      },
      ingredientId: {
        _id: ingredient?._id,
        ingredientName: ingredient?.ingredientName,
        featuredImage: ingredient?.featuredImage,
        images: ingredient?.images,
      },
      ingredientStatus: "ok",
    };
    //setSelectedIngredientsList
    dispatch(setRecipeIngredients(value));
    onReset();
  };

  return (
    <div
      className={`${styles.addToCart} ${
        isEditMode ? styles["addToCart--edit"] : styles["addToCart--top"]
      }`}
    >
      <div className={styles.addToCart__form}>
        <FormProvider {...methods}>
          <div className="row ai-center">
            <div className="col-4">
              <Combobox
                placeholder="Ingredient"
                name="ingredientId"
                options={ingredientList}
              />
            </div>
            <div className="col-3">
              <Combobox
                placeholder="Units"
                name="units"
                options={units}
                disabled={!ingredientId}
              />
            </div>
            <div className="col-2">
              <Textfield
                name="quantity"
                placeholder="Quantity"
                disabled={!ingredientId}
              />
            </div>
            <div className="col-3">
              <Textfield
                name="preparation"
                placeholder="Preparation Time"
                disabled={!ingredientId}
              />
            </div>
          </div>
        </FormProvider>
      </div>
      <div className={styles.addToCart__buttons}>
        <IconButton
          variant="white"
          size="small"
          className="mr-10"
          disabled={!ingredientId}
          onClick={methods.handleSubmit(onSubmit)}
        >
          <FaSave />
        </IconButton>
        <IconButton variant="white" size="small" onClick={onReset}>
          <FaTimes />
        </IconButton>
      </div>
    </div>
  );
};

const SingleIngredient = ({
  elem,
  setNutritionState,
  setIngredientId,
  setEditIngredientId,
  setShowAddIngredient,
  methods,
  removeIngredient,
  editIngredientId,
  onReset,
  allIngredients,
  nutritionState,
}) => {
  const windowScrollToZero = (elem = {}) => {
    window.scrollBy(0, 0);
    setNutritionState(elem);
  };

  const editIngredient = (elem) => {
    setEditIngredientId(elem?._id);
    setShowAddIngredient(false);
    let resetIngredient;
    if (elem.hasOwnProperty("selectedPortion")) {
      //! Preparation needs to be handled here
      resetIngredient = {
        units: elem?.selectedPortion?.name,
        quantity: elem?.selectedPortion?.quantity,
        preparation: 0,
        parsingTextEdit: `${Math?.round(elem.selectedPortion?.quantity || 1)} ${
          elem.selectedPortion?.name ||
          elem?.portions?.[0]?.measurement ||
          "cup"
        } ${elem.ingredientName}`,
      };
    } else {
      const value = elem?.portions?.find((item) => item.default);

      resetIngredient = {
        ...resetIngredient,
        units: value?.measurement || elem?.portions?.[0]?.measurement || "cup",
        quantity: 1,
        preparation: 0,
        parsingTextEdit: elem?.errorString,
      };
    }

    methods.reset({
      ingredientId: elem?._id,
      ...resetIngredient,
    });
  };
  return (
    <>
      <div className={`${classes.ingredients__icons}`}>
        {elem?.ingredientStatus === "ok" ? (
          elem.featuredImage || elem.images?.[0] ? (
            <Image
              src={
                elem.featuredImage || elem.images?.[0] || "/food/Dandelion.png"
              }
              alt="Picture will load soon"
              objectFit="contain"
              layout="fill"
            />
          ) : (
            <FontAwesomeIcon icon={faBasketShoppingSimple} />
          )
        ) : (
          <FontAwesomeIcon icon={faBasketShoppingSimple} />
        )}
      </div>
      {/* to create ingredients lists  */}
      {elem?.ingredientStatus === "ok" ? (
        <>
          <div className={classes.ingredients__text}>
            <span>
              {Math?.round(elem.selectedPortion?.quantity || 1)}
              &nbsp;
            </span>
            <span>
              {elem.selectedPortion?.name ||
                elem?.portions?.[0]?.measurement ||
                "cup"}
              &nbsp;
            </span>
            <span
              className={`${classes.ingredients__text__highlighted} ${
                elem._id === nutritionState?._id && "activeColorPrimary"
              }`}
              onClick={() =>
                windowScrollToZero(elem._id === nutritionState?._id ? {} : elem)
              }
            >
              {elem?.ingredientName}
            </span>
            {elem.comment && <span>{`, ${elem.comment}`}</span>}
          </div>
        </>
      ) : (
        <span
          className={`${classes.ingredients__text} ${
            elem?.ingredientStatus === "not_ok" &&
            classes["ingredients__text--not_ok"]
          } ${
            elem?.ingredientStatus === "partial_ok" &&
            classes["ingredients__text--partial_ok"]
          }`}
        >
          {elem?.errorString}
          &nbsp;
        </span>
      )}

      <div className={`${classes.ingredients__iconTray}`}>
        {elem?.ingredientStatus === "ok" && (
          <>
            <Tooltip direction="top" content="Wiki">
              <FontAwesomeIcon
                icon={faCircleInfo}
                className={classes.ingredients__iconTray__icons}
                onClick={() => setIngredientId(elem._id)}
              />
            </Tooltip>
            <Tooltip direction="top" content="Nutation">
              <FontAwesomeIcon
                icon={faChartSimple}
                className={`${classes.ingredients__iconTray__icons} ${
                  elem._id === nutritionState?._id && "activeColorPrimary"
                }`}
                onClick={() =>
                  windowScrollToZero(
                    elem._id === nutritionState?._id ? {} : elem,
                  )
                }
              />
            </Tooltip>
          </>
        )}
        <Tooltip direction="top" content="Edit">
          <FontAwesomeIcon
            icon={faPen}
            className={`${classes.ingredients__iconTray__icons}
            `}
            onClick={() => editIngredient(elem)}
          />
        </Tooltip>
        <Tooltip direction="top" content="Remove">
          <FontAwesomeIcon
            icon={faTrash}
            className={`${classes.ingredients__iconTray__icons} 
            `}
            onClick={() => removeIngredient(elem?._id)}
          />
        </Tooltip>
      </div>
    </>
  );
};

export default IngredientSection;
