import { gql } from "@apollo/client";

const ADD_NEW_BLOG_COLLECTION = gql`
  mutation AddNewBlogCollection($data: CreateNewBlogCollection!) {
    addNewBlogCollection(data: $data) {
      _id
      blogs
      slug
      name
      image
      memberId
      collectionDataCount
    }
  }
`;

export default ADD_NEW_BLOG_COLLECTION;
