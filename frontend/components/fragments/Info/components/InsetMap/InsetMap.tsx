import React, { useCallback, useRef, useEffect } from "react";
import Map, { Source, Layer } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import {
  selectedAreaColor,
  stateBoundaryURL,
  countyBoundaryURL,
  districtBoundaryURL,
  defaultMapSchoolColor,
} from "../../../../../constants";

import { Bounds, Level } from "../../../../../interfaces";

interface Props {
  id: string;
  bounds: Bounds;
  level: Level;
}

const schoolsSourceId = "schools-source";

export default function InsetMap({ id, bounds, level }: Props) {
  const mapRef = useRef();

  const { latmin, latmax, lngmin, lngmax } = bounds;

  const lat = (latmin + latmax) / 2;
  const lng = (lngmin + lngmax) / 2;

  const mapboxData = {
    type: "FeatureCollection" as "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
      },
    ] as any,
  };

  const isSchool = level === Level.School;

  const zoomToLocation = useCallback(() => {
    if (!mapRef.current as any) {
      return;
    }

    const mapBounds = [
      [bounds.lngmin, bounds.latmin],
      [bounds.lngmax, bounds.latmax],
    ];

    (mapRef.current as any).fitBounds(mapBounds, {
      padding: 25,
      duration: 2000,
    });
  }, [bounds]);

  useEffect(() => {
    zoomToLocation();
  }, [bounds]);

  const districtLayer = {
    id: "district-boundary",
    type: "fill" as any,
    "source-layer": "2021_sd_unified-4mqqrn",
    paint: {
      "fill-outline-color": selectedAreaColor,
      "fill-color": selectedAreaColor,
    },
    filter: ["==", "GEOID", id],
  };

  const countyLayer = {
    id: "boundary",
    type: "fill" as any,
    "source-layer": "cb_2018_us_county_500k-6dd9y3",
    paint: {
      "fill-outline-color": selectedAreaColor,
      "fill-color": selectedAreaColor,
    },
    filter: ["==", "GEOID", id],
  };

  const stateLayer = {
    id: "state-boundary",
    type: "fill" as any,
    "source-layer": "cb_2018_us_state_500k-8q06w5",
    paint: {
      "fill-outline-color": selectedAreaColor,
      "fill-color": selectedAreaColor,
    },
    filter: ["==", "STUSPS", id],
  };

  const LayerProps = {
    id: "schools",
    type: "circle" as any,
    source: schoolsSourceId,
    paint: {
      "circle-radius": 3.5,
      "circle-color": defaultMapSchoolColor,
      "circle-stroke-width": 2,
      "circle-stroke-color": "#000",
    } as any,
  };

  return (
    <div className="h-full w-full shadow border border-gray-200">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 2.5,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onLoad={zoomToLocation}
      >
        <Source
          id="district-boundary-source"
          type="vector"
          url={districtBoundaryURL}
        >
          <Layer {...districtLayer} />
        </Source>
        <Source
          id="county-boundary-source"
          type="vector"
          url={countyBoundaryURL}
        >
          <Layer {...countyLayer} />
        </Source>
        <Source id="state-boundary-source" type="vector" url={stateBoundaryURL}>
          <Layer {...stateLayer} />
        </Source>
        {isSchool && (
          <Source
            id={schoolsSourceId}
            type="geojson"
            data={mapboxData}
            generateId
          >
            <Layer {...LayerProps} />
          </Source>
        )}
      </Map>
    </div>
  );
}
