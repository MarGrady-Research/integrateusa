import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

import { yearsData } from "../components/fragments/Selection/data";

import { Bounds, Level } from "../interfaces";

export interface SelectState {
  level: Level;
  year: number;
  grade: string;
  id: string;
  selectedName: string;
  bounds: Bounds;
}

const currentYear = Math.max(...yearsData.map((e) => e.value));

const initialState: SelectState = {
  level: Level.District,
  year: currentYear,
  grade: "All",
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
    setYear(state, action) {
      state.year = action.payload;
    },
    setGrade(state, action) {
      state.grade = action.payload;
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

export const {
  setLevel,
  setYear,
  setGrade,
  setId,
  setSelectedName,
  setBounds,
} = selectSlice.actions;

export const selectLevel = (state: AppState) => state.select.level as Level;
export const selectYear = (state: AppState) => state.select.year as number;
export const selectGrade = (state: AppState) => state.select.grade as string;
export const selectId = (state: AppState) => state.select.id as string;
export const selectSelectedName = (state: AppState) =>
  state.select.selectedName as string;
export const selectBounds = (state: AppState) => state.select.bounds as Bounds;

export default selectSlice.reducer;
