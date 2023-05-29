/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import AContainer from "../../../containers/A.container";
import styles from "../share/recipePageLayout/recipePageLayout.module.scss";
import Center_Elements from "./recipe_elements/centerElements.component";
import IngredientList from "./recipe_elements/ingredientList/ingredientList&Howto.component";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import imageUploadS3 from "../../utility/imageUploadS3";
import { BLEND_CATEGORY } from "../../../gqlLib/recipes/queries/getEditRecipe";
import { useMutation, useQuery } from "@apollo/client";
import CREATE_A_RECIPE_BY_USER from "../../../gqlLib/recipes/mutations/createARecipeByUser";
import notification from "../../utility/reactToastifyNotification";
import { useRouter } from "next/router";
import useGetBlendNutritionBasedOnRecipexxx from "../../../customHooks/useGetBlendNutritionBasedOnRecipexxx";
import IngredientPanel from "../share/ingredientPanel/IngredientPanel";
import useWindowSize from "../../utility/useWindowSize";
import NutritionPanel from "../share/nutritionPanel/NutritionPanel";
import PanelHeaderCenter from "../share/panelHeader/PanelHeaderCenter";
import TrayWrapper from "../../sidetray/TrayWrapper";
import TrayTag from "../../sidetray/TrayTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping as faBasketShoppingRegular } from "@fortawesome/pro-regular-svg-icons";
import { faBasketShopping as faBasketShoppingSolid } from "@fortawesome/pro-solid-svg-icons";
import { GiGl } from "../../../type/nutrationType";

