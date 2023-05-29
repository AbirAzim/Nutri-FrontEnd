// Check if it is a safe array, if not, return an empty array here with the isArray method
export const safeArray = (array) => {
  return Array.isArray(array) ? array : [];
};
