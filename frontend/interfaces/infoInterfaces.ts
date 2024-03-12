export type TrendData = School[] | Trend[];

export interface School {
  sch_name: string;
  nces_id: string;
  asian: number;
  black: number;
  hispanic: number;
  white: number;
  other: number;
  level: SchoolType;
  year: number;
  grade: string;
}

export type SchoolType = "ES" | "ESMS" | "MS" | "MSHS" | "HS" | "K12" | "Other";

export interface Trend {
  year: number;
  grade: string;
  asian: number;
  black: number;
  hispanic: number;
  white: number;
  other: number;
}

export interface SchoolInfo {
  sch_name: string;
  dist_name: string;
  state_abb: string;
  year_open: number;
  year_close: number;
}
