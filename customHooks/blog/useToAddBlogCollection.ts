import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import ADD_TO_LAST_MODIFIED_BLOG_COLLECTION from "../../gqlLib/blog/mutation/addTolastModifiedBlogCollection";
import { useAppDispatch } from "../../redux/hooks";
import {
  setIsActiveBlogForCollection,
  updateLastModifiedBlogCollection,
} from "../../redux/slices/blogSlice";
import useToUpdateBlogField from "./useToUpdateBlogFirld";

const useToAddBlogCollection = () => {
  const dispatch = useAppDispatch();
  const handleToUpdateBlog = useToUpdateBlogField();
  let timeOut;
  const [addToBlogCollection] = useMutation(
    ADD_TO_LAST_MODIFIED_BLOG_COLLECTION,
    { fetchPolicy: "network-only" },
  );
  const handleToAddBlogCollection = async (
    blogId: string = "",
    memberId: string = "",
    setOpenLastModifiedBlogCollectionModal: (arg: boolean) => void = () => {},
  ) => {
    try {
      const {
        data: { addToLastModifiedBlogCollection },
      } = await addToBlogCollection({
        variables: {
          blogId,
          memberId,
        },
      });

      dispatch(
        updateLastModifiedBlogCollection(addToLastModifiedBlogCollection),
      );
      dispatch(
        setIsActiveBlogForCollection({
          id: blogId,
          collectionIds: [addToLastModifiedBlogCollection?._id],
        }),
      );
      handleToUpdateBlog(blogId, {
        blogCollections: [addToLastModifiedBlogCollection?._id],
      });
      setOpenLastModifiedBlogCollectionModal(true);
      timeOut = setTimeout(() => {
        setOpenLastModifiedBlogCollectionModal(false);
      }, 5000);
    } catch (error) {}
  };
  useEffect(() => {
    return () => {
      clearTimeout(timeOut);
    };
  }, [timeOut]);

  return handleToAddBlogCollection;
};

export default useToAddBlogCollection;
