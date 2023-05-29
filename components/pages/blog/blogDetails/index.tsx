import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import AContainer from "../../../../containers/A.container";
import GET_A_GENERAL_BLOG_BY_SLUG from "../../../../gqlLib/blog/query/getAGeneralBlogBySlug";
import GET_ALL_GENERAL_BLOG_FOR_CLIENT from "../../../../gqlLib/blog/query/getAllGeneralBlogForClient";
import { useAppSelector } from "../../../../redux/hooks";
import { updateSidebarActiveMenuName } from "../../../../redux/slices/utilitySlice";
import SkeletonBlogDetails from "../../../../theme/skeletons/skeletonBlogDetails";
import ErrorPage from "../../404Page";
import styles from "./BlogDetails.module.scss";
import BlogDetailsCenter from "./BlogDetailsCenter";
import RelatedBlog from "./RelatedBlog";

const BlogDetails = () => {
  const { dbUser } = useAppSelector((state) => state?.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const { blog_slug } = router.query;
  const {
    data: blogData,
    loading: blogLoading,
    error: blogError,
  } = useQuery(GET_A_GENERAL_BLOG_BY_SLUG, {
    variables: { slug: blog_slug, memberId: dbUser._id },
  });
  const {
    data: generalBlogData,
    loading: generalBlogLoading,
    error: generalBlogError,
  } = useQuery(GET_ALL_GENERAL_BLOG_FOR_CLIENT, {
    variables: {
      currentDate: new Date().toISOString().slice(0, 10),
      memberId: dbUser._id,
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    dispatch(updateSidebarActiveMenuName("Blogs"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (blogLoading) {
    return (
      <Layout>
        <SkeletonBlogDetails />
      </Layout>
    );
  }
  if (blogError) {
    return (
      <Layout>
        <ErrorPage />
      </Layout>
    );
  }
  return (
    <Layout>
      <div className={styles.blogDetailsContainer}>
        <div className={styles.left}>
          <RelatedBlog
            relatedBlogs={
              generalBlogData?.getAllGeneralBlogForClient?.slice(0, 4) || []
            }
          />
        </div>
        <div className={styles.center}>
          <BlogDetailsCenter blogDetails={blogData?.getAgeneralBlogBySlug} />
        </div>
      </div>
    </Layout>
  );
};

const Layout: FC = ({ children }) => {
  return (
    <AContainer
      headerIcon="/icons/book_light.svg"
      headerTitle="Blog details"
      logo={true}
      showBlogCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
      headTagInfo={{
        title: "Blog details",
        description: "blog details",
      }}
    >
      {children}
    </AContainer>
  );
};

export default BlogDetails;
