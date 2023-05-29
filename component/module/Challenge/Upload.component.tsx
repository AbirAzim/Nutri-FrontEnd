import React, {
  forwardRef,
  useState,
  useMemo,
  useImperativeHandle,
  Fragment,
  useEffect,
} from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { FormProvider } from "react-hook-form";
import DatePicker from "react-datepicker";

import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_RXFACT,
} from "../../../graphql/Ingredients";
import { GET_BLEND_CATEGORY } from "../../../graphql/Recipe";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Combobox from "../../organisms/Forms/Combobox.component";
import Textarea from "../../organisms/Forms/Textarea.component";
import Textfield from "../../organisms/Forms/Textfield.component";
import Upload from "../../organisms/Upload/Upload.component";
import styles from "./Upload.module.scss";
import Publish from "../../../helpers/Publish";
import {
  addIngredient,
  deleteIngredient,
  setShowPostForm,
  resetForm,
  setPostDate,
} from "../../../redux/slices/Challenge.slice";
import { setShowPanel } from "../../../redux/slices/Ui.slice";
import useImage from "../../../hooks/useImage";
import {
  useAddChallengePost,
  useChallengeForm,
  useEditChallengePost,
} from "../../../hooks/modules/Challenge/useChallengePost";
import Icon from "../../atoms/Icon/Icon.component";
import {
  faBasketShopping,
  faCalendar,
  faNotebook,
} from "@fortawesome/pro-regular-svg-icons";
import {
  faCircleInfo,
  faPen,
  faTrash,
  faChartSimple,
} from "@fortawesome/pro-light-svg-icons";
import { addDays, format, isToday, isTomorrow, isYesterday } from "date-fns";
import { UTCDate } from "../../../helpers/Date";

const UploadCard = forwardRef((props: any, ref) => {
  const { startDate, endDate, elementRef } = props;
  const { images, setImages, postImages: uploadImages } = useImage([]);
  const [serving, setServing] = useState(1);

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const {
    isEditMode,
    id,
    docId,
    title,
    ingredients,
    startDate: postDate,
    images: stateImages,
  } = useAppSelector((state) => state.challenge.post);

  const { data } = useQuery(GET_BLEND_CATEGORY);
  const { methods, onReset } = useChallengeForm(setImages);
  const [addPost, addState] = useAddChallengePost(userId);
  const [editPost, editState] = useEditChallengePost(userId);

  useImperativeHandle(ref, () => ({
    onChallengePost() {
      methods.handleSubmit(handleSubmit)();
    },
  }));

  const closeForm = () => {
    dispatch(setShowPostForm(false));
    onReset();
    dispatch(resetForm());
    setImages([]);
    setServing(1);
    dispatch(setShowPanel({ name: "RXPanel", show: false }));
  };

  useEffect(() => {
    setImages(stateImages);
  }, [setImages, stateImages]);

  const handleSubmit = async (data) => {
    const images = await uploadImages();
    const post: any = {
      memberId: userId,
      assignDate: postDate,
      post: {
        images,
        name: data.recipeTitle,
        recipeBlendCategory: data.category,
        note: data.note,
        servings: serving,
        servingSize: 16,
        ingredients: ingredients.map((ing) => ({
          ingredientId: ing?.ingredientId?._id,
          selectedPortionName: ing?.selectedPortion?.name,
          weightInGram: ing?.selectedPortion?.gram,
        })),
      },
    };
    if (isEditMode) {
      post.post._id = id;
      post.post.docId = docId;
    }
    await Publish({
      mutate: isEditMode ? editPost : addPost,
      variables: {
        data: post,
      },
      state: isEditMode ? editState : addState,
      load: "Submitting post",
      success: "Submitted Post Successfully",
      onSuccess: closeForm,
      onError: () => {
        setImages([]);
      },
    });
  };

  return (
    <div className={styles.mainContainer} ref={elementRef}>
      <FormProvider {...methods}>
        <div className="row mt-20">
          <div className="col-4">
            <DateSelector
              activeDate={postDate}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div className="col-8">
            <Textfield
              placeholder="Description"
              name="recipeTitle"
              defaultValue={title}
              className={styles.recipe__title}
            />
          </div>
        </div>
        <div className="mt-20">
          <Upload multiple imageState={[images, setImages]} />
        </div>
        <Summary ingredients={ingredients} />
        <div className="row mt-30">
          <div className="col-12">
            <h5 className={styles.headingText}>
              <Icon size="2.5rem" fontName={faBasketShopping} /> Ingredients
            </h5>
            <div className={styles.ingredient__summary}>
              <div>
                Volume: <span>16 oz</span>
              </div>
              <div>
                Consumed: <span>All</span>
              </div>
            </div>
          </div>
          <div className="col-12">
            <AddIngredient
              ingredients={ingredients}
              categories={data?.getAllCategories}
            />
          </div>
        </div>
        <h5 className={styles.headingText}>
          <Icon size="2.5rem" fontName={faNotebook} /> Notes
        </h5>
        <Textarea name="note" placeholder="Write down your notes..." />
      </FormProvider>
    </div>
  );
});

