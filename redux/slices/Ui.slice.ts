import { createSlice } from "@reduxjs/toolkit";

type PanelType = { name: "RXPanel"; show: boolean; payload?: any };
interface UiState {
  navigateToTop: {
    enabled: boolean;
    showBelow: number;
  };
  images: string[];
  panel: PanelType[];
}

const initialState: UiState = {
  navigateToTop: {
    enabled: false,
    showBelow: 200,
  },
  images: [],
  panel: [],
};

export const UiSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.images = [...state.images, ...action.payload.urls];
    },
    removeAllImages: (state) => {
      state.images = [];
    },
    setNavigateToTop: (state, action) => {
      state.navigateToTop = action.payload;
    },
    setShowPanel: (state, action: { payload: PanelType }) => {
      const { name, show, payload } = action.payload;
      const panelIdx = state.panel.findIndex((panel) => panel.name === name);

      if (panelIdx === -1 && show) {
        // if (!show) return;
        state.panel.push({ name, show, payload });
      } else {
        if (!show) state.panel.splice(panelIdx, 1);
        else state.panel[panelIdx] = { name, show, payload };
      }
    },
  },
});

export const { addImage, removeAllImages, setNavigateToTop, setShowPanel } =
  UiSlice.actions;

export default UiSlice.reducer;
