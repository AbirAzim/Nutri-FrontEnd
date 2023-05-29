//First of all, we need to determine whether the current object is a valid object
export const isValidObject = (obj) => {
  return (
    typeof obj === "object" && !Array.isArray(obj) && Object.keys(obj).length
  );
};
// The above function is used directly here. If it is valid, it will return itself, and if it is invalid, it will return an empty object.
//const safeObject = (obj) => (isVaildObject(obj) ? obj : {});
