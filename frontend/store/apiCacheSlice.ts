import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

import { MapData, InfoData } from "../interfaces";

export interface ApiCacheState {
  mapData: MapData | null;
  infoData: { [key: string]: InfoData };
}

const initialState: ApiCacheState = {
  mapData: null,
  infoData: {},
};

export const apiCacheSlice = createSlice({
  name: "apiCache",
  initialState,
  reducers: {
    setMapData(state, action) {
      state.mapData = action.payload;
    },
    setInfoData(state, action) {
      state.infoData = {
        ...state.infoData,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...(action as any).payload,
      };
    });
  },
});

export const { setMapData, setInfoData } = apiCacheSlice.actions;

export const selectMapData = (state: AppState) =>
  state.apiCache.mapData as MapData;

export const selectInfoData = (state: AppState) =>
  state.apiCache.infoData as { [key: string]: InfoData };

export default apiCacheSlice.reducer;
