import { createSlice } from "@reduxjs/toolkit";
import { RecipeType } from "../../type/recipeType";

export type ActiveSectionType = "visual" | "tags";

type FilterProps = {
  pageTitle: string;
  expandedMenu: string;
  activeTab: string;
  values: string[];
  isMultiprops?: boolean;
  prefix?: string;
  postfix?: string;
  range?: [number, number];
  value?: number;
};

export interface BlendType {
  name: string;
  id: string;
  image?: string;
  tagLabel: string;
  filterCriteria: FilterCriteriaOptions;
  origin: ActiveFilterTagCriteriaType;
}

export interface IngredientType {
  name: string;
  id: string;
  image?: string;
  tagLabel: string;
  filterCriteria: FilterCriteriaOptions;
  excludeIngredientIds: boolean;
  origin: ActiveFilterTagCriteriaType;
}
export interface NutrientFiltersType {
  between: boolean;
  category: "energy" | "mineral" | "vitamin";
  greaterThan: boolean;
  lessThan: boolean;
  id: string;
  lessThanValue: number;
  greaterThanValue: number;
  betweenStartValue: number;
  betweenEndValue: number;
  tagLabel: string;
  name: string;
  filterCriteria: FilterCriteriaOptions;
  origin: ActiveFilterTagCriteriaType;
}

export interface NutrientMatrixType {
  between: boolean;
  greaterThan: boolean;
  lessThan: boolean;
  matrixName: "gi" | "gl" | "calorie" | "netCarbs";
  id: string;
  lessThanValue: number;
  greaterThanValue: number;
  betweenStartValue: number;
  betweenEndValue: number;
  tagLabel: string;
  name: string;
  filterCriteria: FilterCriteriaOptions;
  origin: ActiveFilterTagCriteriaType;
}
export type FilterCriteriaOptions =
  | "blendTypes"
  | "includeIngredientIds"
  | "nutrientFilters"
  | "nutrientMatrix"
  | "collectionIds";

export interface ActiveFilterTagCriteriaType {
  activeSection: ActiveSectionType;
  filterCriteria: FilterCriteriaOptions;
  activeTab: string;
  childTab: string;
}

export type FilterCriteriaValue =
  | BlendType
  | IngredientType
  | NutrientFiltersType
  | NutrientMatrixType;

interface AllFilterRecipes {
  filterRecipes: RecipeType[];
  isFiltering: boolean;
  totalItems: number;
}

interface FilterState {
  isActive: boolean;
  filters: FilterProps[];
  activeState: FilterProps;
  allFilters: FilterCriteriaValue[];
  activeFilterTag: ActiveFilterTagCriteriaType;
  numericFilterState: NutrientFiltersType | NutrientMatrixType;
  allFilterRecipes: AllFilterRecipes;
  excludeFilterState: IngredientType;
  showFilterOrSearchRecipes: boolean;
}

const initialState: FilterState = {
  isActive: true,
  filters: [],
  activeState: {
    pageTitle: "",
    expandedMenu: "",
    activeTab: "",
    values: [],
  },
  activeFilterTag: {
    activeSection: "visual",
    filterCriteria: null,
    activeTab: "",
    childTab: "",
  },
  allFilters: [],
  numericFilterState: {} as NutrientFiltersType | NutrientMatrixType,
  allFilterRecipes: {
    filterRecipes: [],
    isFiltering: false,
    totalItems: 0,
  },
  excludeFilterState: {} as IngredientType,
  showFilterOrSearchRecipes: false,
};

