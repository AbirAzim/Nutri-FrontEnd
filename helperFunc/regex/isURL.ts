const isURL = (url) => {
  const regex =
    /(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/;
  return regex.test(url);
};

export default isURL;
