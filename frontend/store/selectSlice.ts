import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

import { Bounds, Level } from "../interfaces";

export interface SelectState {
  level: Level;
  id: string;
  selectedName: string;
  bounds: Bounds;
}

const initialState: SelectState = {
  level: Level.District,
  id: "3620580",
  selectedName: "New York City Public Schools (NY)",
  bounds: {
    lngmin: -74.25609,
    latmin: 40.496094,
    lngmax: -73.70017,
    latmax: 40.915276,
  },
};

export const selectSlice = createSlice({
  name: "select",
  initialState,
  reducers: {
    setLevel(state, action) {
      state.level = action.payload;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    setSelectedName(state, action) {
      state.selectedName = action.payload;
    },
    setBounds(state, action) {
      state.bounds = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setLevel, setId, setSelectedName, setBounds } =
  selectSlice.actions;

export const selectLevel = (state: AppState) => state.select.level as Level;
export const selectId = (state: AppState) => state.select.id as string;
export const selectSelectedName = (state: AppState) =>
  state.select.selectedName as string;
export const selectBounds = (state: AppState) => state.select.bounds as Bounds;

export default selectSlice.reducer;
