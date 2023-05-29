import { gql } from "@apollo/client";

const CREATE_NEW_USER = gql`
  mutation CreateNewUser($data: NewUserInput!) {
    createNewUser(data: $data) {
      _id
      bio
      yourBlender
      provider
      displayName
      firstName
      orderHistoty
      lastName
      email
      location
      myCart
      recentViewedProducts
      image
      createdAt
      configuration {
        _id
        gender
        age {
          quantity
          years
          months
        }
        weightInKilograms
        heightInCentimeters
        pregnantOrLactating
        activity
        dieteryLifeStyle
        allergies
        preExistingMedicalConditions
        meditcation
        whyBlending
      }
      compareLength
      wikiCompareCount
      isCreated
    }
  }
`;

export default CREATE_NEW_USER;
