import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

import { MapData, InfoData, TrendData, SegData } from "../interfaces";

export interface ApiCacheState {
  mapData: MapData | null;
  infoData: { [key: string]: InfoData };
  trendData: { [key: string]: TrendData };
  segData: { [key: string]: SegData };
}

const initialState: ApiCacheState = {
  mapData: null,
  infoData: {},
  trendData: {},
  segData: {},
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
    setTrendData(state, action) {
      state.trendData = {
        ...state.trendData,
        ...action.payload,
      };
    },
    setSegData(state, action) {
      state.segData = {
        ...state.segData,
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

export const { setMapData, setInfoData, setTrendData, setSegData } =
  apiCacheSlice.actions;

export const selectMapData = (state: AppState) =>
  state.apiCache.mapData as MapData;

export const selectInfoData = (state: AppState) =>
  state.apiCache.infoData as { [key: string]: InfoData };

export const selectTrendData = (state: AppState) =>
  state.apiCache.trendData as { [key: string]: TrendData };

export const selectSegData = (state: AppState) =>
  state.apiCache.segData as { [key: string]: SegData };

export default apiCacheSlice.reducer;
