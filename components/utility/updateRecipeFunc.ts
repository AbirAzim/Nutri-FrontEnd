const updateRecipeFunc = (arr: any[], obj: object, id: string): any[] => {
  if (!arr?.length) return arr;
  return arr?.map((recipe) =>
    recipe?._id === id ? { ...recipe, ...obj } : recipe,
  );
};

export default updateRecipeFunc;
