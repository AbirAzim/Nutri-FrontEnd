// Verify phone number
export const validatePhoneNum = (mobile) => {
  const reg = /^1[3,4,5,6,7,8,9]\d{9}$/;
  return reg.test(mobile);
};
