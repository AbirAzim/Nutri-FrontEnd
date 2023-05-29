import React from "react";
import { BlogListType } from "../../../../type/blog";
import PanelHeader from "../../../recipe/share/panelHeader/PanelHeader";
import useWindowSize from "../../../utility/useWindowSize";
import BlogCard from "../blogCard";
import CustomSlider from "../../../../theme/carousel/carousel.component";
const responsiveSetting = {
  slidesToShow: 4,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

interface Props {
  relatedBlogs: BlogListType[];
}

const RelatedBlog = ({ relatedBlogs }: Props) => {
  const { width } = useWindowSize();

  return (
    <>
      <PanelHeader
        icon={
          "/images/telescope.svg"
          // <FontAwesomeIcon icon={faChartColumn} fontSize="24" />
        }
        title={`Related blog`}
      />
      {width < 1024 ? (
        <CustomSlider moreSetting={responsiveSetting}>
          {relatedBlogs?.map((blog: BlogListType) => {
            return <BlogCard key={blog?._id} blogData={blog} />;
          })}
        </CustomSlider>
      ) : (
        relatedBlogs?.map((blog: BlogListType) => {
          return <BlogCard key={blog?._id} blogData={blog} />;
        })
      )}
    </>
  );
};

export default RelatedBlog;
