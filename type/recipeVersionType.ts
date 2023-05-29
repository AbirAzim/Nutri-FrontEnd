export interface RecipeVersionType {
  _id: string;
  recipeId: string;
  recipeInstructions: string[];
  postfixTitle: string;
  description: string;
  ingredients: Ingredient[];
  servingSize: number;
}

export interface Ingredient {
  ingredientId: IngredientId;
  portions: Portion[];
  weightInGram: number;
  selectedPortion: SelectedPortion;
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
