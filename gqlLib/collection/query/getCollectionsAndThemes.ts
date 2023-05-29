import { gql } from "@apollo/client";

const GET_COLLECTIONS_AND_THEMES = gql`
  query GetUserCollectionsAndThemes($userId: String!) {
    getUserCollectionsAndThemes(userId: $userId) {
      collections {
        _id
        name
        slug
        recipes
        image
        isShared
        sharedBy {
          _id
          email
          firstName
          displayName
          lastName
          image
        }
        canContribute
        canShareWithOther
        description
        personalizedName
      }
    }
  }
`;

export default GET_COLLECTIONS_AND_THEMES;
