export const compareRecipeResponsiveSetting = {
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: false,
  arrows: false,
  infinite: false,
  dots: true,
  //dotsClass: styles.button__bar,

  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
