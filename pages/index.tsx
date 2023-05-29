import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Overview from "../component/module/Home/Overview.component";
import PlanCard from "../component/module/Planner/PlanCard.component";
import ContentTray from "../components/recipe/recipeDiscovery/ContentTray/ContentTray.component";
import {
  PAGES,
  sidebarActiveMenuNameType,
} from "../components/sidebar/Sidebar.component";
import AContainer from "../containers/A.container";
import { RECIPE_CATEGORY_COLOR } from "../data/Recipe";
import GET_ALL_LATEST_RECIPES from "../gqlLib/recipes/queries/getAllLatestRecipes";
import { GET_WIKI_HIGHLIGHTS } from "../gqlLib/wiki/query/getWikiList";
import { GET_ALL_PLANS } from "../graphql/Planner";
import { GET_BLEND_TYPES } from "../graphql/Recipe";
import { useAppSelector } from "../redux/hooks";
import { updateFilterCriteriaItem } from "../redux/slices/filterRecipeSlice";
import { updateSidebarActiveMenuName } from "../redux/slices/utilitySlice";
import styles from "../styles/pages/home.module.scss";
import CardComponent from "../theme/cards/card.component";
import SpecialcardComponent from "../theme/cards/specialCard.component";
const defaultBlendImg =
  "https://blending.s3.us-east-1.amazonaws.com/3383678.jpg";

