// Check 2-9 characters, false if not matched, true if matched
export const validateName = (name) => {
  const reg = /^[\u4e00-\u9fa5]{2,9}$/;
  return reg.test(name);
};
