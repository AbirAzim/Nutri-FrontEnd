import { gql } from "@apollo/client";

const EDIT_BLOG_COLLECTION = gql`
  mutation EditABlogCollection($data: EditBlogCollection!) {
    editABlogCollection(data: $data) {
      blogs
      _id
      collectionDataCount
      image
      name
      slug
    }
  }
`;

export default EDIT_BLOG_COLLECTION;
