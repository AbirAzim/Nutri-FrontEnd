import { gql } from "@apollo/client";

const EDIT_WIKI_COMMENTS = gql`
  mutation EditWikiComment($data: EditWikiComment!) {
    editWikiComment(data: $data) {
      _id
      comment
      updatedAt
    }
  }
`;

export default EDIT_WIKI_COMMENTS;
