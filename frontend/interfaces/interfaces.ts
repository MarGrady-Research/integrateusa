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

export interface MapboxGeoJSONFeatureExtended extends MapboxGeoJSONFeature {
  properties: {
    nces_id: string;
    GEOID: string;
    STUSPS: string;
    NAME: string;
    sch_name: string;
    dist_name: string;
    county_name: string;
    asian: number;
    black: number;
    hispanic: number;
    white: number;
    other: number;
    latmin: string;
    latmax: string;
    lngmin: string;
    lngmax: string;
    xminimum: string;
    xmaximum: string;
    yminimum: string;
    ymaximum: string;
    lat_new: string;
    lon_new: string;
  };
}

export interface HoverInfoInterface {
  feature: MapboxGeoJSONFeatureExtended;
  x: number;
  y: number;
  height: number;
  width: number;
}
