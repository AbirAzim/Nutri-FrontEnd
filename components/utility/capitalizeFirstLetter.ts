//capitalize only the first letter of the string.
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default capitalizeFirstLetter;
