export type InfoData = School[];
export type TrendData = School[] | Trend[];

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
  dist_name: string;
  level: SchoolType;
  year: number;
  grade: string;
}

export type SchoolType = "ES" | "ESMS" | "MS" | "MSHS" | "HS" | "K12" | "Other";

interface Trend {
  year: number;
  grade: string;
  asian: number;
  black: number;
  hispanic: number;
  white: number;
  other: number;
}