const AddRecipePage = () => {
  const [images, setImages] = useState<any[]>([]);
  const [selectedBlendValueState, setSelectedBlendValueState] = useState(
    "61cafc34e1f3e015e7936587",
  );
  const [recipeHeading, setRecipeHeading] = useState("");
  const [selectedIngredientsList, setSelectedIngredientsList] = useState([]);
  const [calculateIngOz, SetcalculateIngOz] = useState(null);
  const [nutritionState, setNutritionState] = useState(null);
  const [counter, setCounter] = useState(1);
  const [howToState, setHowToSteps] = useState([]);
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipePrepareTime, setRecipePrepareTime] = useState(1);
  const [createNewRecipeByUser] = useMutation(CREATE_A_RECIPE_BY_USER);
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);
  const { dbUser } = useAppSelector((state) => state?.user);
  const router = useRouter();
  const { width } = useWindowSize();
  const [openTray, setOpenTray] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleFetchIngrdients,
    loading: nutritionDataLoading,
    data: nutritionData,
  } = useGetBlendNutritionBasedOnRecipexxx();

  const { loading: blendCategoriesInProgress, data: blendCategoriesData } =
    useQuery(BLEND_CATEGORY);

  // center

  const adjusterFunc = (value) => {
    if (value < 1) {
      setCounter(1);
    } else {
      setCounter(value);
    }
  };

  // submit data for add recipe

  const handleSubmitData = async () => {
    if (recipeHeading && selectedIngredientsList?.length) {
      setLoading(true);
      let ingArr = [];
      selectedIngredientsList?.forEach((item) => {
        let value = item?.portions?.find((item) => item.default);
        if (value) {
          ingArr?.push({
            ingredientId: item?._id,
            selectedPortionName: value?.measurement,
            weightInGram: Number(value?.meausermentWeight),
          });
        }
      });
      const howToArr = howToState?.map((item) => `${item?.step}`);

      let obj = {
        userId: dbUser?._id,
        name: recipeHeading,
        description: recipeDescription,
        recipeBlendCategory: selectedBlendValueState,
        ingredients: ingArr,
        servingSize: calculateIngOz,
        servings: counter,
        recipeInstructions: howToArr,
      };

      try {
        if (images?.length) {
          let imageArr = await imageUploadS3(images);
          //@ts-ignore
          (imageArr = imageArr?.map((img, index) =>
            index === 0
              ? { image: img, default: true }
              : { image: img, default: false },
          )),
            (obj = {
              ...obj,
              //@ts-ignore
              image: imageArr,
            });

          const { data } = await createNewRecipeByUser({
            variables: {
              data: obj,
            },
          });
          setLoading(false);
          notification("success", "recipe create successfully");
          if (data?.addRecipeFromUser?._id) {
            router?.push(`/recipe_details/${data?.addRecipeFromUser?._id}`);
          }
        } else {
          const { data } = await createNewRecipeByUser({
            variables: {
              data: obj,
            },
          });
          setLoading(false);
          notification("success", "recipe create successfully");
          if (data?.addRecipeFromUser?._id) {
            router?.push(`/recipe_details/${data?.addRecipeFromUser?._id}`);
          }
        }
      } catch (error) {
        setLoading(false);
        notification("error", error?.message || "Something went wrong");
      }
    } else {
      notification(
        "warning",
        "You can't save recipe without name and ingredients",
      );
    }
  };

  //left panel

  // add ingrediet
  const handleIngredientClick = (ingredient: any, present: boolean) => {
    if (!present) {
      setSelectedIngredientsList((pre) => [...pre, ingredient]);
    } else {
      setSelectedIngredientsList((pre) => [
        //@ts-ignore
        ...pre?.filter((blen) => blen?._id !== ingredient?._id),
      ]);
    }
  };

  // check ingredinet it's alredy exist

  const checkActive = (id: string) => {
    let present = false;
    selectedIngredientsList?.forEach((blen) => {
      //@ts-ignore
      if (blen?._id === id) {
        present = true;
      }
    });
    return present;
  };

  useEffect(() => {
    handleFetchIngrdients(
      selectedIngredientsList,
      nutritionState,
      SetcalculateIngOz,
    );
  }, [selectedIngredientsList, nutritionState]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const nutritionListData =
    nutritionData?.getNutrientsListAndGiGlByIngredients?.nutrients;
  const giGl: GiGl = nutritionData?.getNutrientsListAndGiGlByIngredients?.giGl;

  return (
    <AContainer
      headerIcon="/icons/juicer.svg"
      headerTitle="Add New Blend"
      headTagInfo={{
        title: "Add New Blend",
        description: "add new blend",
      }}
    >
      {width < 1280 ? (
        <>
          <TrayWrapper
            isolated={true}
            showPanle="left"
            showTagByDefaut={true}
            openTray={openTray}
            panleTag={(hover) => (
              <TrayTag
                hover={hover}
                icon={
                  <FontAwesomeIcon
                    icon={
                      hover ? faBasketShoppingRegular : faBasketShoppingSolid
                    }
                  />
                }
                placeMent="left"
                handleTagClick={() => setOpenTray((prev) => !prev)}
              />
            )}
          >
            <IngredientPanel
              handleIngredientClick={handleIngredientClick}
              checkActive={checkActive}
            />
          </TrayWrapper>
        </>
      ) : null}

      <div className={styles.main}>
        <div className={styles.left}>
          <IngredientPanel
            handleIngredientClick={handleIngredientClick}
            checkActive={checkActive}
          />
        </div>
        <div className={styles.center}>
          <PanelHeaderCenter
            backBtnObj={{
              function: () => router.push("/"),
            }}
            editOrSavebtnFunc={handleSubmitData}
            editOrSavebtnText="Save"
            loading={loading}
          />
          <Center_Elements
            blendCategoryList={
              blendCategoriesData?.getAllCategories
                ? blendCategoriesData?.getAllCategories
                : []
            }
            setDropDownState={setSelectedBlendValueState}
            selectedBlendValueState={selectedBlendValueState}
            setImages={setImages}
            images={images}
            setRecipeHeading={setRecipeHeading}
            recipeDescription={recipeDescription}
            setRecipeDescription={setRecipeDescription}
            recipeTitle={recipeHeading}
            recipePrepareTime={recipePrepareTime}
            setRecipePrepareTime={setRecipePrepareTime}
            giGl={giGl}
          />
          <IngredientList
            adjusterFunc={adjusterFunc}
            counter={counter}
            calculatedIngOz={calculateIngOz}
            selectedIngredientsList={selectedIngredientsList}
            setSelectedIngredientsList={setSelectedIngredientsList}
            nutritionState={nutritionState}
            setNutritionState={setNutritionState}
            checkActive={checkActive}
            howToState={howToState}
            setHowToSteps={setHowToSteps}
          />
        </div>
        <div className={styles.right}>
          <NutritionPanel
            counter={counter}
            nutritionTrayData={
              nutritionData &&
              JSON?.parse(
                nutritionData?.getNutrientsListAndGiGlByIngredients?.nutrients,
              )
            }
            nutritionState={nutritionState}
            setNutritionState={setNutritionState}
            isComeFormRecipeEditPage={true}
            calculatedIngOz={calculateIngOz}
            nutritionDataLoading={nutritionDataLoading}
            adjusterFunc={adjusterFunc}
          />
        </div>
      </div>
    </AContainer>
  );
};
export default AddRecipePage;
