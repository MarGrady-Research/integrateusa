import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

import { yearsData } from "../components/fragments/Selection/data";

import { Bounds, Level, SchoolCoordinates, DistrictType } from "../interfaces";

interface SelectState {
  level: Level;
  year: number;
  grade: string;
  id: string;
  selectedName: string;
  bounds: Bounds;
  schoolCoordinates: SchoolCoordinates;
  districtType: DistrictType;
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
  schoolCoordinates: {
    lat_new: null,
    lon_new: null,
  },
  districtType: DistrictType.Unified,
};

export const selectSlice = createSlice({
  name: "select",
  initialState,
  reducers: {
    setLevelAndId(state, action) {
      state.level = action.payload.level;
      state.id = action.payload.id;
    },
    setYear(state, action) {
      state.year = action.payload;
    },
    setGrade(state, action) {
      state.grade = action.payload;
    },
    setSelectedName(state, action) {
      state.selectedName = action.payload;
    },
    setBounds(state, action) {
      state.bounds = action.payload;
    },
    setSchoolCoordinates(state, action) {
      state.schoolCoordinates = action.payload;
    },
    setDistrictType(state, action) {
      state.districtType = action.payload;
    },
    restoreInitialState(state) {
      state.level = initialState.level;
      state.id = initialState.id;
      state.selectedName = initialState.selectedName;
      state.bounds = initialState.bounds;
    },
    setStateFromParams(state, action) {
      state.level = action.payload.level;
      state.id = action.payload.id;
      state.selectedName = action.payload.selectedName;
      state.bounds = action.payload.bounds;

      if (action.payload.schoolCoordinates) {
        state.schoolCoordinates = action.payload.schoolCoordinates;
      }
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
  setLevelAndId,
  setYear,
  setGrade,
  setSelectedName,
  setBounds,
  setSchoolCoordinates,
  setDistrictType,
  restoreInitialState,
  setStateFromParams,
} = selectSlice.actions;

export const selectLevel = (state: AppState) => state.select.level as Level;
export const selectYear = (state: AppState) => state.select.year as number;
export const selectGrade = (state: AppState) => state.select.grade as string;
export const selectId = (state: AppState) => state.select.id as string;
export const selectSchoolCoordinates = (state: AppState) =>
  state.select.schoolCoordinates as SchoolCoordinates;
export const selectSelectedName = (state: AppState) =>
  state.select.selectedName as string;
export const selectBounds = (state: AppState) => state.select.bounds as Bounds;
export const selectDistrictType = (state: AppState) =>
  state.select.districtType as DistrictType;

export default selectSlice.reducer;
