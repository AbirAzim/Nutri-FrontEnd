// Detecting whether it is a function In fact, it is good to write isFunction directly after writing, so as to avoid repeated writing judgments
export const isFunction = (obj) => {
  return (
    typeof obj === "function" &&
    typeof obj.nodeType !== "number" &&
    typeof obj.item !== "function"
  );
};
