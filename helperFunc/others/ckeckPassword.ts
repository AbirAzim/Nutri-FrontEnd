// Check passwords consisting of 6 to 18 uppercase and lowercase alphanumeric underscores
export const validatePassword = (password) => {
  const reg = /^[a-zA-Z0-9_]{6,18}$/;
  return reg.test(password);
};
