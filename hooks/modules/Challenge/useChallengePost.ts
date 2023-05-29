import {
  ApolloCache,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { format, isWithinInterval } from "date-fns";
import { useMemo, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import {
  GET_30DAYS_CHALLENGE,
  CREATE_CHALLENGE_POST,
  EDIT_CHALLENGE_POST,
  GET_CHALLENGES,
} from "../../../graphql/Challenge";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useRouter } from "next/router";
import {
  setChallengeView,
  setChallengeInterval,
} from "../../../redux/slices/Challenge.slice";

const useThirtyDayChallenge = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const {
    activeDate,
    startDate,
    endDate,
    showPostForm: showUpload,
  } = useAppSelector((state) => state.challenge);

  const [getChallenges, { data }] = useLazyQuery(GET_30DAYS_CHALLENGE);

  const viewOnly = data?.getMyThirtyDaysChallenge?.challengeInfo?.viewOnly;

  useEffect(() => {
    if (
      userId === "" ||
      (![activeDate, startDate, endDate].includes("") &&
        isWithinInterval(new Date(activeDate), {
          start: new Date(startDate),
          end: new Date(endDate),
        }))
    )
      return;
    getChallenges({
      variables: {
        userId,
        startDate: activeDate,
        challengeId: router.query?.id,
        token: router.query?.token,
      },
    });
  }, [
    activeDate,
    endDate,
    getChallenges,
    router.query?.id,
    router.query?.token,
    startDate,
    userId,
  ]);

  useEffect(() => {
    const challenges = data?.getMyThirtyDaysChallenge?.challenge || [];
    if (challenges.length === 0) return;

    dispatch(setChallengeView(viewOnly));
    dispatch(
      setChallengeInterval({
        startDate: challenges[0]?.date,
        endDate: challenges[challenges.length - 1]?.date,
      }),
    );
  }, [data, dispatch, viewOnly]);

  return { challenge: data?.getMyThirtyDaysChallenge || [], viewOnly };
};

const update30DaysChallenge = (
  userId: string,
  cache: ApolloCache<any>,
  mutated,
) => {
  const definition = {
    query: GET_30DAYS_CHALLENGE,
    variables: {
      userId,
      startDate: "",
    },
  };
  const { getMyThirtyDaysChallenge } = cache.readQuery<any>(definition);
  console.log(mutated);
  const data = {
    challenge: getMyThirtyDaysChallenge.challenge.map((day) =>
      day.date === mutated?.challenge?.date ? mutated?.challenge : day,
    ),
    challengeInfo: mutated?.challengeInfo,
  };
  cache.writeQuery({
    ...definition,
    data: { getMyThirtyDaysChallenge: data },
  });
};

const useAddChallengePost = (userId) => {
  const [addPost, addState] = useMutation(CREATE_CHALLENGE_POST, {
    update(cache, { data: { createChallengePost } }) {
      update30DaysChallenge(userId, cache, createChallengePost);
    },
  });
  return [addPost, addState];
};

const useEditChallengePost = (userId) => {
  const [editPost, editState] = useMutation(EDIT_CHALLENGE_POST, {
    update(cache, { data: { editAChallengePost } }) {
      update30DaysChallenge(userId, cache, editAChallengePost);
      //! If date of the post is edited we need to remove the post from the previous date
    },
  });
  return [editPost, editState];
};

const defaultValues = {
  category: "",
  assignDate: "",
  recipeTitle: "",
  note: "",
};
const useChallengeForm = (setImages) => {
  const initValueSet = useRef(false);
  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, []),
  });
  const {
    isEditMode,
    title,
    images: postImages,
    category,
    startDate,
    notes,
  } = useAppSelector((state) => state.challenge.post);

  useEffect(() => {
    if (isEditMode && !initValueSet.current) {
      methods.reset({
        recipeTitle: title,
        category,
        assignDate: startDate,
        note: notes,
      });
      setImages(postImages);
      initValueSet.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, category, startDate, notes]);

  const onReset = () => {
    methods.reset(defaultValues);
  };

  return { methods, onReset };
};

export {
  useThirtyDayChallenge,
  useAddChallengePost,
  useEditChallengePost,
  useChallengeForm,
};
