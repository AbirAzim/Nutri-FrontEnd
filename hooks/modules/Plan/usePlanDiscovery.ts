import { useLazyQuery } from "@apollo/client";
import {
  GET_ALL_PLANS,
  GET_POPULAR_PLANS,
  GET_RECCOMENDED_PLANS,
  GET_RECENT_PLANS,
} from "../../../graphql/Planner";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { FEATURED_DICTIONARY } from "../../../data/Misc";

interface IPlanDiscoveryHook {
  page: number;
  setPage: any;
  limit?: number;
  query?: string;
  param?: string;
}

const useAllPlan = (props: IPlanDiscoveryHook) => {
  const { page, setPage, limit, query = "" } = props;
  const [plans, setPlans] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [getAllPlan, { loading }] = useLazyQuery(GET_ALL_PLANS);

  // OBSERVING THE LAST RECIPE POSITION OF THE LIST TO TRY TO FETCH MORE RECIPES
  const observer = useRef<any>();
  const lastPlanRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, setPage],
  );

  // RESETTING RECIPES ON QUERY OR CATEGORY CHANGE
  useEffect(() => {
    setPlans([]);
    setPage(1);
    // setHasMore(false);
  }, [query, setPage]);

  useEffect(() => {
    const getData = setTimeout(() => {
      getAllPlan({
        variables: {
          limit: limit || 10,
          page,
          memberId: userId,
          query,
        },
      }).then((response) => {
        const data = response.data?.getAllGlobalPlans;
        // if (data) return;
        setPlans((prevPlan) => [...prevPlan, ...data?.plans]);
        setHasMore(data?.plans?.length > 0);
      });
    }, 1000);
    return () => clearTimeout(getData);
  }, [getAllPlan, limit, page, userId, query]);

  return { plans, loading, observer: lastPlanRef };
};

const useFeaturedPlan = (props: IPlanDiscoveryHook) => {
  const { param, page, setPage } = props;

  const hasFetchedPlan = useRef(false);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const memberId = useAppSelector((state) => state.user?.dbUser?._id || "");

  // OBSERVING THE LAST RECIPE POSITION OF THE LIST TO TRY TO FETCH MORE RECIPES
  const observer = useRef<any>();
  const lastPlanRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, setPage],
  );

  const config = useMemo(
    () => ({
      variables: {
        memberId,
        limit: 8,
        page,
      },
      skip: memberId === "",
    }),
    [memberId, page],
  );

  const [getAllRecommendedRecipes] = useLazyQuery(GET_RECENT_PLANS);
  const [getAllPopularRecipes] = useLazyQuery(GET_RECCOMENDED_PLANS);
  const [getAllLatestRecipes] = useLazyQuery(GET_POPULAR_PLANS);

  useEffect(() => {
    async function fetchData(config) {
      setLoading(true);
      let response: any;
      switch (param) {
        case "recommended":
          response = await getAllRecommendedRecipes(config);
          break;
        case "popular":
          response = await getAllPopularRecipes(config);
          break;
        case "recent":
          response = await getAllLatestRecipes(config);
          break;
        default:
          return;
      }
      const data = response.data?.result;
      setResponse((prevPlan) => [...prevPlan, ...data?.plans]);
      setHasMore(data?.plans?.length > 0);
      setLoading(false);
    }

    if (param !== "" && !hasFetchedPlan.current) {
      fetchData(config);
      hasFetchedPlan.current = true;
    }
  }, [
    param,
    config,
    getAllRecommendedRecipes,
    getAllPopularRecipes,
    getAllLatestRecipes,
  ]);

  return { data: response, loading, observer: lastPlanRef };
};

export { useAllPlan, useFeaturedPlan };
