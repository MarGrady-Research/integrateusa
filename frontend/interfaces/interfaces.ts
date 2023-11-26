export type InfoData = School[];
export type TrendData = Trend[];
export type MapData = Feature[];

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
