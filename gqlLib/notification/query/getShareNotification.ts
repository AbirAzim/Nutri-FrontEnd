import { gql } from "@apollo/client";

const GET_SHARE_NOTIFICATION = gql`
  query GetShareNotification($userId: String!) {
    getShareNotification(userId: $userId) {
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

export default GET_SHARE_NOTIFICATION;
