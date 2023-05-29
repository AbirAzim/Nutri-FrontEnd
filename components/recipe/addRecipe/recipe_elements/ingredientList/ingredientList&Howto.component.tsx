/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import styles from "./ingredientList&Howto.module.scss";
import Image from "next/image";
import AddSharpIcon from "../../../../../public/icons/add_black_36dp.svg";
import RemoveSharpIcon from "../../../../../public/icons/remove_black_36dp.svg";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import DragIndicatorIcon from "../../../../../public/icons/drag_indicator_black_36dp.svg";
import ModeEditOutlineOutlinedIcon from "../../../../../public/icons/mode_edit_black_36dp.svg";
import { useLazyQuery } from "@apollo/client";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CircularRotatingLoader from "../../../../../theme/loader/circularRotatingLoader.component";
import { MdOutlineDelete, MdOutlineInfo } from "react-icons/md";
import { BiBarChart } from "react-icons/bi";
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS from "../../../../../gqlLib/ingredient/query/filterIngredientByCategroyAndClass";
import { setAllIngredients } from "../../../../../redux/slices/ingredientsSlice";
import useOnClickOutside from "../../../../utility/useOnClickOutside";
import InputComponent from "../../../../../theme/input/input.component";

type IngredientListPorps = {
  adjusterFunc?: (val: number) => void;
  counter?: number;
  calculatedIngOz?: number;
  selectedIngredientsList?: any[];
  setSelectedIngredientsList?: Dispatch<SetStateAction<any[]>>;
  nutritionState?: object;
  setNutritionState?: Dispatch<SetStateAction<object>>;
  checkActive?: (id: string) => boolean;
  howToState?: any[];
  setHowToSteps?: React.Dispatch<React.SetStateAction<any[]>>;
};

