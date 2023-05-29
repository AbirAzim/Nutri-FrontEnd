import { ErrorIngredientsType, IngredientType } from "./recipeDetailsType";

export interface VersionAddDataType {
  description?: string;
  ingredients?: IngredientType[] | ErrorIngredientsType[];
  errorIngredients?: ErrorIngredientsType[];
  postfixTitle: string;
  recipeId: string;
  recipeInstructions?: string[];
  servingSize?: number;
  userId: string;
  selectedImage?: string;
}
