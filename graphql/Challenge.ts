import { gql } from "@apollo/client";
/*
 * -------------------------------------------------*
 * CHALLENGE API
 * SETTINGS API
 * -------------------------------------------------*
 */
const CHALLENGE_FIELDS = gql`
  fragment ChallengePostFields on Challenge {
    _id
    date: formattedDate
    disabled
    posts {
      _id
      recipeBlendCategory {
        _id
        name
      }
      name
      images {
        hash
        url
      }
      note
      ingredients {
        ingredientId {
          _id
          ingredientName
          featuredImage
        }
        selectedPortion {
          name
          quantity
          gram
        }
      }
    }
  }
`;
const CHALLENGE_INFO_FIELDS = gql`
  fragment ChallengeInfoFields on ChallengeInfo {
    challengeId
    longestStreak
    currentStreak
    blendScore
    daysRemaining
    challengeName
    totalChallengePosts
    startDate
    endDate
    viewOnly
    days
    memberInfo {
      image
    }
    sharedWith {
      memberId {
        _id
        displayName
        image
      }
      blendScore
    }
    topIngredients {
      ingredientId {
        ingredientName
        featuredImage
      }
      count
    }
  }
`;

const CHALLENGE_LIST_FIELDS = gql`
  fragment ChallengeFields on UserChallenge {
    _id
    challengeName
    days
    isActive
    startingDate
    startDate: startDateString
    endDate: endDateString
    description
    notification
  }
`;

export const GET_CHALLENGES = gql`
  query GetAllChallenges($memberId: String!) {
    getMyChallengeList(memberId: $memberId) {
      ...ChallengeFields
    }
  }
  ${CHALLENGE_LIST_FIELDS}
`;

export const CREATE_CHALLENGE = gql`
  mutation CreateChallenge($data: CreateUserChallenge!) {
    createUserChallenge(data: $data) {
      ...ChallengeFields
    }
  }
  ${CHALLENGE_LIST_FIELDS}
`;

export const EDIT_CHALLENGE = gql`
  mutation EditChallenge($data: CreateEditUserChallenge!) {
    editUserChallenge(data: $data) {
      ...ChallengeFields
    }
  }
  ${CHALLENGE_LIST_FIELDS}
`;

export const DELETE_CHALLENGE = gql`
  mutation DeleteChallenge($challengeId: String!) {
    deleteUserChallenge(challengeId: $challengeId)
  }
`;

export const ACTIVATE_CHALLENGE = gql`
  mutation ActivateChallenge(
    $prevChallenge: String
    $newChallenge: String!
    $memberId: String!
  ) {
    activateChallenge(
      previousDefaultChallengeId: $prevChallenge
      challengeId: $newChallenge
      memberId: $memberId
    )
  }
`;

export const GET_30DAYS_CHALLENGE = gql`
  query Get30DaysChallenge(
    $userId: String!
    $startDate: String
    $challengeId: String
    $token: String
  ) {
    getMyThirtyDaysChallenge(
      memberId: $userId
      startDate: $startDate
      challengeId: $challengeId
      token: $token
    ) {
      challenge {
        ...ChallengePostFields
      }
      challengeInfo {
        ...ChallengeInfoFields
      }
    }
  }
  ${CHALLENGE_FIELDS}
  ${CHALLENGE_INFO_FIELDS}
`;

export const CREATE_CHALLENGE_POST = gql`
  mutation CreateChallengePost($data: CreateChallengePost!) {
    createChallengePost(data: $data) {
      challenge {
        ...ChallengePostFields
      }
      challengeInfo {
        ...ChallengeInfoFields
      }
    }
  }
  ${CHALLENGE_FIELDS}
  ${CHALLENGE_INFO_FIELDS}
`;

export const EDIT_CHALLENGE_POST = gql`
  mutation EditChallengePost($data: EditChallengePost!) {
    editAChallengePost(data: $data) {
      challenge {
        ...ChallengePostFields
      }
      challengeInfo {
        ...ChallengeInfoFields
      }
    }
  }
  ${CHALLENGE_FIELDS}
  ${CHALLENGE_INFO_FIELDS}
`;

export const DELETE_CHALLENGE_POST = gql`
  mutation DeleteChallengePost($postId: String!, $challengeId: String!) {
    deleteAChallengePost(postId: $postId, docId: $challengeId)
  }
`;

export const COPY_CHALLENGE_POST = gql`
  mutation DuplicateChallenge(
    $memberId: String!
    $date: String!
    $postId: String!
    $challengeId: String!
  ) {
    copyAChallengePost(
      memberId: $memberId
      assignDate: $date
      postId: $postId
      docId: $challengeId
    )
  }
`;

export const MOVE_CHALLENGE_POST = gql`
  mutation DuplicateChallenge(
    $memberId: String!
    $date: String!
    $postId: String!
    $challengeId: String!
  ) {
    moveAChallengePost(
      memberId: $memberId
      assignDate: $date
      postId: $postId
      docId: $challengeId
    )
  }
`;

export const CHALLENGE_GALLERY = gql`
  query GetChallengeGallery($memberId: String!) {
    getAChallengeGallery(memberId: $memberId) {
      images
      assignDate
    }
  }
`;

export const SHARE_CHALLENGE = gql`
  mutation ShareChallenge($userId: String!, $challengeId: String!) {
    shareGlobalChallenge(memberId: $userId, challengeId: $challengeId)
  }
`;

export const GET_SHARED_CHALLENGE_DETAILS = gql`
  query GetSharedChallengeInfo(
    $memberId: String!
    $challengeId: String!
    $token: String!
  ) {
    getChallengeInfoById(
      token: $token
      memberId: $memberId
      challengeId: $challengeId
    ) {
      challengeName
      memberInfo {
        _id
        displayName
        firstName
      }
    }
  }
`;

export const INVITE_CHALLENGE = gql`
  mutation InviteChallenge(
    $shareWithOther: Boolean!
    $emails: [String!]!
    $user: String!
    $challengeId: String!
  ) {
    inviteToChallenge(
      canInviteWithOthers: $shareWithOther
      invitedWith: $emails
      invitedBy: $user
      challengeId: $challengeId
    )
  }
`;

export const ACCEPT_CHALLENGE = gql`
  mutation AcceptChallenge($user: String!, $token: String!) {
    acceptChallenge(memberId: $user, inviteId: $token)
  }
`;

export const GET_INVITE_CHALLENGE_DETAILS = gql`
  query GetInviteChallenge($id: String!) {
    getInviteChallengeInfo(inviteId: $id) {
      invite {
        invitedBy {
          displayName
        }
        challengeId {
          challengeName
        }
      }
      sharedWith {
        memberId {
          _id
          displayName
        }
        canInviteWithOthers
        blendScore
      }
      topIngredients {
        ingredientId {
          _id
          ingredientName
        }
        count
      }
    }
  }
`;

export const GET_RECENT_CHALLENGES = gql`
  query GetRecentChallenges($userId: String!, $startDate: String!) {
    getLastSevenDaysChallenge(startDate: $startDate, memberId: $userId) {
      challenge {
        _id
        assignDate
        date: formattedDate
        disabled
        posts {
          recipeBlendCategory {
            _id
            name
          }
        }
      }
      challengeInfo {
        blendScore
      }
    }
  }
`;
