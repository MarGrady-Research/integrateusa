import { SchoolCoordinates, DistrictType } from ".";

interface Coordinates {
  lngmin: number;
  latmin: number;
  lngmax: number;
  latmax: number;
}

export interface SchoolSearchResult extends SchoolCoordinates, Coordinates {
  nces_id: string;
  sch_name: string;
}

export interface DistrictSearchResult extends Coordinates {
  dist_id: string;
  dist_name: string;
  dist_type: DistrictType;
}

export interface CountySearchResult extends Coordinates {
  county_id: string;
  county_name: string;
}

export interface StateSearchResult extends Coordinates {
  state_abb: string;
  state_name: string;
}

export type LocationSearchResult =
  | SchoolSearchResult
  | DistrictSearchResult
  | CountySearchResult
  | StateSearchResult;

export interface LocationSearchOption extends Coordinates {
  value: string;
  label: string;
  lat_new?: number;
  lon_new?: number;
  dist_type?: DistrictType;
}
