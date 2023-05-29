import { gql } from "@apollo/client";

const GET_ALL_COMMENTS_FOR_A_RECIPE = gql`
  query GetAllCommentsForARecipe($data: GetAllComments!) {
    getAllCommentsForARecipe(data: $data) {
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
export default GET_ALL_COMMENTS_FOR_A_RECIPE;
