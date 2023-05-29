import { gql } from "@apollo/client";

const REJECT_RECIPE_SHARE = gql`
  mutation RejectRecipeShare($userId: String!, $token: String!) {
    rejectRecipeShare(userId: $userId, token: $token) {
      shareNotifications {
        _id
        image
        type
        shareData {
          _id
          entityId {
            _id
            name
          }
        }
        sharedBy {
          _id
          displayName
          email
          firstName
          lastName
          image
        }
      }
      totalNotification
    }
  }
`;

export default REJECT_RECIPE_SHARE;