const Home = () => {
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const { allFilters } = useAppSelector((state) => state?.filterRecipe);
  const displayName = useAppSelector(
    (state) => state.user?.dbUser?.displayName || "",
  );
  const { data: recipes } = useQuery(GET_ALL_LATEST_RECIPES, {
    variables: { userId },
  });
  const { data: plans } = useQuery(GET_ALL_PLANS, {
    variables: { limit: 8, page: 1, memberId: userId, query: "" },
  });
  const { data: wikis } = useQuery(GET_WIKI_HIGHLIGHTS);
  const { data: blendTypes } = useQuery(GET_BLEND_TYPES);
  const [wikiType, setWikiType] = useState("All");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleToShowBlendTypes = (value: any) => {
    const findFilter = allFilters?.find((filter) => filter?.id === value?.id);
    if (!findFilter) {
      dispatch(
        updateFilterCriteriaItem({
          updateStatus: "add",
          value: value,
          filterCriteria: value.filterCategory,
        }),
      );
    }

    dispatch(updateSidebarActiveMenuName("Blends"));
    router.push("/discovery");
  };

  const handleToRoutePage = (
    route: string,
    menuName: sidebarActiveMenuNameType,
  ) => {
    dispatch(updateSidebarActiveMenuName(menuName));
    router.push(route);
  };

  return (
    <AContainer
      headerTitle="Home"
      headerFullWidth={true}
      showSidebar={false}
      headerIcon={"/icons/home.svg"}
      headTagInfo={{ description: "home page content", title: "Home" }}
      showNotificationTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
    >
      <div className={styles.container}>
        <div className="row">
          <div className="col-9">
            <div className={styles.alert}>
              <div className={styles.alert__content}>
                <h3>Hello {displayName}!</h3>
                <p>
                  You have current blending score is{" "}
                  <span className="bold text-green">85%</span>. Did you know
                  people who log their meals daily lose twice as weight as those
                  who don&apos;t? Check out &quot;
                  <span className="text-orange bold">
                    Food Logging like a Pro!
                  </span>
                  &quot;. It could help take your blending score to the next
                  level.
                </p>
              </div>
              <div className={styles.alert__image}>
                <h3>Food logging like a Pro!</h3>
                <img src="/images/smoothie.webp" alt="" />
              </div>
            </div>
            <div className={styles.quick}>
              <div className={styles.quick__site}>
                <h3>Explore Site</h3>
                <div>
                  {PAGES &&
                    PAGES.map((page, idx) =>
                      idx !== 0 ? (
                        <a
                          key={page.content}
                          onClick={() =>
                            handleToRoutePage(page.link, page.content)
                          }
                        >
                          <img src={page.logo} alt={page.content} />
                          <h6>{page.content}</h6>
                        </a>
                      ) : (
                        <></>
                      ),
                    )}
                </div>
              </div>
              <div className={styles.quick__category}>
                <h3>Explore Blend Types</h3>
                <div>
                  {blendTypes?.getAllCategories &&
                    blendTypes?.getAllCategories.map((type, idx) => (
                      <a
                        key={type._id}
                        // href={type._id}
                        // passHref
                        onClick={() =>
                          handleToShowBlendTypes({
                            name: type?.name,
                            image: type?.image || defaultBlendImg,
                            id: type?._id,
                            tagLabel: "",
                            filterCriteria: "blendTypes",
                            origin: {
                              activeSection: "visual",
                              filterCriteria: "blendTypes",
                              activeTab: "Blend Type",
                              childTab: type?.name || "",
                            },
                          })
                        }
                      >
                        <img src={type.image} alt={type.name} />
                        <span
                          style={{
                            backgroundColor: RECIPE_CATEGORY_COLOR[type.name],
                          }}
                        />
                        <h6>{type.name}</h6>
                      </a>
                    ))}
                </div>
              </div>
            </div>

            {/* ******** RECENT RECIPE LIST ******** */}
            <div className="mt-40">
              <ContentTray
                heading="Recent Recipes"
                image="/images/clock-light.svg"
                allUrl="/discovery"
              >
                {recipes?.getAllLatestRecipes2?.map((recipe) => {
                  const {
                    recipeId: {
                      _id = "",
                      name = "",
                      image = "",
                      numberOfRating = 0,
                      averageRating = 0,
                      brand = {},
                      userId = {},
                    },
                    calorie,
                    netCarbs,
                    rxScore,
                  } = recipe;
                  return (
                    <div key={_id}>
                      <div style={{ paddingRight: "1rem" }}>
                        <Link href={`/recipe_details/${_id}/`}>
                          <a style={{ color: "initial" }}>
                            <CardComponent
                              title={name}
                              img={image?.[0]?.image}
                              rating={averageRating}
                              noOfRating={numberOfRating}
                              rx={rxScore}
                            />
                          </a>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </ContentTray>
            </div>

            {/* ******** POPULAR PLAN LIST ******** */}
            <div className="mt-40">
              <ContentTray
                heading="Popular Plans"
                image="/images/fire-alt-light.svg"
                allUrl="/planner"
                settings={{
                  adaptiveHeight: true,
                }}
              >
                {plans?.getAllGlobalPlans?.plans?.map((plan) => (
                  <div className={styles.slider__card} key={plan?._id}>
                    <div style={{ paddingRight: "1rem" }}>
                      <PlanCard
                        planId={plan?._id}
                        title={plan?.planName}
                        image={plan?.image?.url}
                        noOfComments={plan?.commentsCount}
                        isCollectionIds={plan?.planCollections}
                        planComrFrom="homePage"
                      />
                    </div>
                  </div>
                ))}
              </ContentTray>
            </div>

            {/* ******** WIKI HIGHLIGHTS ******** */}
            <div className="mt-40">
              <ContentTray
                hasFilter
                filters={["All", "Ingredient", "Nutrient", "Health"]}
                tabState={[wikiType, setWikiType]}
                heading="Wiki Highlight"
                image="/images/clock-light.svg"
                allUrl="/discovery"
              >
                {wikis?.getWikiList
                  ?.filter(
                    (wiki) => wikiType === "All" || wikiType === wiki.type,
                  )
                  .slice(0, 9)
                  .map((wiki) => {
                    return (
                      <div className={styles.slider__card} key={wiki._id}>
                        <div style={{ paddingRight: "1rem" }}>
                          <Link
                            href={`/wiki/Ingredient/62534fde2816ed76999e521d/182/`}
                          >
                            <a style={{ color: "initial" }}>
                              <SpecialcardComponent
                                title={wiki?.wikiTitle}
                                img={wiki?.image}
                                category={wiki?.type}
                                rx={45}
                              />
                            </a>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </ContentTray>
            </div>

            {/* ******** BLOG TRENDING ******** */}
            <div className="mt-40">
              <ContentTray
                heading="Blog Trending"
                image="/images/clock-light.svg"
                allUrl="/discovery"
              >
                {[1, 2, 3, 4, 5, 6]?.map((item, index) => {
                  return (
                    <div className={styles.slider__card} key={`${index}`}>
                      <div style={{ paddingRight: "1rem" }}>
                        <SpecialcardComponent
                          type="secondary"
                          img="/cards/milk.png"
                          title="Another Special Card With Secondary Attribute."
                          style={undefined}
                          imageHeight={undefined}
                          color={undefined}
                          rx={23}
                        />
                      </div>
                    </div>
                  );
                })}
              </ContentTray>
            </div>
          </div>

          <div className="col-3">
            <Overview />
          </div>
        </div>
      </div>
    </AContainer>
  );
};

export default Home;
