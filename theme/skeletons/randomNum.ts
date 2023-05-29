const randomNum = (value = 100): number => {
  const result = Math.floor(Math.random() * value);
  return result >= 30 ? result : result + 10;
};

export default randomNum;
