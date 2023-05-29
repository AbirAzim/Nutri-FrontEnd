import { gql } from "@apollo/client";

const ACCEPT_COLLECTION_SHARE = gql`
  mutation AcceptShareCollection($token: String!, $userId: String!) {
    acceptShareCollection(token: $token, userId: $userId) {
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

export default ACCEPT_COLLECTION_SHARE;
