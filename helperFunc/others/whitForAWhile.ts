const wait = async (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export default wait;
