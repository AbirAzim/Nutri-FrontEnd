export function getColorFun(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

//getColorFun(178, 232, 55); // The output here is #b2e837
