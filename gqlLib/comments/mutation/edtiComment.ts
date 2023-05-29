import { gql } from "@apollo/client";

const EDIT_COMMENT = gql`
  mutation EditComment($data: EditComment!) {
    editComment(data: $data) {
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
        totalRating
        numberOfRating
      }
    }
  }
`;
export default EDIT_COMMENT;
