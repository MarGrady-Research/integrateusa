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

export interface LineData {
  id: string;
  name: string;
  data: {
    seg: number;
    year: number;
  }[];
}

export enum MapStatus {
  Fetching,
  Rendering,
  Complete,
  Failed,
}

export interface LocationSearchResult {
  value: string;
  label: string;
  lngmin: number;
  latmin: number;
  lngmax: number;
  latmax: number;
}
