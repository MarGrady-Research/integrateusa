import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

import {
  MapData,
  InfoData,
  TrendData,
  SegData,
  ApiStatus,
} from "../interfaces";

interface SegDataCache {
  [key: string]: {
    status: ApiStatus;
    data: SegData;
  };
}

export interface ApiCacheState {
  mapData: MapData | null;
  infoData: { [key: string]: InfoData };
  trendData: { [key: string]: TrendData };
  segData: SegDataCache;
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
    setSegDataRequest(state, action) {
      const key = action.payload;

      state.segData = {
        ...state.segData,
        [key]: {
          ...state.segData[key],
          status: ApiStatus.Fetching,
        },
      };
    },
    setSegDataSuccess(state, action) {
      const { key, data } = action.payload;

      state.segData = {
        ...state.segData,
        [key]: {
          status: ApiStatus.Success,
          data,
        },
      };
    },
    setSegDataFailure(state, action) {
      const key = action.payload;

      state.segData = {
        ...state.segData,
        [key]: {
          ...state.segData[key],
          status: ApiStatus.Failure,
        },
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

export const {
  setMapData,
  setInfoData,
  setTrendData,
  setSegDataRequest,
  setSegDataSuccess,
  setSegDataFailure,
} = apiCacheSlice.actions;

export const selectMapData = (state: AppState) =>
  state.apiCache.mapData as MapData;

export const selectInfoData = (state: AppState) =>
  state.apiCache.infoData as { [key: string]: InfoData };

export const selectTrendData = (state: AppState) =>
  state.apiCache.trendData as { [key: string]: TrendData };

export const selectSegData = (state: AppState) =>
  state.apiCache.segData as SegDataCache;

export default apiCacheSlice.reducer;
