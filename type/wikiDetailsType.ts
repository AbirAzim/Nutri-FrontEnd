import { Portion, WikiType } from "./wikiListType";

export interface WikiDetailsIngredientType {
  wikiTitle: string;
  wikiDescription: string;
  wikiCoverImages: string[];
  wikiFeatureImage: null | string;
  bodies: string;
  type: WikiType;
  category: null | string;
  publishedBy: string;
  isPublished: boolean;
  commentsCount: number;
  portions: Portion[];
  ingredientBookmarkList: IngredientBookmarkListType[];
}

export interface WikiDetailsNutrientType {
  wikiTitle: string;
  wikiDescription: string;
  wikiCoverImages: string[];
  wikiFeatureImage: null | string;
  bodies: string;
  type: WikiType;
  category: null | string;
  publishedBy: string;
  isPublished: boolean;
  commentsCount: number;
  nutrientBookmarkList: NutrientBookmarkListType[];
  ingredients: {
    portion: Portion;
    ingredientId: string;
    name: string;
    value: string;
    units: string;
  };
}

export interface NutrientBookmarkListType {
  nutrientId: {
    _id: string;
    nutrientName: string;
  };
  customBookmarkName: null | string;
  link: string;
  active: boolean;
}

export interface IngredientBookmarkListType {
  ingredientId: {
    _id: string;
    ingredientName: string;
    portions: Portion[];
  };
  customBookmarkName: null | string;
  link: string;
  active: boolean;
}
