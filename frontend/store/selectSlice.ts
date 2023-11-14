import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

import { yearsData } from "../components/fragments/Selection/data";

export interface SelectState {
  levels: number;
  year: number;
}

const currentYear = Math.max(...yearsData.map((e) => e.value));

const initialState: SelectState = {
  levels: 0,
  year: currentYear,
};

export const selectSlice = createSlice({
  name: "select",
  initialState,
  reducers: {
    setLevels(state, action) {
      state.levels = action.payload;
    },
    setYear(state, action) {
      state.year = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.select,
        ...action.payload.year,
      };
    },
  },
});

export const { setLevels, setYear } = selectSlice.actions;

export const selectLevels = (state: AppState) => state.select.levels;
export const selectYear = (state: AppState) => state.select.year;

export default selectSlice.reducer;
