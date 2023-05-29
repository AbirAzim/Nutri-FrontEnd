export interface RecipeType {
  datePublished: null;
  name: string;
  recipeIngredients: string[];
  recipeBlendCategory: RecipeBlendCategory;
  testIngredient: any[];
  image: any[];
  description: string;
  prepTime: null;
  cookTime: null;
  totalTime: null;
  _id: string;
  url: null;
  favicon: null;
  averageRating?: number;
  numberOfRating?: number;
  ingredients: Ingredient[];
  notes: number;
  addedToCompare: boolean;
  userCollections: string[];
  defaultVersion: DefaultVersion;
  isMatch: boolean;

  recipeVersion: RecipeSmallVersionType[];
  token?: string;
  recipeId?: {
    brand?: RecipeBrandType;
    userId: null | RecipeCreatorInfo;
    [key: string]: any;
  };
  allRecipes?: boolean;
  myRecipes?: boolean;
  versionCount: number;
  personalRating?: number;
}

export interface RecipeBrandType {
  _id: string;
  brandImage: string;
  brandName: string;
}

export interface RecipeSmallVersionType {
  _id: string;
  isDefault: boolean;
  isOriginal: boolean;
  postfixTitle: string;
  description: string;
}

export interface RecipeCreatorInfo {
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
  image: string;
}
export interface DefaultVersion {
  postfixTitle: string;
  _id: string;
  ingredients?: Ingredient[];
  description?: string;
  calorie?: {
    value: number;
  };
  gigl?: {
    netCarbs: number;
  };
}

export interface Ingredient {
  ingredientId: IngredientID;
}

export interface IngredientID {
  _id: string;
  ingredientName: string;
}

export interface RecipeBlendCategory {
  name: string;
}

export type ReferenceOfRecipeUpdateFuncType = (
  id: string,
  obj: { [key: string]: any },
  innerLabel?: "defaultVersion" | "recipeId",
) => void;
