import { WikiType } from "./wikiListType";

export interface WikiCompareList {
  _id: string;
  category: string;
  portions: Portion[];
  featuredImage: string;
  wikiTitle: string;
  wikiDescription: string;
  type: WikiType;
  image: string;
  publishedBy: string;
  commentsCount: number;
  hasInCompare: boolean;
}

export interface Portion {
  default: boolean;
  meausermentWeight: string;
  measurement: string;
}
