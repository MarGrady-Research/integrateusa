export type MapData = Feature[];

export interface Feature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    as: number;
    bl: number;
    county_id: string;
    county_name: string;
    dist_id: string;
    dist_name: string;
    hi: number;
    lat_new: string;
    lon_new: string;
    nces_id: number;
    or: number;
    sch_name: string;
    state_abb: string;
    tot_enr: number;
    wh: number;
    xmax: string;
    xmin: string;
    ymax: string;
    ymin: string;
  };
}