UploadCard.displayName = "Challenge Post Form";

const Summary = ({ ingredients }) => {
  const [getIngredientsFact, { data }] = useLazyQuery(GET_INGREDIENTS_RXFACT);

  useEffect(() => {
    getIngredientsFact({
      variables: {
        ingredients: ingredients.map((ing) => ({
          ingredientId: ing?.ingredientId?._id,
          value: ing?.selectedPortion?.gram,
        })),
      },
    });
  }, [getIngredientsFact, ingredients]);

  const { netCarbs, glycemicLoad, calories } = useMemo(() => {
    const fact = data?.getIngredientsFact;
    return {
      netCarbs: fact?.giGl?.netCarbs.toFixed(1) || 0,
      glycemicLoad: fact?.giGl?.totalGL.toFixed(1) || 0,
      calories:
        fact?.nutrients
          ?.find((nutrient) => nutrient.name === "Calorie")
          ?.value.toFixed(1) || 0,
    };
  }, [data]);

  return (
    <div className={styles.summary__wrapper}>
      <div className="row">
        <div className={`col-4 ${styles.summary}`}>
          <h5>{netCarbs}</h5>
          <p>Net Carbs</p>
        </div>
        <div className={`col-4 ${styles.summary}`}>
          <h5>{glycemicLoad}</h5>
          <p>Glycemic Load</p>
        </div>
        <div className={`col-4 ${styles.summary}`}>
          <h5>{calories}</h5>
          <p>Calories</p>
        </div>
      </div>
    </div>
  );
};

