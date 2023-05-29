import { useRouter } from "next/router";
import React, { useState, Fragment, useCallback } from "react";
import { faUserCircle } from "@fortawesome/pro-light-svg-icons";
import PlanCard from "../../component/module/Planner/PlanCard.component";
import AppdownLoadCard from "../../components/recipe/recipeDiscovery/AppdownLoadCard/AppdownLoadCard.component";
import ContentTray from "../../components/recipe/recipeDiscovery/ContentTray/ContentTray.component";
import AContainer from "../../containers/A.container";
import Icon from "../../component/atoms/Icon/Icon.component";
import styles from "../../styles/pages/planner.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@apollo/client";
import { GET_FEATURED_PLANS } from "../../graphql/Planner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ShowLastModifiedCollection from "../../components/showLastModifiedCollection/ShowLastModifiedCollection";
import { setIsOpenPlanCollectionTray } from "../../redux/slices/Planner.slice";
import CommonSearchBar from "../../components/searchBar/CommonSearchBar";
import { useAllPlan } from "../../hooks/modules/Plan/usePlanDiscovery";
import { Debounce } from "../../helpers/Utilities";

const PlanDiscovery = () => {
  const router = useRouter();
  const query = router.query.query;
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const dispatch = useAppDispatch();
  const { lastModifiedPlanCollection } = useAppSelector(
    (state) => state?.planner,
  );

  const onPlanSearch = (value) => {
    console.log(value);
    if (value === "") {
      router.push(`/planner`, undefined, {
        shallow: true,
      });
    } else {
      router.push(`/planner?query=${value}`, undefined, {
        shallow: true,
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimizedFn = useCallback(Debounce(onPlanSearch), []);

  return (
    <AContainer
      headerIcon="/icons/calender__sidebar.svg"
      headerTitle="Plan Discovery"
      showPlanCollectionTray={{
        show: true,
        showPanle: "left",
        showTagByDeafult: true,
      }}
      headTagInfo={{
        title: "Plans",
        description: "plans",
      }}
      showCommentsTrayForPlan={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
    >
      <div className={styles.discovery}>
        <div className={styles.searchBarContainer}>
          {/* <input
            type="text"
            className="search"
            placeholder="Enter something here..."
            onChange={(e) => optimizedFn(e.target.value)}
          /> */}
          <CommonSearchBar
            input={router.query.query as string}
            isSearchTag={false}
            handleOnChange={(e) => onPlanSearch(e.target.value)}
          />
          <button
            className={styles.discovery__myplan}
            onClick={() => router.push("/planner/plan/")}
          >
            <Icon fontName={faUserCircle} className="mr-20" size="2rem" />
            My Plans
          </button>
        </div>
        {query && query !== "" ? (
          <SearchedPlan
            query={query}
            setOpenCollectionModal={setOpenCollectionModal}
          />
        ) : (
          <FeaturedPlan setOpenCollectionModal={setOpenCollectionModal} />
        )}
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
    </AContainer>
  );
};

const SearchedPlan = ({ query, setOpenCollectionModal }) => {
  const [page, setPage] = useState(1);
  const { plans, loading, observer } = useAllPlan({
    page,
    setPage,
    limit: 16,
    query,
  });

  return (
    <div className="row mt-40 mb-20">
      {plans?.map((item) => (
        <div key={item?._id} className="col-3" ref={observer}>
          <PlanCard
            planId={item?._id}
            title={item.planName}
            image={item?.image?.url}
            isCollectionIds={item?.planCollections}
            noOfComments={item?.commentsCount}
            setOpenCollectionModal={setOpenCollectionModal}
          />
        </div>
      ))}
    </div>
  );
};

const FeaturedPlan = ({ setOpenCollectionModal }) => {
  const userId = useAppSelector((state) => state.user.dbUser._id || "");

  const { data } = useQuery(GET_FEATURED_PLANS, {
    variables: { limit: 8, memberId: userId },
  });

  return (
    <Fragment>
      <AppdownLoadCard />
      <div className="mt-40">
        <ContentTray
          heading="Recommended"
          image="/images/thumbs-up.svg"
          allUrl="planner/recommended"
        >
          {data?.getAllRecommendedPlans?.plans?.map((item) => (
            <div key={item?._id}>
              <div className="mr-10">
                <PlanCard
                  planId={item?._id}
                  title={item.planName}
                  image={item?.image?.url}
                  isCollectionIds={item?.planCollections}
                  noOfComments={item?.commentsCount}
                  setOpenCollectionModal={setOpenCollectionModal}
                  planComrFrom="list"
                />
              </div>
            </div>
          ))}
        </ContentTray>
      </div>
      <div className="mt-40">
        <ContentTray
          heading="Recent"
          image="/images/clock-light.svg"
          allUrl="planner/recent"
        >
          {data?.getAllRecentPlans?.plans?.map((item) => (
            <div key={item?._id}>
              <div className="mr-10">
                <PlanCard
                  planId={item?._id}
                  title={item.planName}
                  image={item?.image?.url}
                  isCollectionIds={item?.planCollections}
                  noOfComments={item?.commentsCount}
                  setOpenCollectionModal={setOpenCollectionModal}
                  planComrFrom="list"
                />
              </div>
            </div>
          ))}
        </ContentTray>
      </div>
      <div className="mt-40">
        <ContentTray
          heading="Popular"
          image="/images/fire-alt-light.svg"
          allUrl="planner/popular"
        >
          {data?.getAllPopularPlans?.plans?.map((item) => (
            <div key={item?._id}>
              <div className="mr-10">
                <PlanCard
                  planId={item?._id}
                  title={item.planName}
                  image={item?.image?.url}
                  isCollectionIds={item?.planCollections}
                  noOfComments={item?.commentsCount}
                  setOpenCollectionModal={setOpenCollectionModal}
                  planComrFrom="list"
                />
              </div>
            </div>
          ))}
        </ContentTray>
      </div>
    </Fragment>
  );
};

export default PlanDiscovery;
