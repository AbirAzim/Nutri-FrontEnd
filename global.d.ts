declare global {
  interface Image {
    hash: string;
    url: string;
  }

  interface IAdminCollection {}

  interface IUser {}

  interface IAdmin {}

  interface IBrand {}

  interface IRecipeBlendCategory {}

  interface IRecipeVersion {}

  interface IRecipe {
    name?: string;
    image?: { image: string; default: boolean }[];
    servings?: number;
    datePublished?: string;
    description?: string;
    prepTime?: string;
    cookTime?: string;
    totalTime?: string;
    recipeYield?: string;
    recipeCuisines?: string[];
    author?: string[];
    recipeBlendCategory?: IRecipeBlendCategory;
    brand?: IBrand;
    foodCategories?: string[];
    foodCategories?: string[];
    servingSize?: 0;
    isPublished?: boolean;
    url?: string;
    favicon?: string;
    addedByAdmin?: boolean;
    userId?: IUser;
    adminIds?: IAdmin[];
    adminId?: IAdmin;
    discovery?: boolean;
    global?: boolean;
    numberOfRating?: number;
    totalRating?: number;
    totalViews?: number;
    averageRating?: number;
    seoTitle?: string;
    seoSlug?: string;
    seoCanonicalURL?: string;
    seoSiteMapPriority?: number;
    seoKeywords?: string[];
    seoMetaDescription?: string;
    collections: IAdminCollection[];
  }
}

export {};
