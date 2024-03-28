import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

interface HydrateState {
  rehydrated: boolean;
}

const initialState: HydrateState = {
  rehydrated: false,
};

export const hydrateSlice = createSlice({
  name: "hydrate",
  initialState,
  reducers: {
    activateRehydrated(state) {
      state.rehydrated = true;
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

export const { activateRehydrated } = hydrateSlice.actions;

export const selectRehydrated = (state: AppState) => state.hydrate.rehydrated;

export const selectPersistorHydrationState = (state: AppState) => {
  if (typeof state["_persist"] !== "undefined") {
    return state["_persist"].rehydrated as boolean;
  }

  return false;
};
