const bindTop = () => {
  // Method 1: This works, but it doesn't work very well
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;

  // Method 2: Scrolling through the timer will be visually smoother, without much lag effect
  const timeTop = setInterval(() => {
    // to control his sliding distance
    //@ts-ignore
    document.documentElement.scrollTop = scrollTopH.value -= 50;
    // Remember to clear the timer(*) when swiping to the top
    //@ts-ignore
    if (scrollTopH.value <= 0) {
      clearInterval(timeTop);
    }
  }, 10);
};

export default bindTop;
