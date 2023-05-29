const isEmptyObj = (obj: object): boolean =>
  Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;

export default isEmptyObj;