const AddIngredient = ({ ingredients, categories }) => {
  const dispatch = useAppDispatch();
  const [ingredient, setIngredient] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);

  const { data } = useQuery(GET_INGREDIENTS, {
    variables: { classType: "All" },
  });

  const showNutrientInfo = (ingredient) => {
    dispatch(
      setShowPanel({
        name: "RXPanel",
        show: true,
        payload: [
          {
            ingredientId: ingredient.ingredientId._id,
            value: ingredient?.selectedPortion?.gram,
          },
        ],
      }),
    );
  };

  const addIngredintHandler = (id: string) => {
    const ingredientItem = ingredientList.find((ing) => ing.value === id);
    if (!ingredientItem) return;
    dispatch(addIngredient({ ingredient: ingredientItem }));
    setIngredient("");
    setShowSuggestion(false);
  };

  const deleteIngredientHandler = (id) => {
    dispatch(deleteIngredient({ id }));
  };

  const ingredientList = useMemo(() => {
    let results = [];
    results = data?.filterIngredientByCategoryAndClass.filter((ing) => {
      const isAlreadySelected = ingredients.some(
        (item) => item?.ingredientId._id === ing?.value,
      );
      if (ingredient) {
        return (
          !isAlreadySelected &&
          ing?.label.toLowerCase().startsWith(ingredient.toLowerCase())
        );
      } else return !isAlreadySelected;
    });
    return results;
  }, [data?.filterIngredientByCategoryAndClass, ingredient, ingredients]);

  return (
    <Fragment>
      <div className="row">
        <div className={`col-8 ${styles.ingredient__field}`}>
          <Textfield
            placeholder="Type your ingredients..."
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            onFocus={() => {
              setShowSuggestion(true);
            }}
          />
          {showSuggestion && (
            <ul>
              {ingredientList.map((ing) => (
                <li
                  key={ing.value}
                  onClick={() => addIngredintHandler(ing.value)}
                >
                  {ing.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-4">
          <Combobox
            options={categories}
            name="category"
            placeholder="Blend Category"
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className={styles.ingredient__card}>
            {ingredients.map((ingredient) => (
              <div
                className={styles.ingredient__content}
                key={ingredient.ingredientId._id}
              >
                <div className={styles.ingredient__item}>
                  <div>
                    {ingredient?.ingredientId?.featuredImage ? (
                      <img
                        src={ingredient?.ingredientId?.featuredImage}
                        alt={ingredient.ingredientId.ingredientName}
                      />
                    ) : (
                      <span />
                    )}
                  </div>
                  <span>
                    {ingredient?.selectedPortion?.quantity || 1}{" "}
                    {ingredient?.selectedPortion?.name}
                  </span>
                  <span>{ingredient.ingredientId.ingredientName}</span>
                </div>
                <div className={styles.ingredient__actions}>
                  <a
                    href={`/wiki/Ingredient/${ingredient.ingredientId._id}/${ingredient?.selectedPortion?.gram}/`}
                  >
                    <Icon
                      size="small"
                      color="primary"
                      fontName={faCircleInfo}
                      className={styles.ingredient__button}
                    />
                  </a>
                  <Icon
                    size="small"
                    color="primary"
                    fontName={faChartSimple}
                    className={styles.ingredient__button}
                    onClick={() => showNutrientInfo(ingredient)}
                  />
                  <Icon
                    size="small"
                    color="primary"
                    fontName={faPen}
                    className={styles.ingredient__button}
                  />
                  <Icon
                    size="small"
                    color="primary"
                    fontName={faTrash}
                    className={styles.ingredient__button}
                    onClick={() =>
                      deleteIngredientHandler(ingredient.ingredientId._id)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UploadCard;

const DatePickerButton = forwardRef(({ value, onClick }: any, ref: any) => {
  const label = useMemo(() => {
    const date = UTCDate(value, "/");
    if (isToday(date)) return "Today";
    else if (isYesterday(date)) return "Yesterday";
    else if (isTomorrow(date)) return "Tomorrow";
    else return format(date, "MMMM do, yyyy");
  }, [value]);

  return (
    <div className={styles.date} onClick={onClick}>
      <Textfield ref={ref} required value={label} disabled />
      <Icon fontName={faCalendar} size={"2rem"} className={styles.date__icon} />
    </div>
  );
});
DatePickerButton.displayName = "DatePickerButton";

interface DateSelectorProps {
  activeDate: string;
  startDate: string;
  endDate: string;
}
const DateSelector = (props: DateSelectorProps) => {
  const dispatch = useAppDispatch();
  const { activeDate, startDate } = props;

  const dateHandler = (date) => {
    dispatch(setPostDate(format(date, "yyyy-MM-dd")));
  };

  return (
    <DatePicker
      selected={activeDate ? UTCDate(activeDate) : new Date()}
      minDate={startDate ? UTCDate(startDate) : new Date()}
      maxDate={addDays(new Date(), 1)}
      onChange={dateHandler}
      fixedHeight
      customInput={<DatePickerButton />}
    />
  );
};
