export type MapData = Feature[];
export type ApiMapData = MapProperties[];

interface Feature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: MapProperties;
}

interface MapProperties {
  nces_id: string;
  dist_id: string;
  county_id: string;
  state_abb: string;
  sch_name: string;
  dist_name: string;
  county_name: string;
  lon_new: string;
  lat_new: string;
  xmaximum: string;
  xminimum: string;
  ymaximum: string;
  yminimum: string;
  asian: number;
  black: number;
  hispanic: number;
  white: number;
  other: number;
}
