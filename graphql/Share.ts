import { gql } from "@apollo/client";

export const CREATE_SHARE_LINK = gql`
  mutation CreateShareLink($data: CreateNewShareLink!) {
    createShareLink(data: $data)
  }
`;

//prod
