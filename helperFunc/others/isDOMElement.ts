const isDOMElement = (value) =>
  typeof value === "object" &&
  value.nodeType === 1 &&
  typeof value.style === "object" &&
  typeof value.ownerDocument === "object";

export default isDOMElement;
