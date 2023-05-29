import { gql } from "@apollo/client";

const REJECT_COLLECTION_SHARE = gql`
  mutation RejectShareCollection($token: String!, $userId: String!) {
    rejectShareCollection(token: $token, userId: $userId) {
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

export default REJECT_COLLECTION_SHARE;