const IngredientList = ({
  adjusterFunc = () => {},
  counter = 1,
  calculatedIngOz = 0,
  selectedIngredientsList = [],
  setSelectedIngredientsList = () => {},
  nutritionState = {},
  setNutritionState = () => {},
  checkActive = (id: string) => false,
  howToState = [],
  setHowToSteps = () => {},
}: IngredientListPorps) => {
  const dispatch = useAppDispatch();

  const [inputValueIngredient, setInputValueIngredient] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedElementId, setSelectedElementId] = useState(null);
  const { allIngredients } = useAppSelector((state) => state?.ingredients);
  const [searchIngredientData, setSearchIngredientData] = useState<any[]>([]);
  const [openIngredientList, setOpenIngredientList] = useState(false);
  const isMounted = useRef(false);
  const ingList = useRef(null);
  useOnClickOutside(ingList, () => setOpenIngredientList(false));
  const [filterIngredientByCategroyAndClass] = useLazyQuery(
    FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS,
  );

  const handleIngredientClick = (ingredient: any, present: boolean) => {
    if (!present) {
      setSelectedIngredientsList((pre) => [...pre, ingredient]);
      setInputValueIngredient("");
    } else {
      setInputValueIngredient("");
    }
  };

  const removeIngredient = (id) => {
    setSelectedIngredientsList((pre) => [
      ...pre?.filter((ele) => ele?._id !== id),
    ]);
  };

  const handleOnDragEnd = (result, type) => {
    if (!result) return;

    if (type === "ingredients") {
      const items = [...selectedIngredientsList];
      const [reOrderedItem] = items?.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reOrderedItem);
      setSelectedIngredientsList(items);
    }

    if (type === "steps") {
      const items = [...howToState];
      const [reOrderedItem] = items?.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reOrderedItem);
      setHowToSteps(items);
    }
  };

  const fetchFilterIngredientByCategroyAndClass = async () => {
    try {
      const { data } = await filterIngredientByCategroyAndClass({
        variables: {
          data: {
            ingredientCategory: "All",
            IngredientClass: 1,
          },
        },
      });

      dispatch(setAllIngredients(data?.filterIngredientByCategoryAndClass));
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    if (!allIngredients?.length) {
      fetchFilterIngredientByCategroyAndClass();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const HowToSubmitHandler = (event) => {
    let howList = [];
    if (event.key === "Enter") {
      if (!event.target.value || /^\s*$/.test(event.target.value)) {
        return;
      }

      if (editMode === true) {
        setHowToSteps(
          howToState.map((elem) => {
            if (elem.id === selectedElementId) {
              return { ...elem, step: inputValue };
            }
            return elem;
          }),
        ),
          setEditMode(false);
        setInputValue("");
        setSelectedElementId(null);
      } else {
        howList = [
          ...howToState,
          { id: new Date().getTime().toString(), step: inputValue },
        ];
        setHowToSteps(howList);
        setInputValue("");
      }
    }
  };

  const removeStep = (id) => {
    let updated_list = howToState?.filter((elem) => {
      return id !== elem.id;
    });
    setHowToSteps(updated_list);
  };

  const editStep = (id) => {
    let newEditStep = howToState.find((elem) => {
      document.getElementById("myTextField").focus();

      return elem.id === id;
    });
    setEditMode(true);
    setInputValue(newEditStep.step);
    setSelectedElementId(id);
  };

  const inputTagValueHandler = (e) => {
    let tempValue = e.target.value;
    setInputValue(tempValue);
  };

  useEffect(() => {
    if (searchIngredientData?.length) {
      setOpenIngredientList(true);
    } else {
      setOpenIngredientList(false);
    }
  }, [searchIngredientData]);

  useEffect(() => {
    if (isMounted.current) {
      if (inputValueIngredient === "") {
        setSearchIngredientData([]);
      } else {
        const filter = allIngredients?.filter((item) =>
          //@ts-ignore
          item?.ingredientName
            ?.toLowerCase()
            ?.includes(inputValueIngredient?.toLowerCase()),
        );
        setSearchIngredientData(filter);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValueIngredient]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className={styles.mainCard}>
      <div className={styles.ingredients__main__card}>
        <div className={styles.headingDiv}>
          <div className={styles.basket__icon}>
            <Image
              src={"/icons/basket.svg"}
              alt="icon"
              width={"17px"}
              height={"15px"}
              className={styles.original_arrow}
            />
          </div>
          <h5>Ingredients</h5>
        </div>
        <div className={styles.blending__ingredients}>
          <div className={styles.servings}>
            <div className={styles.servings__adjuster}>
              <span className={styles.servings__adjuster__name}>
                Servings :
              </span>
              <div
                className={styles.servings__adjuster__icondiv}
                onClick={() => {
                  adjusterFunc(counter - 1);
                }}
              >
                <RemoveSharpIcon />
              </div>
              <span className={styles.servings__adjuster__score}>
                {counter}
              </span>
              <div
                className={styles.servings__adjuster__icondiv}
                onClick={() => {
                  adjusterFunc(counter + 1);
                }}
              >
                <AddSharpIcon />
              </div>
            </div>
            <div className={styles.servings__size}>
              <span className={styles.servings__adjuster__name}>
                Servings Size :
              </span>
              <span className={styles.servings__size__score}>
                {calculatedIngOz}&nbsp;oz
              </span>
            </div>
            <div className={styles.servings__units}>
              <div className={styles.servings__units__active}>
                <span className={styles.servings__units__country}>Us</span>
                <span className={styles.servings__units__scale}>Metric</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ingredients}>
          <DragDropContext
            onDragEnd={(result) => handleOnDragEnd(result, "ingredients")}
          >
            <Droppable droppableId="draggableIngredientList">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {selectedIngredientsList ? (
                    selectedIngredientsList?.map((elem, index) => {
                      return (
                        <Draggable
                          key={elem.ingredientName + elem?._id}
                          draggableId={elem.ingredientName + elem?._id}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              className={styles.ingredients__li}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <div
                                className={styles.ingredients__drag}
                                {...provided.dragHandleProps}
                              >
                                <DragIndicatorIcon
                                  className={styles.ingredients__drag}
                                />
                              </div>
                              <div className={styles.ingredients__icons}>
                                {elem.featuredImage || elem.images?.length ? (
                                  <Image
                                    src={elem.featuredImage || elem.images[0]}
                                    alt="Picture will load soon"
                                    objectFit="contain"
                                    layout="fill"
                                  />
                                ) : (
                                  <Image
                                    src={"/food/Dandelion.png"}
                                    alt="Picture will load soon"
                                    objectFit="contain"
                                    layout="fill"
                                  />
                                )}
                              </div>
                              {/* to create ingredients lists  */}
                              <div className={styles.ingredients__text}>
                                <span>1 &nbsp;</span>
                                <span>
                                  {elem.portions[0].measurement ===
                                  "Quantity not specified"
                                    ? ""
                                    : elem.portions[0].measurement}
                                  &nbsp;
                                </span>
                                {
                                  //@ts-ignore
                                  elem._id === nutritionState?._id ? (
                                    <span
                                      className={`${styles.ingredients__text__highlighted} ${styles.activeIng}`}
                                      onClick={() => {
                                        setNutritionState({});
                                      }}
                                    >
                                      {elem.ingredientName}
                                    </span>
                                  ) : (
                                    <span
                                      className={
                                        styles.ingredients__text__highlighted
                                      }
                                      onClick={() => {
                                        setNutritionState(elem);
                                      }}
                                    >
                                      {elem.ingredientName}
                                    </span>
                                  )
                                }
                              </div>
                              {/* <span
                                className={styles.ingredients__edit}
                                // onClick={() => editIngredient(elem.id)}
                              ></span> */}

                              <div
                                className={styles.ingredients__iconTray}
                                style={
                                  // @ts-ignore
                                  elem._id === nutritionState?._id
                                    ? { display: "flex" }
                                    : {}
                                }
                              >
                                <MdOutlineInfo
                                  className={
                                    styles.ingredients__iconTray__icons
                                  }
                                  // onClick={() => setIngredientId(elem._id)}
                                />

                                {
                                  //@ts-ignore
                                  elem._id === nutritionState?._id ? (
                                    <BiBarChart
                                      className={`${styles.ingredients__iconTray__icons} ${styles.activeIng}`}
                                      onClick={() => {
                                        setNutritionState({});
                                      }}
                                    />
                                  ) : (
                                    <BiBarChart
                                      className={
                                        styles.ingredients__iconTray__icons
                                      }
                                      onClick={() => {
                                        setNutritionState(elem);
                                      }}
                                    />
                                  )
                                }
                                <MdOutlineDelete
                                  className={
                                    styles.ingredients__iconTray__icons
                                  }
                                  onClick={() => removeIngredient(elem?._id)}
                                />
                              </div>
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
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>

          <InputComponent
            borderSecondary={true} // onKeyDown={(e) => {
            //   recipeIngredientsOnKeyDown(e);
            // }}
            value={inputValueIngredient}
            onChange={(e) => setInputValueIngredient(e?.target?.value)}
            type="text"
            name="recipe elements"
            id=""
            placeholder="Search ingredient"
          />
        </div>
        <div className={styles.suggestedContainer} ref={ingList}>
          <div
            className={`${styles.suggested} y-scroll`}
            style={
              openIngredientList ? { display: "block" } : { display: "none" }
            }
          >
            <ul className={styles.suggested__ul}>
              {searchIngredientData?.map((elem) => {
                return (
                  <li
                    key={elem?._id}
                    className={styles.suggested__li}
                    onClick={() =>
                      handleIngredientClick(elem, checkActive(elem?._id))
                    }
                  >
                    {elem.featuredImage !== null ? (
                      <div className={styles.ingredientImg}>
                        <Image
                          src={elem.featuredImage}
                          alt="Picture will load soon"
                          objectFit="contain"
                          width={20}
                          height={20}
                        />
                      </div>
                    ) : (
                      <div className={styles.ingredientImg}>
                        <Image
                          src={"/food/Dandelion.png"}
                          alt="Picture will load soon"
                          objectFit="contain"
                          width={20}
                          height={20}
                          className={styles.ingredientImg}
                        />
                      </div>
                    )}

                    {elem.ingredientName}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
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
        <div>
          <div className={styles.how__to__steps}>
            <DragDropContext
              onDragEnd={(result) => handleOnDragEnd(result, "steps")}
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
          </div>
          <InputComponent
            borderSecondary={true}
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
        </div>
      </div>
    </div>
  );
};
export default IngredientList;
