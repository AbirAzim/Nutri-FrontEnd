import { gql } from "@apollo/client";

const DELETE_COMMENT = gql`
  mutation Mutation($data: RemoveCommentInput!) {
    removeComment(data: $data) {
      comments {
        _id
        comment
        createdAt
        updatedAt
        userId {
          _id
          email
          displayName
          firstName
          image
          lastName
        }
      }
      recipe {
        _id
        averageRating
        numberOfRating
        totalRating
      }
    }
  }
`;
export default DELETE_COMMENT;
