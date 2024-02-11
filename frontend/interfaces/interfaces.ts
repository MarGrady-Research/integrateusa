import { MapboxGeoJSONFeature } from "mapbox-gl";

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

export enum MapStatus {
  Fetching,
  Rendering,
  Complete,
  Failed,
}

export enum ApiStatus {
  Fetching = "fetching",
  Success = "success",
  Failure = "failure",
}

export interface SchoolCoordinates {
  lat_new: number | null;
  lon_new: number | null;
}

export enum DistrictType {
  Unified = "U",
  Elementary = "E",
  Secondary = "S",
}

export interface HoverInfoInterface {
  feature: MapboxGeoJSONFeature;
  x: number;
  y: number;
  height: number;
  width: number;
}
