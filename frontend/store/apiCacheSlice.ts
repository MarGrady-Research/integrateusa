import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

import {
  MapData,
  InfoData,
  TrendData,
  SegData,
  LineData,
  ApiStatus,
  LocationSearchOption,
} from "interfaces";

interface SegDataCache {
  [key: string]: {
    status: ApiStatus;
    data: SegData;
  };
}

interface InfoDataCache {
  [key: string]: {
    status: ApiStatus;
    data: InfoData;
  };
}

interface TrendDataCache {
  [key: string]: {
    status: ApiStatus;
    data: TrendData;
  };
}

interface LineDataCache {
  [key: string]: {
    status: ApiStatus;
    data: LineData;
  };
}

interface LocationSearchCache {
  [key: string]: {
    status: ApiStatus;
    data: LocationSearchOption[];
  };
}

interface ApiCacheState {
  mapData: MapData | null;
  infoData: InfoDataCache;
  trendData: TrendDataCache;
  segData: SegDataCache;
  lineData: LineDataCache;
  locationSearch: LocationSearchCache;
}

const initialState: ApiCacheState = {
  mapData: null,
  infoData: {},
  trendData: {},
  segData: {},
  lineData: {},
  locationSearch: {},
};

export const apiCacheSlice = createSlice({
  name: "apiCache",
  initialState,
  reducers: {
    setMapData(state, action: PayloadAction<MapData>) {
      state.mapData = action.payload;
    },
    setInfoDataRequest(state, action: PayloadAction<string>) {
      const key = action.payload;

      state.infoData = {
        ...state.infoData,
        [key]: {
          ...state.infoData[key],
          status: ApiStatus.Fetching,
        },
      };
    },
    setInfoDataSuccess(
      state,
      action: PayloadAction<{ key: string; data: InfoData }>
    ) {
      const { key, data } = action.payload;

      state.infoData = {
        ...state.infoData,
        [key]: {
          status: ApiStatus.Success,
          data,
        },
      };
    },
    setInfoDataFailure(state, action: PayloadAction<string>) {
      const key = action.payload;

      state.infoData = {
        ...state.infoData,
        [key]: {
          ...state.infoData[key],
          status: ApiStatus.Failure,
        },
      };
    },
    setTrendDataRequest(state, action: PayloadAction<string>) {
      const key = action.payload;

      state.trendData = {
        ...state.trendData,
        [key]: {
          ...state.trendData[key],
          status: ApiStatus.Fetching,
        },
      };
    },
    setTrendDataSuccess(
      state,
      action: PayloadAction<{ key: string; data: TrendData }>
    ) {
      const { key, data } = action.payload;

      state.trendData = {
        ...state.trendData,
        [key]: {
          status: ApiStatus.Success,
          data,
        },
      };
    },
    setTrendDataFailure(state, action: PayloadAction<string>) {
      const key = action.payload;

      state.trendData = {
        ...state.trendData,
        [key]: {
          ...state.trendData[key],
          status: ApiStatus.Failure,
        },
      };
    },
    setSegDataRequest(state, action: PayloadAction<string>) {
      const key = action.payload;

      state.segData = {
        ...state.segData,
        [key]: {
          ...state.segData[key],
          status: ApiStatus.Fetching,
        },
      };
    },
    setSegDataSuccess(
      state,
      action: PayloadAction<{ key: string; data: SegData }>
    ) {
      const { key, data } = action.payload;

      state.segData = {
        ...state.segData,
        [key]: {
          status: ApiStatus.Success,
          data,
        },
      };
    },
    setSegDataFailure(state, action: PayloadAction<string>) {
      const key = action.payload;

      state.segData = {
        ...state.segData,
        [key]: {
          ...state.segData[key],
          status: ApiStatus.Failure,
        },
      };
    },
    setLineDataRequest(state, action: PayloadAction<string>) {
      const key = action.payload;

      state.lineData = {
        ...state.lineData,
        [key]: {
          ...state.lineData[key],
          status: ApiStatus.Fetching,
        },
      };
    },
    setLineDataSuccess(
      state,
      action: PayloadAction<{ key: string; data: LineData }>
    ) {
      const { key, data } = action.payload;

      state.lineData = {
        ...state.lineData,
        [key]: {
          status: ApiStatus.Success,
          data,
        },
      };
    },
    setLineDataFailure(state, action: PayloadAction<string>) {
      const key = action.payload;

      state.lineData = {
        ...state.lineData,
        [key]: {
          ...state.lineData[key],
          status: ApiStatus.Failure,
        },
      };
    },
    setLocationSearchRequest(state, action: PayloadAction<string>) {
      const key = action.payload;

      state.locationSearch = {
        ...state.locationSearch,
        [key]: {
          ...state.locationSearch[key],
          status: ApiStatus.Fetching,
        },
      };
    },
    setLocationSearchSuccess(
      state,
      action: PayloadAction<{ key: string; data: LocationSearchOption[] }>
    ) {
      const { key, data } = action.payload;

      state.locationSearch = {
        ...state.locationSearch,
        [key]: {
          status: ApiStatus.Success,
          data,
        },
      };
    },
    setLocationSearchFailure(state, action: PayloadAction<string>) {
      const key = action.payload;

      state.locationSearch = {
        ...state.locationSearch,
        [key]: {
          ...state.locationSearch[key],
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
  setInfoDataRequest,
  setInfoDataSuccess,
  setInfoDataFailure,
  setTrendDataRequest,
  setTrendDataSuccess,
  setTrendDataFailure,
  setSegDataRequest,
  setSegDataSuccess,
  setSegDataFailure,
  setLineDataRequest,
  setLineDataSuccess,
  setLineDataFailure,
  setLocationSearchRequest,
  setLocationSearchSuccess,
  setLocationSearchFailure,
} = apiCacheSlice.actions;

export const selectMapData = (state: AppState) =>
  state.apiCache.mapData as MapData;

export const selectInfoData = (state: AppState) =>
  state.apiCache.infoData as InfoDataCache;

export const selectTrendData = (state: AppState) =>
  state.apiCache.trendData as TrendDataCache;

export const selectSegData = (state: AppState) =>
  state.apiCache.segData as SegDataCache;

export const selectLineData = (state: AppState) =>
  state.apiCache.lineData as LineDataCache;

export const selectLocationSearch = (state: AppState) =>
  state.apiCache.locationSearch as LocationSearchCache;

export default apiCacheSlice.reducer;
