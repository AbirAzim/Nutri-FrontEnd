import { gql } from "@apollo/client";

const CREATE_SHARE_COLLECTION_LINK = gql`
  mutation CreateShareCollectionLink($data: CreateNewShareCollectionLink!) {
    createShareCollectionLink(data: $data)
  }
`;

export default CREATE_SHARE_COLLECTION_LINK;
