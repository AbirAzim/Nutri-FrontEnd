const isCSSLength = (value) =>
  /([-+]?[\d.]+)(%|[a-z]{1,2})/.test(String(value));

export default isCSSLength;