export const filterRecipeSlice = createSlice({
  name: "filterRecipe",
  initialState,
  reducers: {
    showFilterPanel: (state) => {
      state.isActive = true;
    },
    hideFilterPanel: (state) => {
      state.isActive = false;
    },
    activeFilter: (
      state,
      action: {
        payload: {
          pageTitle: string;
          expandedMenu: string;
        };
      },
    ) => {
      state.activeState.pageTitle = action.payload.pageTitle;
      state.activeState.expandedMenu = action.payload.expandedMenu;

      const filterProps = state.filters.find(
        (filter) => filter.pageTitle === action.payload.pageTitle,
      );

      state.activeState.values = filterProps ? filterProps.values : [];
      state.activeState.activeTab = filterProps ? filterProps.activeTab : "";
      state.activeState.value = filterProps ? filterProps.value : 0;
      state.activeState.range = filterProps ? filterProps.range : [0, 0];
    },
    resetFilterPage: (state) => {
      state.activeState.pageTitle = "";
      state.activeState.activeTab = "";
      state.activeState.values = [];
    },
    modifyFilter: (state, action: { payload: FilterProps }) => {
      // Checking if the filter already exists in the filters array
      const filterIndex = state.filters.findIndex(
        (filter) => filter.pageTitle === action.payload.pageTitle,
      );

      // If the filter doesnt exist we create a new filter
      if (filterIndex === -1) state.filters.push(action.payload);
      // If the filter exist we modify that filter
      else {
        // If the filters value is null then removing the whole filter value.
        if (action.payload.values.length === 0) {
          state.filters.splice(filterIndex, 1);
          // To prevent filters of being null
          if (state.filters.length === 0) {
            state.filters = [];
          }
        } else state.filters[filterIndex] = action.payload;
      }

      // Modifying the active state values as well to make the active filter and the array filter become consistent
      state.activeState.values = action.payload.values;
    },
    resetFilterValue: (state, action: { payload: { pageTitle: string } }) => {
      const filterIndex = state.filters.findIndex(
        (filter) => filter.pageTitle === action.payload.pageTitle,
      );
      if (filterIndex !== -1) {
        state.filters.splice(filterIndex, 1);
        // To prevent filters of being null
        if (state.filters.length === 0) {
          state.filters = [];
        }
        // Resetting the active state as well
        state.activeState.values = [];
        state.activeState.value = 0;
        state.activeState.range = [0, 0];
      }
    },
    deleteFilterValue: (
      state,
      action: { payload: { pageTitle: string; value: string } },
    ) => {
      const filterIndex = state.filters.findIndex(
        (filter) => filter.pageTitle === action.payload.pageTitle,
      );
      if (filterIndex !== -1) {
        state.filters[filterIndex].values = state.filters[
          filterIndex
        ].values.filter((value) => value !== action.payload.value);

        const filterProps = state.filters.find(
          (filter) => filter.pageTitle === action.payload.pageTitle,
        );

        state.activeState.values = filterProps ? filterProps.values : [];

        // If the filters value is null then removing the whole filter value.
        if (state.filters[filterIndex].values.length === 0)
          state.filters.splice(filterIndex, 1);
      }
    },
    showFilterPanelWithProps: (state, action: { payload: FilterProps }) => {
      state.isActive = false;
      // if (!state.isActive)
      state.activeState = action.payload;
      state.isActive = true;
    },
    updateFilterCriteriaItem: (
      state,
      action: {
        payload: {
          filterCriteria?: FilterCriteriaOptions;
          value?: FilterCriteriaValue;
          updateStatus: "add" | "remove" | "update" | "removeAll" | "focus";
        };
      },
    ) => {
      const payload = action.payload;
      const dummyObj = {
        id: "",
        name: "",
        between: false,
        category: "",
        greaterThan: false,
        lessThan: true,
        lessThanValue: 0,
        greaterThanValue: 0,
        betweenStartValue: 0,
        betweenEndValue: 0,
      };

      // when update status add
      if (payload.updateStatus === "add") {
        state.allFilters = [...state.allFilters, payload.value];
        if (
          payload.value.filterCriteria === "nutrientFilters" ||
          payload.value.filterCriteria === "nutrientMatrix"
        ) {
          // @ts-ignore
          state.numericFilterState = {
            ...payload.value,
          };
        }
        if (payload.value.filterCriteria === "includeIngredientIds") {
          // @ts-ignore
          state.excludeFilterState = {
            ...payload.value,
          };
        }
      }
      // when update status remove
      if (payload.updateStatus === "remove") {
        state.allFilters = state.allFilters.filter(
          (filter) => filter.id !== payload.value.id,
        );

        if (
          payload.value.filterCriteria === "nutrientFilters" ||
          payload.value.filterCriteria === "nutrientMatrix"
        ) {
          if (state.numericFilterState.id === payload.value.id) {
            // @ts-ignore
            state.numericFilterState = {
              ...dummyObj,
            };
          }
        }
        if (payload.value.filterCriteria === "includeIngredientIds") {
          if (state.excludeFilterState.id === payload.value.id) {
            // @ts-ignore
            state.excludeFilterState = {};
          }
        }
      }
      if (payload.updateStatus === "update") {
        state.allFilters = state.allFilters.map((filter) =>
          filter.id === payload.value.id ? payload.value : filter,
        );
        if (payload.value.filterCriteria === "includeIngredientIds") {
          // @ts-ignore
          state.excludeFilterState = {
            ...state.excludeFilterState,
            ...payload.value,
          };
        }
      }
      // when update status removeAll
      if (payload.updateStatus === "removeAll") {
        state.allFilters = state.allFilters.filter(
          (filter) =>
            filter.filterCriteria !== state.activeFilterTag.filterCriteria,
        );
        // @ts-ignore
        state.numericFilterState = {
          ...dummyObj,
        };
        // @ts-ignore
        state.excludeFilterState = {};
      }
      // when update status focus
      if (payload.updateStatus === "focus") {
        const findOneItem = state.allFilters.find(
          (item) => item.id === payload.value.id,
        );
        if (
          (findOneItem && payload.value.filterCriteria === "nutrientFilters") ||
          payload.value.filterCriteria === "nutrientMatrix"
        ) {
          // @ts-ignore
          state.numericFilterState = {
            ...findOneItem,
          };
        }
        if (
          findOneItem &&
          payload.value.filterCriteria === "includeIngredientIds"
        ) {
          // @ts-ignore
          state.excludeFilterState = {
            ...findOneItem,
          };
        }
      }
    },
    updateActiveFilterTag: (
      state,
      action: { payload: ActiveFilterTagCriteriaType },
    ) => {
      state.activeFilterTag = action.payload;
    },

    updateNumericFilterState: (
      state,
      action: { payload: NutrientFiltersType | NutrientMatrixType },
    ) => {
      state.numericFilterState = { ...action.payload };
    },
    updateAllFilterRecipes: (state, action: { payload: AllFilterRecipes }) => {
      state.allFilterRecipes = { ...action.payload };
    },
    updateShowFilterOrSearchRecipes: (state, action: { payload: boolean }) => {
      state.showFilterOrSearchRecipes = action.payload;
    },

    resetAllFilters: (state) => {
      state.allFilters = [];
    },
  },
});

export const {
  showFilterPanel,
  hideFilterPanel,
  activeFilter,
  resetFilterPage,
  modifyFilter,
  resetFilterValue,
  deleteFilterValue,
  showFilterPanelWithProps,
  updateFilterCriteriaItem,
  updateActiveFilterTag,
  updateNumericFilterState,
  resetAllFilters,
  updateAllFilterRecipes,
  updateShowFilterOrSearchRecipes,
} = filterRecipeSlice.actions;

export default filterRecipeSlice.reducer;
