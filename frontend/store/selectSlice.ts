import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

import { yearsData } from "../components/fragments/Selection/data";

export interface SelectState {
  levels: number;
  year: number;
  grade: string;
}

const currentYear = Math.max(...yearsData.map((e) => e.value));

const initialState: SelectState = {
  levels: 0,
  year: currentYear,
  grade: "All",
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
    setGrade(state, action) {
      state.grade = action.payload;
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

export const { setLevels, setYear, setGrade } = selectSlice.actions;

export const selectLevels = (state: AppState) => state.select.levels;
export const selectYear = (state: AppState) => state.select.year;
export const selectGrade = (state: AppState) => state.select.grade;

export default selectSlice.reducer;
