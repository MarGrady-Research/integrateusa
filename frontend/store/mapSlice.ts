import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

interface MapState {
  zoomOnMap: boolean;
}

const initialState: MapState = {
  zoomOnMap: false,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    activateZoomOnMap(state) {
      state.zoomOnMap = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...(action as PayloadAction<any>).payload,
      };
    });
  },
});

export const { activateZoomOnMap } = mapSlice.actions;

export const selectZoomOnMap = (state: AppState) => state.map.zoomOnMap;
