import {
  RecipeBlendCategory,
  VersionDataType,
  Image,
  IngredientType,
} from "./recipeDetailsType";
import { RecipeBrandType, RecipeCreatorInfo } from "./recipeType";

export interface CompareRecipeType {
  addedToCompare: boolean;
  notes: number;
  userCollections: string[];
  defaultVersion: VersionDataType;
  allRecipes: boolean;
  isMatch: boolean;
  myRecipes: boolean;
  versionCount: number;
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
    brand?: RecipeBrandType;
  };
}
