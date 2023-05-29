import { createSlice } from "@reduxjs/toolkit";
import {
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  isWithinInterval,
} from "date-fns";

export type IPlannerRecipe = {
  _id: string;
  name: string;
  category: string;
  rxScore: number;
  calorie: number;
  ingredients?: any[];
};

type IPlanner = {
  id: string;
  date: string;
  recipes: IPlannerRecipe[];
};

export interface IPlannerIngredients {
  ingredientId: { _id: string; ingredientName: string };
  selectedPortion: {
    name: string;
    quantity: number;
    gram: number;
  };
}

interface IPost {
  _id: string;
  name: string;
  recipeBlendCategory: {
    _id: string;
    name: string;
  };
  ingredients: {
    ingredientId: {
      ingredientName: string;
    };
  }[];
  rxScore: number;
  calories: number;
  gl: number;
  note: string;
}

export interface IChallengePosts {
  _id: string;
  date: string;
  images: string[];
  posts: IPost[];
}

interface PlannerState {
  challenges: [];
  planner: {
    startDate: Date;
    endDate: Date;
  };
  planners: IPlanner[];
  post: {
    recipe: {
      _id: string;
      name: string;
      image: string;
      ingredients: IPlannerIngredients[];
      category: string;
    };
  };
}

const initialRecipe = {
  _id: "",
  name: "",
  image: "",
  category: "",
  ingredients: [],
};
const initialState: PlannerState = {
  challenges: [],
  planner: {
    startDate: startOfWeek(new Date(), { weekStartsOn: 1 }),
    endDate: endOfWeek(new Date(), { weekStartsOn: 1 }),
  },
  planners: [],
  post: {
    recipe: initialRecipe,
  },
};

export const PlannerSlice = createSlice({
  name: "Planner",
  initialState,
  reducers: {
    setChallenge: (state, action) => {
      if (action.payload.length === 0) return;
      state.challenges = action.payload;
    },

    //PLANNER

    gotoPreviousWeek: (state) => {
      state.planner.startDate = subWeeks(state.planner.startDate, 1);
      state.planner.endDate = subWeeks(state.planner.endDate, 1);
    },

    gotoNextWeek: (state) => {
      state.planner.startDate = addWeeks(state.planner.startDate, 1);
      state.planner.endDate = addWeeks(state.planner.endDate, 1);
    },

    setPlanners: (state, action) => {
      state.planners = action.payload.map((planner) => ({
        id: planner._id,
        date: planner.formatedDate,
        recipes: planner.recipes.map((recipe) => ({
          _id: recipe?._id,
          name: recipe?.name,
          category: recipe?.recipeBlendCategory?.name,
          rxScore: 786,
          calorie: 250,
          ingredients: recipe?.ingredients,
        })),
      }));

      // state.planners = [...state.planners, ...planners].sort(
      //   //@ts-ignore
      //   (a: any, b: any) => new Date(a.date) - new Date(b.date),
      // );
    },

    addPlanner: (
      state,
      action: { payload: { id: string; date: string; recipe: IPlannerRecipe } },
    ) => {
      const withinInterval = isWithinInterval(new Date(action.payload.date), {
        start: state.planner.startDate,
        end: state.planner.endDate,
      });
      if (!withinInterval) return;

      const date = action.payload.date;
      const planner = state.planners.find((p) => p.date === date);
      if (planner) {
        planner.recipes.push(action.payload.recipe);
      } else {
        state.planners.push({
          id: action.payload.id,
          date,
          recipes: [action.payload.recipe],
        });
        state.planners.sort(
          //@ts-ignore
          (a: any, b: any) => new Date(a.date) - new Date(b.date),
        );
      }
    },

    deleteRecipe: (
      state,
      action: { payload: { recipeId: string; plannerId: string } },
    ) => {
      const plannerIdx = state.planners.findIndex(
        (p) => p.id === action.payload.plannerId,
      );
      const recipe = state.planners[plannerIdx].recipes.filter(
        (recipe) => recipe._id !== action.payload.recipeId,
      );
      if (recipe.length === 0) {
        state.planners.splice(plannerIdx, 1);
      } else {
        state.planners[plannerIdx] = {
          ...state.planners[plannerIdx],
          recipes: recipe,
        };
      }
    },

    clearAllPlanner: (state) => {
      state.planners = [];
    },

    // Upload Challenge
    resetForm: (state) => {
      state.post.recipe = initialRecipe;
    },

    // setRecipeInfo: (
    //   state,
    //   action: {
    //     payload: { _id: string; name: string; image: string; category: string };
    //   },
    // ) => {
    //   state.post.recipe._id = action.payload._id;
    //   state.post.recipe.name = action.payload.name;
    //   state.post.recipe.image = action.payload.image;
    //   state.post.recipe.category = action.payload.category;
    // },

    // setRecipeIngredients: (
    //   state,
    //   action: { payload: { ingredients: IPlannerIngredients[] } },
    // ) => {
    //   state.post.recipe.ingredients = action.payload.ingredients;
    // },

    addIngredient: (state, action) => {
      const ingredientItem = action.payload.ingredient;
      const qty = Math.floor(Math.random() * 10);
      const portion =
        ingredientItem?.portions.find((portion) => portion.default)
          ?.measurement || ingredientItem?.portions[0].measurement;
      const unit =
        portion?.measurement || ingredientItem?.portions[0].measurement;
      const weight =
        portion?.meausermentWeight ||
        ingredientItem?.portions[0].meausermentWeight;

      const ingredient = {
        ingredientId: {
          _id: ingredientItem.value,
          ingredientName: ingredientItem.label,
        },
        selectedPortion: {
          gram: qty * weight,
          name: unit,
          quantity: qty,
        },
      };

      state.post.recipe.ingredients.push(ingredient);
    },

    deleteIngredient: (state, action) => {
      const id = action.payload.id;
      state.post.recipe.ingredients = state.post.recipe.ingredients.filter(
        (i) => i.ingredientId._id !== id,
      );
    },
  },
});

export const {
  setChallenge,
  setPlanners,
  addPlanner,
  deleteRecipe,
  clearAllPlanner,
  // setRecipeInfo,
  // setRecipeIngredients,
  addIngredient,
  deleteIngredient,
  resetForm,
  gotoPreviousWeek,
  gotoNextWeek,
} = PlannerSlice.actions;

export default PlannerSlice.reducer;
//prod

