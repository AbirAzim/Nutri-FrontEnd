import { gql } from "@apollo/client";

const ACCEPT_RECIPE_SHARE = gql`
  mutation AcceptRecipeShare($userId: String!, $token: String!) {
    acceptRecipeShare(userId: $userId, token: $token) {
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

export default ACCEPT_RECIPE_SHARE;
