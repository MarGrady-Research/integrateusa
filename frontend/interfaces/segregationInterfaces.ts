export type SegData = SegEntity[];
export type LineData = LineDataAPI[];

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

interface LineDataAPI {
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
