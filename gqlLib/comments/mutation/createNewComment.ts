import { gql } from "@apollo/client";

const CREATE_NET_COMMENT = gql`
  mutation Mutation($data: CreateComment!) {
    createComment(data: $data) {
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
export default CREATE_NET_COMMENT;
