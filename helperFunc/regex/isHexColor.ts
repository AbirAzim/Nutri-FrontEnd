const isHexColor = (hex) => {
  const regex = /#?([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})/;
  return regex.test(hex);
};

export default isHexColor;
