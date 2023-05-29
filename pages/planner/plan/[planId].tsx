import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
  Fragment,
} from "react";
import {
  faBookmark,
  faCalendarWeek,
  faMessageDots,
  faShareNodes,
} from "@fortawesome/pro-light-svg-icons";
import {
  faBookmark as faBookmarkSolid,
  faMessageDots as faMessageDotsSolid,
} from "@fortawesome/pro-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/pro-solid-svg-icons";
import RXPanel from "../../../component/templates/Panel/RXFacts/RXPanel.component";
import PlanDiscovery from "../../../component/module/Planner/PlanDiscovery.component";
import PlanList from "../../../component/module/Planner/PlanByDay.component";
import Container from "../../../containers/A.container";
import IconHeading from "../../../theme/iconHeading/iconHeading.component";
import Insights from "../../../component/module/Planner/Insights.component";
import Icon from "../../../component/atoms/Icon/Icon.component";
import { faSearch, faTimes } from "@fortawesome/pro-regular-svg-icons";
import { useRouter } from "next/router";
import styles from "../../../styles/pages/planner.module.scss";
import IconButton from "../../../component/atoms/Button/IconButton.component";
import WeekPicker from "../../../component/molecules/DatePicker/Week.component";
import { startOfWeek, endOfWeek, format } from "date-fns";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_PLAN,
  GET_ALL_PLANS,
  GET_ALL_PLAN_COMMENTS,
  GET_FEATURED_PLANS,
  GET_PLAN,
  SHARE_PLAN,
} from "../../../graphql/Planner";
import PlanForm, {
  defaultPlan,
} from "../../../component/module/Planner/PlanForm.component";
import { useForm } from "react-hook-form";
import PlannerQueue from "../../../component/module/Planner/Queue.component";
import ShareModal from "../../../component/organisms/Share/Share.component";
import CollectionDrawer from "../../../component/templates/Drawer/Collection/Collection.component";
import CommentDrawer from "../../../component/templates/Drawer/Comment/Comment.component";
import { useAppSelector } from "../../../redux/hooks";
import Publish from "../../../helpers/Publish";
import { useDispatch } from "react-redux";
import { updateSidebarActiveMenuName } from "../../../redux/slices/utilitySlice";
import ShowLastModifiedCollection from "../../../components/showLastModifiedCollection/ShowLastModifiedCollection";
import { setIsOpenPlanCollectionTray } from "../../../redux/slices/Planner.slice";
import useToOpenPlanCollectionTray from "../../../customHooks/plan/useToOpenPlanCollectionTray";
import useToAddPlanToCollection from "../../../customHooks/plan/useToAddPlanToCollection";
import useToOpenPlanCommentsTray from "../../../customHooks/plan/useToOpenPlanCommentsTray";

