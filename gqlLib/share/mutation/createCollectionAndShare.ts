import { gql } from "@apollo/client";

const CREATE_COLLECTION_AND_SHARE = gql`
  mutation CreateCollectionAndShare($data: CreateNewCollectionAndShare!) {
    createCollectionAndShare(data: $data)
  }
`;

export default CREATE_COLLECTION_AND_SHARE;
