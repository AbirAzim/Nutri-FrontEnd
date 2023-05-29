const randomNumber = (max: number = 100, min: number = 1) => {
  return Math.random() * (max - min) + min;
};

export default randomNumber;
