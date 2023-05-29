import { RecipeCreatorInfo } from "./recipeType";

export type IngredientStatusType = "ok" | "partial_ok" | "not_ok";

export interface RecipeDetailsType {
  addedToCompare: boolean;
  notes: number;
  userCollections: string[];
  defaultVersion: VersionDataType;
  allRecipes: boolean;
  isMatch: boolean;
  myRecipes: boolean;
  versionsCount: number;
  personalRating?: number;
  recipeId: {
    _id: string;
    userId: RecipeCreatorInfo;
    name: string;
    prepTime: any;
    description: string;
    versionDiscription: string;
    recipeIngredients: any[];
    recipeInstructions: string[];
    totalRating: number;
    numberOfRating: number;
    averageRating: number;
    totalViews: number;
    recipeBlendCategory: RecipeBlendCategory;
    ingredients: IngredientType[];
    image: Image[];
    servingSize: string;
    servings: number;
    originalVersion: VersionDataType;
    token: string;
  };
  turnedOnVersions: VersionDataType[];
  turnedOffVersions: VersionDataType[];
  tempVersionInfo?: {
    isShareAble: boolean;
    isOriginalVersion: boolean;
    version: VersionDataType;
  };
}

export interface VersionDataType {
  _id?: string;
  servingSize?: number;
  recipeId?: string;
  recipeInstructions?: any[];
  postfixTitle: string;
  description?: string;
  ingredients?: IngredientType[] | ErrorIngredientsType[];
  errorIngredients?: ErrorIngredientsType[];
  selectedImage?: string;
  isVersionSharable?: boolean;
  isDefault?: boolean;
  calorie?: {
    value: number;
  };
  gigl?: {
    netCarbs: number;
  };
}

export interface RecipeBlendCategory {
  name: string;
  _id: string;
}

export interface ErrorIngredientsType extends IngredientType {
  errorString: string;
  errorIngredientId: string;
  qaId: string;
  ingredientStatus?: IngredientStatusType;
}

export interface IngredientType {
  comment?: string;
  ingredientId: IngredientId;
  portions: Portion[];
  weightInGram: number;
  selectedPortion: SelectedPortion;
  ingredientStatus?: IngredientStatusType;
  errorString?: string;
}

export interface IngredientId {
  ingredientName: string;
  _id: string;
  images: string[];
  featuredImage?: string;
}

export interface Portion {
  name: string;
  gram: number;
  default: boolean;
  quantity: any;
}

export interface SelectedPortion {
  name: string;
  quantity: number;
  gram: number;
}

export interface Image {
  image: string;
  default: boolean;
}