const MyPlan = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: useMemo(() => defaultPlan, []),
  });
  const handleOpenPlanCommentsTray = useToOpenPlanCommentsTray();
  const handleOpenCollectionTray = useToOpenPlanCollectionTray();
  const handleAddToCollection = useToAddPlanToCollection();
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const { lastModifiedPlanCollection } = useAppSelector(
    (state) => state?.planner,
  );

  const memberId = useAppSelector((state) => state?.user?.dbUser?._id || "");
  const { data } = useQuery(GET_PLAN, {
    variables: { planId: router.query.planId, token: "", memberId },
    skip: router.query.planId === "",
  });
  const { data: comments } = useQuery(GET_ALL_PLAN_COMMENTS, {
    variables: { id: router.query.planId },
    skip: router.query.planId === "",
  });

  const [createPlan, createState] = useMutation(CREATE_PLAN, {
    refetchQueries: [GET_FEATURED_PLANS, GET_ALL_PLANS],
  });
  const [sharePlan, { data: share }] = useMutation(SHARE_PLAN);
  const [link, setLink] = useState("");
  const [showShare, setShowShare] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [planlist, setPlanlist] = useState([]);
  const [showComments, setShowComments] = useState(false);
  ``;
  const [week, setWeek] = useState({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date()),
  });
  const [panelHeight, setPanelHeight] = useState("1000px");

  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const weekChangeHandler = (start, end) => {
    router.push(
      `/planner/plan/?plan=${router.query.planId}&start=${format(
        new Date(start),
        "yyyy-MM-dd",
      )}&end=${format(new Date(end), "yyyy-MM-dd")}&alert=true`,
    );
  };

  const plan = data?.getAPlan?.plan;

  useEffect(() => {
    if (data?.getAPlan) {
      setPlanlist(data?.getAPlan?.plan?.planData || []);
    }
  }, [data?.getAPlan]);

  const allPlannedRecipes = useMemo(
    () =>
      plan?.planData
        .reduce((acc, cur) => acc.concat(cur.recipes), [])
        .filter(
          (value, index, self) =>
            index === self.findIndex((t) => t._id === value._id),
        )
        .map((recipe) => ({
          recipeId: recipe,
          defaultVersion: recipe?.defaultVersion,
        })),
    [plan],
  );

  const modifyPlan = (day, recipe) => {
    if (!day) return;
    setPlanlist((list) =>
      list.map((plan, idx) => {
        if (+day === idx + 1) {
          const isDuplicateRecipe = plan.recipes.some(
            (item) => item?._id === recipe?._id,
          );
          if (isDuplicateRecipe) return plan;
          else {
            return {
              ...plan,
              recipes: [...plan.recipes, { ...recipe, ...recipe?.recipeId }],
            };
          }
        } else {
          return plan;
        }
      }),
    );
  };

  const deleteRecipeFromPlan = (day, recipeId) => {
    setPlanlist((list) =>
      list.map((plan) => {
        if (+day === plan?.day) {
          console.log(plan, {
            ...plan,
            recipes: plan?.recipes.filter((recipe) => recipe?._id !== recipe),
          });
          return {
            ...plan,
            recipes: plan?.recipes.filter((recipe) => recipe?._id !== recipeId),
          };
        } else {
          return plan;
        }
      }),
    );
  };

  const editHandler = async (data) => {
    if (!isEditMode) return setIsEditMode(true);
    const planData = {
      memberId: plan?.memberId,
      ...data,
      planData: planlist.map((plan) => ({
        day: plan.day,
        recipes: plan.recipes.map((recipe) => recipe._id),
      })),
    };
    if (plan?.memberId === userId) {
      await Publish({
        mutate: createPlan,
        state: createState,
        variables: { data: planData },
        success: "Edited the Plan",
        onSuccess: () => {
          setIsEditMode(false);
          setPlanlist(plan?.planData);
          methods.reset(defaultPlan);
        },
      });
    } else {
      await Publish({
        mutate: createPlan,
        state: createState,
        variables: { data: planData },
        success: "Created a new version of the Plan",
        onSuccess: () => {
          setIsEditMode(false);
          setPlanlist(plan?.planData);
          methods.reset(defaultPlan);
        },
      });
    }
  };

  const movePlanHandler = useCallback((dropId, draggedItem) => {
    setPlanlist((plans) =>
      plans.map((plan) => {
        // When a plan is dropped to a new day we have to add plan
        if (plan.id === dropId) {
          return {
            ...plan,
            //Checking if the new recipe already exists
            recipes: plan.recipes.find(
              (recipe) => recipe._id === draggedItem.recipe._id,
            )
              ? plan.recipes
              : plan.recipes.concat(draggedItem.recipe),
          };
        }
        // Clearing the current days recipe as the recipe is moved to some different date
        else if (plan.id === draggedItem.plannerId) {
          return {
            ...plan,
            recipes: plan.recipes.filter(
              (recipe) => recipe._id !== draggedItem.recipe._id,
            ),
          };
        } else {
          return plan;
        }
      }),
    );
  }, []);

  const shareHandler = useCallback(async () => {
    sharePlan({
      variables: {
        userId,
        planId: router.query.planId,
      },
    });
  }, [router.query.planId, sharePlan, userId]);

  useEffect(() => {
    if (!share?.sharePlan) return;
    setLink(
      `${process.env.NEXT_PUBLIC_HOSTING_DOMAIN}/planner/plan/shared/?token=${share?.sharePlan}`,
    );
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOSTING_DOMAIN}/planner/plan/shared/?token=${share?.sharePlan}`,
    );
  }, [share]);

  useEffect(() => {
    dispatch(updateSidebarActiveMenuName("Plans"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container
      headerIcon="/icons/calender__sidebar.svg"
      headerTitle="BLENDING PLAN DETAILS"
      headTagInfo={{
        title: "Blending plan details",
        description: "blending plans details",
      }}
      showPlanCollectionTray={{
        show: true,
        showPanle: "left",
        showTagByDeafult: true,
      }}
      showCommentsTrayForPlan={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
    >
      {/* <div> */}
      {/* <CommentDrawer
        id={plan?._id}
        title={plan?.planName}
        cover={plan?.image?.url}
        comments={comments?.getAllCommentsForAPlan}
        show={showComments}
        onClose={() => setShowComments(false)}
      /> */}
      {/* <CollectionDrawer /> */}
      <RXPanel />
      <ShareModal
        name={plan?.planName}
        show={showShare}
        setShow={setShowShare}
        link={link}
        onShare={shareHandler}
      />
      <div className={styles.windowContainer}>
        <div className={styles.planner}>
          <div className="row ai-center">
            <div className="col-4">
              <div className={styles.planner__pageTitle}>BLENDA COACH</div>
            </div>
            <div className="col-4 ta-center ">
              <button
                className={styles.discoveryBtn}
                onClick={() => {
                  router.push("/planner");
                }}
              >
                <Icon fontName={faSearch} size="2rem" className="mr-10" />
                Plan Discovery
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              {isEditMode ? (
                <PlannerQueue
                  panel="plan"
                  height={panelHeight}
                  recipes={allPlannedRecipes}
                  modifyPlan={modifyPlan}
                />
              ) : (
                <PlanDiscovery
                  height={panelHeight}
                  recipes={allPlannedRecipes}
                  setOpenCollectionModal={setOpenCollectionModal}
                />
              )}
            </div>
            <div className="col-6" style={{ padding: "0 1.5rem" }}>
              <div className={styles.headingDiv}>
                <IconHeading
                  title={isEditMode ? "Edit Plan" : "Plan"}
                  icon={faCalendarDays}
                />
                <div className="flex ai-center">
                  <div
                    className={`${styles.uploadDiv} ${styles.uploadDiv__save}`}
                    onClick={methods.handleSubmit(editHandler)}
                  >
                    <span>{isEditMode ? "Save" : "Edit"}</span>
                  </div>
                  <IconButton
                    fontName={faTimes}
                    size="small"
                    variant="secondary"
                    className="ml-10"
                    onClick={() => {
                      if (isEditMode) {
                        setIsEditMode(false);
                        setPlanlist(plan?.planData);
                        methods.reset(defaultPlan);
                      } else {
                        router.push("/planner/plan");
                      }
                    }}
                  />
                </div>
              </div>
              <div style={{ height: panelHeight, background: "#fff" }}>
                {isEditMode ? (
                  <PlanForm methods={methods} />
                ) : (
                  <Fragment>
                    <div className={styles.preview}>
                      <h3 className={styles.preview__title}>
                        {plan?.planName}
                      </h3>
                      <div className={styles.preview__actions}>
                        <span>
                          <img
                            src="/logo_small.svg"
                            alt=""
                            height={30}
                            className="mr-10"
                          />
                          Blending 101
                        </span>
                        <div>
                          <WeekPicker
                            element={<DatePickerButton />}
                            week={week}
                            onWeekChange={weekChangeHandler}
                          />
                          <span
                            onClick={() =>
                              plan?.planCollections?.length
                                ? handleOpenCollectionTray(
                                    plan?._id,
                                    plan?.planCollections,
                                    "details",
                                  )
                                : handleAddToCollection(
                                    plan?._id,
                                    memberId,
                                    setOpenCollectionModal,
                                    "details",
                                  )
                            }
                          >
                            <Icon
                              fontName={
                                plan?.planCollections?.length
                                  ? faBookmarkSolid
                                  : faBookmark
                              }
                              size="2rem"
                              className="mr-10"
                              variant="bold"
                              color={plan?.planCollections?.length && "#fe5d1f"}
                            />
                            Bookmark
                          </span>
                          <span onClick={() => setShowShare(true)}>
                            <Icon
                              fontName={faShareNodes}
                              size="2rem"
                              className="mr-10"
                            />
                            Share
                          </span>
                          <span
                            onClick={() => setShowComments((prev) => !prev)}
                          >
                            <Icon
                              fontName={faMessageDots}
                              size="2rem"
                              className="mr-10"
                            />
                            {comments?.getAllCommentsForAPlan?.length || 0}
                          </span>
                        </div>
                      </div>
                      <hr />
                      <p>{plan?.description}</p>
                    </div>
                    <div style={{ height: 10, backgroundColor: "#f8f8f8" }} />
                  </Fragment>
                )}

                <div className={`${styles.plan} ${styles["plan--details"]}`}>
                  <PlanList
                    data={planlist}
                    cart={false}
                    action={false}
                    onMoveRecipe={isEditMode && movePlanHandler}
                    onRemove={isEditMode && deleteRecipeFromPlan}
                  />
                </div>
              </div>
            </div>
            <div className="col-3">
              <Insights
                height={panelHeight}
                categories={data?.getAPlan?.recipeCategoriesPercentage}
                ingredients={data?.getAPlan?.topIngredients}
              />
            </div>
          </div>
        </div>
      </div>
      <ShowLastModifiedCollection
        open={openCollectionModal}
        setOpen={setOpenCollectionModal}
        shouldCloseOnOverlayClick={true}
        lastModifiedCollectionName={lastModifiedPlanCollection?.name}
        openCollectionPanel={() => {
          dispatch(setIsOpenPlanCollectionTray(true));
          setOpenCollectionModal(false);
        }}
      />
    </Container>
  );
};

const DatePickerButton = forwardRef(({ value, onClick }: any, ref: any) => (
  <span onClick={onClick} ref={ref}>
    <Icon fontName={faCalendarWeek} size="2rem" className="mr-10" />
    Planner
  </span>
));
DatePickerButton.displayName = "DatePickerButton";

export default MyPlan;
