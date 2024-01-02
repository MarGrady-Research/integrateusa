export type InfoData = School[];
export type TrendData = Trend[];
export type MapData = Feature[];
export type SegData = SegEntity[];

interface School {
  sch_name: string;
  tot_enr: number;
  prop_as: number;
  prop_bl: number;
  prop_hi: number;
  prop_wh: number;
  prop_or: number;
  asian: number;
  black: number;
  hispanic: number;
  white: number;
  other: number;
  state_abb: string;
  level: SchoolType;
}

export interface SegEntity {
  exp_as_as: number;
  exp_bl_as: number;
  exp_hi_as: number;
  exp_or_as: number;
  exp_wh_as: number;
  exp_as_bl: number;
  exp_bl_bl: number;
  exp_hi_bl: number;
  exp_or_bl: number;
  exp_wh_bl: number;
  exp_as_hi: number;
  exp_bl_hi: number;
  exp_hi_hi: number;
  exp_or_hi: number;
  exp_wh_hi: number;
  exp_as_wh: number;
  exp_bl_wh: number;
  exp_hi_wh: number;
  exp_or_wh: number;
  exp_wh_wh: number;
  exp_as_or: number;
  exp_bl_or: number;
  exp_hi_or: number;
  exp_or_or: number;
  exp_wh_or: number;
}

interface Trend {
  year: number;
  grade: string;
  asian: number;
  black: number;
  hispanic: number;
  white: number;
  other: number;
}

interface Feature {
  type: any;
  geometry: any;
  properties: any;
}

export type SchoolType = "ES" | "ESMS" | "MS" | "MSHS" | "HS" | "K12" | "Other";

export interface Bounds {
  lngmin: number;
  latmin: number;
  lngmax: number;
  latmax: number;
}

export type RacialProportion =
  | "prop_as"
  | "prop_bl"
  | "prop_hi"
  | "prop_wh"
  | "prop_or";

export enum Level {
  School,
  District,
  County,
  State,
}

export enum MapLevel {
  School,
  UnifiedElementaryDistrict,
  UnifiedSecondaryDistrict,
  County,
  State,
}

export interface LineDataBase {
  id: string;
  name: string;
}

interface LineDataLoading extends LineDataBase {
  status: "loading";
}

interface LineDataFailed extends LineDataBase {
  status: "failed";
}

export interface LineDataLoaded extends LineDataBase {
  status: "loaded";
  data: {
    seg: number;
    year: number;
  }[];
}

export interface LineDataRawLoaded extends LineDataBase {
  status: "loaded";
  data: {
    [key: string]: any;
  }[];
}

export type LineDataRaw = LineDataLoading | LineDataRawLoaded | LineDataFailed;
export type LineData = LineDataLoading | LineDataLoaded | LineDataFailed;

export enum MapStatus {
  Fetching,
  Rendering,
  Complete,
  Failed,
}

export interface SchoolCoordinates {
  lat_new: number | null;
  lon_new: number | null;
}

export interface LocationSearchResult extends SchoolCoordinates {
  value: string;
  label: string;
  lngmin: number;
  latmin: number;
  lngmax: number;
  latmax: number;
}

export enum ApiStatus {
  Fetching = "fetching",
  Success = "success",
  Failure = "failure",
}
