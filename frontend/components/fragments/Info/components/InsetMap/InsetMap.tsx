import React, { useCallback, useRef, useEffect } from "react";
import Map, { Source, Layer, MapRef, LngLatBoundsLike } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import {
  selectedAreaColor,
  stateBoundaryURL,
  countyBoundaryURL,
  elementaryDistrictBoundaryURL,
  secondaryDistrictBoundaryURL,
  stateSourceLayer,
  countySourceLayer,
  elementaryDistrictSourceLayer,
  secondaryDistrictSourceLayer,
  defaultMapSchoolColor,
} from "constants/";

import { Bounds, Level, SchoolCoordinates } from "interfaces";

interface Props {
  id: string;
  bounds: Bounds;
  level: Level;
  coordinates: SchoolCoordinates;
}

export default function InsetMap({ id, bounds, level, coordinates }: Props) {
  const mapRef = useRef<MapRef>();

  const { latmin, latmax, lngmin, lngmax } = bounds;

  const { lat_new, lon_new } = coordinates;

  const latBackup = (latmin + latmax) / 2;
  const lngBackup = (lngmin + lngmax) / 2;

  const pointCoordinates = [lon_new || lngBackup, lat_new || latBackup];

  const mapboxData = {
    type: "FeatureCollection" as "FeatureCollection",
    features: [
      {
        type: "Feature" as "Feature",
        geometry: {
          type: "Point" as "Point",
          coordinates: pointCoordinates,
        },
        properties: {},
      },
    ],
  };

  const isSchool = level === Level.School;

  const zoomToLocation = useCallback(() => {
    if (!mapRef.current) {
      return;
    }

    const mapBounds: LngLatBoundsLike = [
      [bounds.lngmin, bounds.latmin],
      [bounds.lngmax, bounds.latmax],
    ];

    mapRef.current.fitBounds(mapBounds, {
      padding: 25,
      duration: 2000,
    });
  }, [bounds]);

  useEffect(() => {
    zoomToLocation();
  }, [bounds, zoomToLocation]);

  const elementaryDistrictLayer = {
    id: "elementary-district-boundary",
    type: "fill" as "fill",
    "source-layer": elementaryDistrictSourceLayer,
    paint: {
      "fill-outline-color": selectedAreaColor,
      "fill-color": selectedAreaColor,
    },
    filter: ["==", "GEOID", id],
  };

  const secondaryDistrictLayer = {
    id: "secondary-district-boundary",
    type: "fill" as "fill",
    "source-layer": secondaryDistrictSourceLayer,
    paint: {
      "fill-outline-color": selectedAreaColor,
      "fill-color": selectedAreaColor,
    },
    filter: ["==", "GEOID", id],
  };

  const countyLayer = {
    id: "county-boundary",
    type: "fill" as "fill",
    "source-layer": countySourceLayer,
    paint: {
      "fill-outline-color": selectedAreaColor,
      "fill-color": selectedAreaColor,
    },
    filter: ["==", "GEOID", id],
  };

  const stateLayer = {
    id: "state-boundary",
    type: "fill" as "fill",
    "source-layer": stateSourceLayer,
    paint: {
      "fill-outline-color": selectedAreaColor,
      "fill-color": selectedAreaColor,
    },
    filter: ["==", "STUSPS", id],
  };

  const LayerProps = {
    id: "schools",
    type: "circle" as "circle",
    source: "schools-source",
    paint: {
      "circle-radius": 3.5,
      "circle-color": defaultMapSchoolColor,
      "circle-stroke-width": 2,
      "circle-stroke-color": "#000",
    },
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
          id="elementary-district-boundary-source"
          type="vector"
          url={elementaryDistrictBoundaryURL}
        >
          <Layer {...elementaryDistrictLayer} />
        </Source>
        <Source
          id="secondary-district-boundary-source"
          type="vector"
          url={secondaryDistrictBoundaryURL}
        >
          <Layer {...secondaryDistrictLayer} />
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
            id="schools-source"
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
