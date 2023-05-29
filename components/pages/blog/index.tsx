import { useQuery } from "@apollo/client";
import React, { FC, useState } from "react";
import AContainer from "../../../containers/A.container";
import GET_ALL_GENERAL_BLOG_FOR_CLIENT from "../../../gqlLib/blog/query/getAllGeneralBlogForClient";
import BlogCard from "./blogCard";
import SkeletonCollectionRecipe from "../../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollectionRecipe";
import { BlogListType } from "../../../type/blog";
import styles from "./BlogList.module.scss";
import CommonSearchBar from "../../searchBar/CommonSearchBar";
import WikiBanner from "../../wiki/wikiBanner/WikiBanner";
import ErrorPage from "../404Page";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import ShowLastModifiedCollection from "../../showLastModifiedCollection/ShowLastModifiedCollection";
import { setIsOpenBlogCollectionTray } from "../../../redux/slices/blogSlice";

const BlogList = () => {
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const { dbUser } = useAppSelector((state) => state?.user);
  const { lastModifiedBlogCollection } = useAppSelector((state) => state?.blog);
  const [blogSearchInput, setBlogSearchInput] = useState("");
  const dispatch = useAppDispatch();
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

  if (generalBlogLoading) {
    return (
      <Layout
        blogSearchInput={blogSearchInput}
        setBlogSearchInput={setBlogSearchInput}
      >
        <SkeletonCollectionRecipe style={{ marginTop: "20px" }} />;
      </Layout>
    );
  }
  if (generalBlogError) {
    return (
      <Layout
        blogSearchInput={blogSearchInput}
        setBlogSearchInput={setBlogSearchInput}
      >
        <ErrorPage />;
      </Layout>
    );
  }

  return (
    <Layout
      blogSearchInput={blogSearchInput}
      setBlogSearchInput={setBlogSearchInput}
    >
      <div className={styles.blogCardContainer}>
        {generalBlogData?.getAllGeneralBlogForClient?.map(
          (blog: BlogListType) => {
            return (
              <BlogCard
                key={blog?._id}
                blogData={blog}
                setOpenLastModifiedCollectionModal={setOpenCollectionModal}
              />
            );
          },
        )}
      </div>
      <ShowLastModifiedCollection
        open={openCollectionModal}
        setOpen={setOpenCollectionModal}
        shouldCloseOnOverlayClick={true}
        lastModifiedCollectionName={lastModifiedBlogCollection?.name}
        openCollectionPanel={() => {
          dispatch(setIsOpenBlogCollectionTray(true));
          setOpenCollectionModal(false);
        }}
      />
    </Layout>
  );
};

const Layout: FC<{
  blogSearchInput?: string;
  setBlogSearchInput?: (agr: string) => void;
}> = ({ children, blogSearchInput, setBlogSearchInput }) => {
  return (
    <AContainer
      headerIcon="/icons/book_light.svg"
      headerTitle="Blog Discovery"
      showBlogCollectionTray={{
        show: true,
        showPanle: "left",
        showTagByDeafult: true,
      }}
      headTagInfo={{
        title: "Blog",
        description: "blog",
      }}
    >
      <div className={styles.blogPageLayout}>
        <CommonSearchBar
          input={blogSearchInput}
          handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBlogSearchInput(e.target.value);
          }}
        />

        <WikiBanner />
        {children}
      </div>
    </AContainer>
  );
};

export default BlogList;
