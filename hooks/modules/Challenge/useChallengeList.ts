import { ApolloCache, useMutation } from "@apollo/client";
import {
  ACTIVATE_CHALLENGE,
  CREATE_CHALLENGE,
  DELETE_CHALLENGE,
  EDIT_CHALLENGE,
  GET_CHALLENGES,
} from "../../../graphql/Challenge";

const useAddChallenge = (userId) => {
  const [addPost, addState] = useMutation(CREATE_CHALLENGE, {
    update(cache, { data: { createUserChallenge } }) {
      const definition = {
        query: GET_CHALLENGES,
        variables: {
          memberId: userId,
        },
      };
      const { getMyChallengeList } = cache.readQuery<any>(definition);
      cache.writeQuery({
        ...definition,
        data: {
          getMyChallengeList: getMyChallengeList.concat(createUserChallenge),
        },
      });
    },
  });
  return [addPost, addState];
};

const useEditChallenge = (userId) => {
  const [editPost, editState] = useMutation(EDIT_CHALLENGE, {
    refetchQueries: ["Get30DaysChallenge"],
    update(cache, { data: { editUserChallenge } }) {
      const definition = {
        query: GET_CHALLENGES,
        variables: {
          memberId: userId,
        },
      };
      const { getMyChallengeList } = cache.readQuery<any>(definition);
      console.log(editUserChallenge, getMyChallengeList);
      cache.writeQuery({
        ...definition,
        data: {
          getMyChallengeList: getMyChallengeList.map((challenge) => {
            if (challenge?._id === editUserChallenge?._id) {
              return editUserChallenge;
            } else {
              return challenge;
            }
          }),
        },
      });
    },
  });
  return [editPost, editState];
};

const useDeleteChallenge = (userId) => {
  const [deleteChallenge, deleteState] = useMutation(DELETE_CHALLENGE, {
    update(cache, { data: { deleteUserChallenge } }) {
      const definition = {
        query: GET_CHALLENGES,
        variables: {
          memberId: userId,
        },
      };
      const { getMyChallengeList } = cache.readQuery<any>(definition);
      cache.writeQuery({
        ...definition,
        data: {
          getMyChallengeList: getMyChallengeList.filter(
            (challenge) => challenge?._id !== deleteUserChallenge,
          ),
        },
      });
    },
  });
  return [deleteChallenge, deleteState];
};

const useActivateChallenge = (userId) => {
  const [activateChallenge, activateState] = useMutation(ACTIVATE_CHALLENGE, {
    refetchQueries: ["Get30DaysChallenge"],
    update(cache, { data: { activateChallenge } }) {
      const definition = {
        query: GET_CHALLENGES,
        variables: {
          memberId: userId,
        },
      };
      const { getMyChallengeList } = cache.readQuery<any>(definition);
      const value = getMyChallengeList.map((challenge) =>
        challenge?._id === activateChallenge
          ? { ...challenge, isActive: true }
          : { ...challenge, isActive: false },
      );
      cache.writeQuery({
        ...definition,
        data: {
          getMyChallengeList: getMyChallengeList.map((challenge) =>
            challenge?._id === activateChallenge
              ? { ...challenge, isActive: true }
              : { ...challenge, isActive: false },
          ),
        },
      });
    },
  });
  return [activateChallenge, activateState];
};

export {
  useAddChallenge,
  useEditChallenge,
  useDeleteChallenge,
  useActivateChallenge,
};
