import React, { Fragment, useEffect, useRef, useState } from "react";
import { faTelescope } from "@fortawesome/pro-regular-svg-icons";

import Combobox from "../../organisms/Forms/Combobox.component";
import Searchbox from "../../molecules/Searchbox/Searchbox.component";
import ToggleCard from "../../../theme/toggleCard/toggleCard.component";
import IconHeading from "../../../theme/iconHeading/iconHeading.component";
import SkeletonElement from "../../../theme/skeletons/SkeletonElement";
import RecipeCard from "../../molecules/Card/RecipeCard.component";
import styles from "./PlanDiscovery.module.scss";
import PlanCard from "./PlanCard.component";
import { useAllPlan } from "../../../hooks/modules/Plan/usePlanDiscovery";
import { useRecipeCategory } from "../../../hooks/modules/Plan/usePlanRecipes";

interface PlannerPanelProps {
  height: string;
  recipes: any[];
  setOpenCollectionModal: (arg: boolean) => void;
}

const PlanDiscovery = (props: PlannerPanelProps) => {
  const { height, recipes, setOpenCollectionModal } = props;
  const [toggler, setToggler] = useState(true);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);

  const { plans, loading, observer } = useAllPlan({ page, setPage, query });
  const { ref, categories, onHide, onShow } = useRecipeCategory();
  useEffect(() => {
    setQuery("");
    setPage(1);
    setType("all");
  }, [toggler]);

  return (
    <Fragment>
      <IconHeading
        icon={faTelescope}
        title={`Plan ${toggler ? "Discovery" : "Queue"}`}
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
        className={styles.wrapper}
        style={{
          maxHeight: height
            ? toggler
              ? `calc(${height} - 111px)`
              : `calc(${height} - 51px)`
            : "auto",
        }}
      >
        {toggler ? (
          <Plans
            plans={plans}
            observer={observer}
            setOpenCollectionModal={setOpenCollectionModal}
          />
        ) : (
          <Recipes recipes={recipes || []} />
        )}
        {toggler &&
          loading &&
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

const Plans = (props) => {
  const { plans, observer, setOpenCollectionModal } = props;

  return plans?.map((plan) => (
    <div key={plan?._id} ref={observer} className="mt-10">
      <PlanCard
        planId={plan?._id}
        title={plan.planName}
        image={plan?.image?.url}
        isCollectionIds={plan?.planCollections}
        noOfComments={plan?.commentsCount}
        setOpenCollectionModal={setOpenCollectionModal}
        planComrFrom="globalPlans"
      />
    </div>
  ));
};

const Recipes = (props) => {
  const { recipes } = props;
  return recipes?.map((recipe) => {
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
      <RecipeCard
        key={_id}
        className="mt-10"
        title={name}
        category={recipeBlendCategory?.name}
        ratings={averageRating}
        noOfRatings={totalRating}
        image={image.find((img) => img.default === true)?.image}
        recipeId={_id}
        ingredients={defaultVersion?.ingredients || []}
      />
    );
  });
};

export default PlanDiscovery;
