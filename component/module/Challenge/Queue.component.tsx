import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { faPlusCircle } from "@fortawesome/pro-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/pro-light-svg-icons";

import Combobox from "../../organisms/Forms/Combobox.component";
import Searchbox from "../../molecules/Searchbox/Searchbox.component";
import ToggleCard from "../../../theme/toggleCard/toggleCard.component";
import IconHeading from "../../../theme/iconHeading/iconHeading.component";
import SkeletonElement from "../../../theme/skeletons/SkeletonElement";
import RecipeCard from "../../molecules/Card/RecipeCard.component";
import Icon from "../../atoms/Icon/Icon.component";

import { setRecipeInfo } from "../../../redux/slices/Challenge.slice";

import styles from "./Queue.module.scss";
import {
  useFindQueuedRecipe,
  useRecipeCategory,
  useDiscoveryQueue,
  useQueuedRecipe,
} from "../../../hooks/modules/Challenge/useChallengeRecipes";

interface ChallengeQueueProps {
  challenges: any;
  height: string;
}
const ChallengeQueue = (props: ChallengeQueueProps) => {
  const [toggler, setToggler] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [type, setType] = useState("all");

  const { parentRef, recipeRef } = useFindQueuedRecipe([toggler, setToggler]);
  const { ref, categories, onHide, onShow } = useRecipeCategory();

  const { observer, loading, recipes } = useDiscoveryQueue({
    type,
    query,
    page,
    setPage,
  });
  const queuedRecipes = useQueuedRecipe(props.challenges);

  // When we toggle the tab between Discover and Queue
  useEffect(() => {
    setQuery("");
    setPage(1);
    setType("all");
  }, [toggler]);

  return (
    <Fragment>
      <IconHeading
        icon={faCalendarAlt}
        title="Recipe Queue"
        iconStyle={{ fontSize: "18px" }}
      />
      <ToggleCard
        noRoute
        toggler={toggler}
        setTogglerFunc={setToggler}
        leftToggleHeading="Discover"
        rightToggleHeading="Queue"
        headingStyle={{
          padding: "15px 5px",
        }}
      />

      {toggler && (
        <div className={styles.action}>
          {}
          <div ref={ref} style={{ width: "100%" }}>
            <Combobox
              options={categories}
              className={styles.blendType}
              value={type}
              onChange={(e) => {
                setPage(1);
                setType(e.target.value);
              }}
            />
          </div>
          <Searchbox
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onReset={() => {
              setQuery("");
              onHide();
            }}
            onFocus={onHide}
            onMouseEnter={onHide}
            onMouseLeave={onShow}
            onBlur={onShow}
          />
        </div>
      )}
      <div
        className={`${styles.wrapper} ${
          styles[toggler ? "wrapper--discover" : "wrapper--queue"]
        }`}
        style={{
          maxHeight: toggler
            ? `calc(${props.height} - 111px)`
            : `calc(${props.height} - 51px)`,
        }}
        ref={parentRef}
      >
        {toggler ? (
          <DiscoverRecipes recipes={recipes} lastRecipes={observer} />
        ) : (
          <QueuedRecipes recipes={queuedRecipes} />
        )}
        {loading &&
          [...Array(page === 1 ? 3 : 1)]?.map((_, index) => (
            <SkeletonElement
              type="thumbnail"
              key={index}
              style={{ width: "100%", height: "277px" }}
            />
          ))}
      </div>
    </Fragment>
  );
};

interface RecipesProps {
  recipes: any[];
  lastRecipes?: any;
}
const DiscoverRecipes = (props: RecipesProps) => {
  const { recipes, lastRecipes } = props;
  const dispatch = useDispatch();
  const uploadRecipe = (_id, name, image, category, ingredients) => {
    dispatch(
      setRecipeInfo({
        _id,
        name,
        image: {
          url: image?.find((img) => img.default)?.image || image[0]?.image,
          hash: "",
        },
        category,
        ingredients,
      }),
    );
  };
  return (
    <Fragment>
      {recipes?.map((recipe, index) => {
        const {
          recipeId: {
            _id,
            name,
            recipeBlendCategory,
            averageRating,
            totalRating,
            image,
          },
          defaultVersion,
        } = recipe;

        return (
          <div
            ref={recipes.length === index + 1 ? lastRecipes : null}
            key={_id}
            data-recipe={_id}
          >
            <RecipeCard
              className="mt-10"
              title={name}
              category={recipeBlendCategory?.name}
              ratings={averageRating}
              noOfRatings={totalRating}
              image={image.find((img) => img.default === true)?.image}
              recipeId={_id}
              ingredients={defaultVersion?.ingredients || []}
            >
              <div>
                <Icon
                  fontName={faPlusCircle}
                  style={{ color: "#fe5d1f" }}
                  size="20px"
                  onClick={() =>
                    uploadRecipe(
                      _id,
                      name,
                      image,
                      recipeBlendCategory?._id,
                      defaultVersion?.ingredients,
                    )
                  }
                />
              </div>
            </RecipeCard>
          </div>
        );
      })}
    </Fragment>
  );
};

const QueuedRecipes = (props: RecipesProps) => {
  const { recipes } = props;
  const dispatch = useDispatch();
  const uploadRecipe = (recipe) => {
    dispatch(setRecipeInfo(recipe));
  };
  return (
    <Fragment>
      {recipes?.map((recipe) => {
        const { _id, name, image, category, ingredients } = recipe;

        return (
          <div key={_id} data-recipe={_id}>
            <RecipeCard
              className="mt-10"
              title={name}
              category={category?.name}
              ratings={0}
              noOfRatings={0}
              image={image.url}
              recipeId={_id}
              ingredients={ingredients}
            >
              <div>
                <Icon
                  fontName={faPlusCircle}
                  style={{ color: "#fe5d1f" }}
                  size="20px"
                  onClick={() => uploadRecipe(recipe)}
                />
              </div>
            </RecipeCard>
          </div>
        );
      })}
    </Fragment>
  );
};

export default ChallengeQueue;
