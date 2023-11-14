import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

export interface SelectState {
  levels: number;
}

const initialState: SelectState = {
  levels: 0,
};

export const selectSlice = createSlice({
  name: "select",
  initialState,
  reducers: {
    setLevels(state, action) {
      state.levels = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.select,
      };
    },
  },
});

export const { setLevels } = selectSlice.actions;

export const selectLevels = (state: AppState) => state.select.levels;

export default selectSlice.reducer;
