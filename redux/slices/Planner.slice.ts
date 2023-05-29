import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  isWithinInterval,
} from "date-fns";

export interface CurrentPlanInfoType {
  id: string;
  name: string;
  image: string;
}

export type IPlannerRecipe = {
  _id: string;
  name: string;
  category: string;
  rxScore: number;
  calorie: number;
  recipeBlendCategory?: any;
  ingredients?: any[];
};

type IPlanner = {
  id: string;
  date: string;
  recipes: IPlannerRecipe[];
};

interface LastModifiedPlanCollectionType {
  _id: string;
  name: string;
}
export type PlanComeFromType = "list" | "details" | "globalPlans" | "homePage";
interface ActivePlanForCollectionType {
  id: string;
  collectionIds: string[];
  planComeFrom: PlanComeFromType;
}

interface PlannerState {
  start: Date;
  end: Date;
  plans: IPlanner[];
  selectedDayRecipe: "";
  isOpenPlanCollectionTray: boolean;
  lastModifiedPlanCollection: LastModifiedPlanCollectionType;
  activePlanForCollection: ActivePlanForCollectionType;
  currentPlanInfoForComments: CurrentPlanInfoType;
  isPlanCommentsTrayOpen: boolean;
}

const initialState: PlannerState = {
  start: startOfWeek(new Date(), { weekStartsOn: 1 }),
  end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  plans: [],
  selectedDayRecipe: "",
  isOpenPlanCollectionTray: false,
  lastModifiedPlanCollection: {
    _id: "",
    name: "",
  },
  activePlanForCollection: {
    id: "",
    collectionIds: [],
    planComeFrom: "list",
  },
  currentPlanInfoForComments: {
    id: "",
    image: "",
    name: "",
  },
  isPlanCommentsTrayOpen: false,
};

export const PlannerSlice = createSlice({
  name: "Planner",
  initialState,
  reducers: {
    setWeek: (state, action) => {
      state.start = action.payload.start;
      state.end = action.payload.start;
    },

    gotoPreviousWeek: (state) => {
      state.start = subWeeks(state.start, 1);
      state.end = subWeeks(state.end, 1);
    },

    gotoNextWeek: (state) => {
      state.start = addWeeks(state.start, 1);
      state.end = addWeeks(state.end, 1);
    },

    setPlanners: (state, action) => {
      state.plans = action.payload.map((planner) => ({
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
    },

    addPlanner: (
      state,
      action: { payload: { id: string; date: string; recipe: IPlannerRecipe } },
    ) => {
      const withinInterval = isWithinInterval(new Date(action.payload.date), {
        start: state.start,
        end: state.end,
      });
      if (!withinInterval) return;

      const date = action.payload.date;
      const planner = state.plans.find((p) => p.date === date);
      if (planner) {
        planner.recipes.push(action.payload.recipe);
      } else {
        state.plans.push({
          id: action.payload.id,
          date,
          recipes: [action.payload.recipe],
        });
        state.plans.sort(
          //@ts-ignore
          (a: any, b: any) => new Date(a.date) - new Date(b.date),
        );
      }
    },

    deleteRecipeFromPlan: (
      state,
      action: { payload: { recipeId: string; plannerId: string } },
    ) => {
      const plannerIdx = state.plans.findIndex(
        (p) => p.id === action.payload.plannerId,
      );
      const recipe = state.plans[plannerIdx].recipes.filter(
        (recipe) => recipe._id !== action.payload.recipeId,
      );
      if (recipe.length === 0) {
        state.plans.splice(plannerIdx, 1);
      } else {
        state.plans[plannerIdx] = {
          ...state.plans[plannerIdx],
          recipes: recipe,
        };
      }
    },
    setIsOpenPlanCollectionTray: (state, action: PayloadAction<boolean>) => {
      state.isOpenPlanCollectionTray = action.payload;
    },
    updateLastModifiedPlanCollection: (
      state,
      action: PayloadAction<LastModifiedPlanCollectionType>,
    ) => {
      state.lastModifiedPlanCollection = { ...action.payload };
    },
    setIsActivePlanForCollection: (
      state,
      action: PayloadAction<ActivePlanForCollectionType>,
    ) => {
      state.activePlanForCollection = action.payload;
    },
    setDayRecipe: (state, action) => {
      state.selectedDayRecipe = action.payload;
    },
    updateCurrentPlanInfoForComments: (
      state,
      action: PayloadAction<CurrentPlanInfoType>,
    ) => {
      state.currentPlanInfoForComments = action.payload;
    },
    setIsPlanCommentsTrayOpen: (state, action: PayloadAction<boolean>) => {
      state.isPlanCommentsTrayOpen = action.payload;
    },
  },
});

export const {
  setWeek,
  setPlanners,
  addPlanner,
  deleteRecipeFromPlan,
  gotoPreviousWeek,
  gotoNextWeek,
  setIsActivePlanForCollection,
  setIsOpenPlanCollectionTray,
  updateLastModifiedPlanCollection,
  setDayRecipe,
  updateCurrentPlanInfoForComments,
  setIsPlanCommentsTrayOpen,
} = PlannerSlice.actions;

export default PlannerSlice.reducer;
