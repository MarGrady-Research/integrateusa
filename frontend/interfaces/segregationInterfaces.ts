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
  norm_exp_as: number;
  norm_exp_bl: number;
  norm_exp_hi: number;
  norm_exp_or: number;
  norm_exp_wh: number;
  num_schools: number;
  enr_prop_as: number;
  enr_prop_bl: number;
  enr_prop_hi: number;
  enr_prop_wh: number;
  enr_prop_or: number;
  dist_name?: string;
  county_name?: string;
  state_name?: string;
}

export interface LineDataAPI {
  norm_exp_as: number;
  norm_exp_bl: number;
  norm_exp_hi: number;
  norm_exp_or: number;
  norm_exp_wh: number;
  year: number;
}

export interface LineDataProcessed {
  seg: number;
  year: number;
}

export interface Line {
  id: string;
  name: string;
}

export type MeasureAccessor =
  | "norm_exp_as"
  | "norm_exp_bl"
  | "norm_exp_hi"
  | "norm_exp_or"
  | "norm_exp_wh";

export type EntityName = "dist_name" | "county_name" | "state_name";

export type MinMaxAccessor =
  | MeasureAccessor
  | "num_schools"
  | "enr_prop_as"
  | "enr_prop_bl"
  | "enr_prop_hi"
  | "enr_prop_wh"
  | "enr_prop_or";

export type ColumnAccessor = EntityName | MinMaxAccessor;

export type Filters =
  | { [key in EntityName]: string }
  | { [key in MinMaxAccessor]: [string, string] };

export type Sort = {
  orderDesc: boolean;
  orderBy: ColumnAccessor;
};
