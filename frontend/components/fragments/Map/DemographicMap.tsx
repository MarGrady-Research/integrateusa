import React, { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import axios, { AxiosError } from "axios";
import Map, {
  Layer,
  Source,
  NavigationControl,
  GeolocateControl,
  FullscreenControl,
  MapRef,
} from "react-map-gl";
import mapboxgl, { Expression, Visibility } from "mapbox-gl";
import { useDispatch, useSelector } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";

import Slideover from "./components/Slideover";
import LoadingDialog from "./components/LoadingDialog";

const InfoDialog = dynamic(() => import("./components/InfoDialog"));
const Popup = dynamic(() => import("./components/Popup"));
const ViewInfo = dynamic(() => import("./components/ViewInfo"));
const SchoolPie = dynamic(() => import("./components/SchoolPie"));
const AreaPie = dynamic(() => import("./components/AreaPie"));

import {
  selectBounds,
  selectLevel,
  selectDistrictType,
} from "store/selectSlice";
import { selectMapData, setMapData } from "store/apiCacheSlice";
import { selectZoomOnMap } from "store/mapSlice";
import { AppDispatch } from "store/store";

import {
  Level,
  MapLevel,
  MapStatus,
  DistrictType,
  MapProperties,
  HoverInfoInterface,
  Bounds,
  Feature,
  MapboxGeoJSONFeatureExtended,
} from "interfaces";
import {
  defaultMapSchoolColor,
  selectedAreaColor,
  unselectedAreaColor,
  stateBoundaryURL,
  countyBoundaryURL,
  elementaryDistrictBoundaryURL,
  secondaryDistrictBoundaryURL,
  stateSourceLayer,
  countySourceLayer,
  elementaryDistrictSourceLayer,
  secondaryDistrictSourceLayer,
} from "constants/";

import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "@/colors";

interface Props {
  onSmallerScreen: boolean;
}

const prop_array = [
  "max",
  ["get", "asian"],
  ["get", "black"],
  ["get", "hispanic"],
  ["get", "white"],
  ["get", "other"],
];

const schoolsSourceId = "schools-source";

const setInitialMapLevel = (
  zoomOnMap: boolean,
  level: Level,
  districtType: DistrictType
): MapLevel => {
  if (!zoomOnMap) {
    return MapLevel.School;
  }

  switch (level) {
    case Level.School:
      return MapLevel.School;
    case Level.District:
      return districtType === DistrictType.Secondary
        ? MapLevel.UnifiedSecondaryDistrict
        : MapLevel.UnifiedElementaryDistrict;
    case Level.County:
      return MapLevel.County;
    case Level.State:
      return MapLevel.School;
  }
};

const processMapData = (mapData: MapProperties[]): Feature[] => {
  return mapData.map((md) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [parseFloat(md.lon_new), parseFloat(md.lat_new)],
    },
    properties: md,
  }));
};

export default function DemographicMap({ onSmallerScreen }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const zoomOnMap = useSelector(selectZoomOnMap);
  const level = useSelector(selectLevel);
  const districtType = useSelector(selectDistrictType);

  const [mapLevel, setMapLevel] = useState(() =>
    setInitialMapLevel(zoomOnMap, level, districtType)
  );

  const mapData = useSelector(selectMapData);
  const mapDataExists = mapData !== null;

  const [mapStatus, setMapStatus] = useState(
    mapDataExists ? MapStatus.Rendering : MapStatus.Fetching
  );
  const mapRenderingComplete = mapStatus === MapStatus.Complete;

  const mapRef = useRef<MapRef>(null);

  const [hasMapLoaded, setHasMapLoaded] = useState(false);

  const initialBounds = useSelector(selectBounds);

  const [hoverInfo, setHoverInfo] = useState(null as HoverInfoInterface | null);
  const [isHovering, setIsHovering] = useState(false);

  const [hoveredFeatureData, setHoveredFeatureData] = useState(
    null as {
      source: string;
      sourceLayer: string;
      id: string | number | undefined;
    } | null
  );
  const [hoveredSchoolData, setHoveredSchoolData] = useState(
    null as { source: string; id: string | number | undefined } | null
  );

  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const toggleInfoDialog = () => {
    setInfoDialogOpen((o) => !o);
    setIsHovering(false);
  };

  const [cursor, setCursor] = useState("auto");

  const [renderedFeatures, setRenderedFeatures] = useState(
    [] as MapboxGeoJSONFeatureExtended[]
  );

  const stateVisibility = (
    mapLevel === MapLevel.State ? "visible" : "none"
  ) as Visibility;

  const stateLayer = {
    id: "state-boundary",
    type: "fill" as "fill",
    source: "state-boundary-source",
    "source-layer": stateSourceLayer,
    paint: {
      "fill-outline-color": "rgba(0,0,0,0.4)",
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        selectedAreaColor,
        unselectedAreaColor,
      ] as Expression,
    },
    layout: {
      visibility: stateVisibility,
    },
  };

  const countyVisibility = (
    mapLevel === MapLevel.County ? "visible" : "none"
  ) as Visibility;

  const countyLayer = {
    id: "county-boundary",
    type: "fill" as "fill",
    source: "county-boundary-source",
    "source-layer": countySourceLayer,
    paint: {
      "fill-outline-color": "rgba(0,0,0,0.4)",
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        selectedAreaColor,
        unselectedAreaColor,
      ] as Expression,
    },
    layout: {
      visibility: countyVisibility,
    },
  };

  const elementaryDistrictVisibility = (
    mapLevel === MapLevel.UnifiedElementaryDistrict ? "visible" : "none"
  ) as Visibility;

  const elementaryDistrictLayer = {
    id: "elementary-district-boundary",
    type: "fill" as "fill",
    source: "elementary-district-boundary-source",
    "source-layer": elementaryDistrictSourceLayer,
    paint: {
      "fill-outline-color": "rgba(0,0,0,0.4)",
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        selectedAreaColor,
        unselectedAreaColor,
      ] as Expression,
    },
    layout: {
      visibility: elementaryDistrictVisibility,
    },
  };

  const secondaryDistrictVisibility = (
    mapLevel === MapLevel.UnifiedSecondaryDistrict ? "visible" : "none"
  ) as Visibility;

  const secondaryDistrictLayer = {
    id: "secondary-district-boundary",
    type: "fill" as "fill",
    source: "secondary-district-boundary-source",
    "source-layer": secondaryDistrictSourceLayer,
    paint: {
      "fill-outline-color": "rgba(0,0,0,0.4)",
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        selectedAreaColor,
        unselectedAreaColor,
      ] as Expression,
    },
    layout: {
      visibility: secondaryDistrictVisibility,
    },
  };

  const LayerProps = {
    id: "schools",
    type: "circle" as "circle",
    source: schoolsSourceId,
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        3.5,
        1,
        14,
        9,
      ] as Expression,
      "circle-color": [
        "case",
        ["==", ["get", "asian"], prop_array],
        asianColor,
        ["==", ["get", "black"], prop_array],
        blackColor,
        ["==", ["get", "hispanic"], prop_array],
        hispanicColor,
        ["==", ["get", "white"], prop_array],
        whiteColor,
        ["==", ["get", "other"], prop_array],
        otherColor,
        defaultMapSchoolColor,
      ] as Expression,
      "circle-stroke-width": 2,
      "circle-stroke-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "#000",
        "transparent",
      ] as Expression,
    },
  };

  const coordinates = {
    x: hoverInfo?.x,
    y: hoverInfo?.y,
    height: hoverInfo?.height,
    width: hoverInfo?.width,
  };

  const schoolName = hoverInfo?.feature.properties?.sch_name;
  const areaName = hoverInfo?.feature.properties?.NAME;

  const entityName = schoolName || areaName;

  const showPopup = entityName && isHovering;

  const mapboxData = {
    type: "FeatureCollection" as "FeatureCollection",
    features: mapData || [],
  };

  let urlParams = "";

  if (areaName) {
    const { GEOID, STUSPS, NAME, latmin, latmax, lngmin, lngmax } =
      hoverInfo.feature.properties;

    let level = "";
    let id = "";

    if (GEOID.length === 5) {
      id = GEOID;
      level = Level.County.toString();
    } else if (GEOID.length === 7) {
      id = GEOID;
      level = Level.District.toString();
    } else if (STUSPS) {
      id = STUSPS;
      level = Level.State.toString();
    }

    const params = new URLSearchParams({});

    if (id) {
      params.append("id", id);
    }

    if (level) {
      params.append("level", level);
    }

    if (NAME) {
      params.append("name", NAME);
    }

    if (lngmin) {
      params.append("xmin", lngmin);
    }

    if (lngmax) {
      params.append("xmax", lngmax);
    }

    if (latmin) {
      params.append("ymin", latmin);
    }

    if (latmax) {
      params.append("ymax", latmax);
    }

    if (mapLevel === MapLevel.UnifiedElementaryDistrict) {
      params.append("dist_type", DistrictType.Elementary);
    } else if (mapLevel === MapLevel.UnifiedSecondaryDistrict) {
      params.append("dist_type", DistrictType.Secondary);
    } else {
      params.append("dist_type", DistrictType.Unified);
    }

    urlParams = `/?${params.toString()}`;
  } else if (schoolName) {
    const {
      nces_id,
      sch_name,
      xminimum,
      xmaximum,
      yminimum,
      ymaximum,
      lat_new,
      lon_new,
    } = hoverInfo.feature.properties;

    const level = Level.School.toString();

    const params = new URLSearchParams({});

    if (nces_id) {
      params.append("id", nces_id);
    }

    if (level) {
      params.append("level", level);
    }

    if (sch_name) {
      params.append("name", sch_name);
    }

    if (xminimum) {
      params.append("xmin", xminimum);
    }

    if (xmaximum) {
      params.append("xmax", xmaximum);
    }

    if (yminimum) {
      params.append("ymin", yminimum);
    }

    if (ymaximum) {
      params.append("ymax", ymaximum);
    }

    if (lat_new) {
      params.append("lat_new", lat_new);
    }

    if (lon_new) {
      params.append("lon_new", lon_new);
    }

    urlParams = `/?${params.toString()}`;
  }

  const hideSegLink = typeof schoolName != "undefined";

  const handleMapLevel = (mapLevel: MapLevel) => {
    setMapLevel(mapLevel);
  };

  const updateBounds = useCallback((b: Bounds) => {
    if (mapRef.current) {
      mapRef.current.fitBounds(
        [
          [b.lngmin, b.latmin],
          [b.lngmax, b.latmax],
        ],
        { padding: 25, duration: 2000 }
      );
    }
  }, []);

  const handleBounds = (b: Bounds) => {
    updateBounds(b);
  };

  const handleHover = useCallback(
    (event: mapboxgl.MapLayerMouseEvent) => {
      setHoverInfo(null);
      setIsHovering(false);

      const {
        point: { x, y },
      } = event;

      const height = (event.originalEvent.target as HTMLCanvasElement).height;
      const width = (event.originalEvent.target as HTMLCanvasElement).width;

      const hoveredFeature = event.features && event.features[0];

      if (hoveredFeature) {
        setCursor("pointer");
        setHoverInfo({
          feature: hoveredFeature as MapboxGeoJSONFeatureExtended,
          x,
          y,
          height,
          width,
        });
        setIsHovering(true);

        const hoveringOnSchool = hoveredFeature.source === schoolsSourceId;

        if (hoveringOnSchool) {
          setHoveredSchoolData({
            source: hoveredFeature.source,
            id: hoveredFeature.id,
          });
        } else {
          setHoveredFeatureData({
            source: hoveredFeature.source,
            sourceLayer: hoveredFeature.sourceLayer,
            id: hoveredFeature.id,
          });
        }

        if (mapRef.current) {
          if (hoveringOnSchool) {
            if (hoveredFeatureData) {
              mapRef.current.setFeatureState(hoveredFeatureData, {
                hover: false,
              });
            }

            mapRef.current.removeFeatureState({
              source: hoveredFeature.source,
            });

            mapRef.current.setFeatureState(
              {
                source: hoveredFeature.source,
                id: hoveredFeature.id,
              },
              { hover: true }
            );
          } else {
            if (hoveredSchoolData) {
              mapRef.current.setFeatureState(hoveredSchoolData, {
                hover: false,
              });
            }

            mapRef.current.removeFeatureState({
              source: hoveredFeature.source,
              sourceLayer: hoveredFeature.sourceLayer,
            });

            mapRef.current.setFeatureState(
              {
                source: hoveredFeature.source,
                sourceLayer: hoveredFeature.sourceLayer,
                id: hoveredFeature.id,
              },
              { hover: true }
            );
          }
        }
      }
    },
    [hoveredFeatureData, hoveredSchoolData]
  );

  const onMouseLeave = useCallback(() => {
    if (mapRef.current) {
      if (hoveredFeatureData) {
        mapRef.current.setFeatureState(hoveredFeatureData, {
          hover: false,
        });
      }

      if (hoveredSchoolData) {
        mapRef.current.setFeatureState(hoveredSchoolData, {
          hover: false,
        });
      }
    }

    setIsHovering(false);
    setCursor("auto");
  }, [hoveredFeatureData, hoveredSchoolData]);

  const onMouseOut = useCallback(() => {
    if (mapRef.current) {
      if (hoveredFeatureData) {
        mapRef.current.setFeatureState(hoveredFeatureData, {
          hover: false,
        });
      }

      if (hoveredSchoolData) {
        mapRef.current.setFeatureState(hoveredSchoolData, {
          hover: false,
        });
      }
    }

    setIsHovering(false);
    setCursor("auto");
  }, [hoveredFeatureData, hoveredSchoolData]);

  const handleDialog = () => {
    if (hoverInfo) {
      toggleInfoDialog();
    }
  };

  const mapDataApiCallDone = useRef(false);

  useEffect(() => {
    if (mapDataApiCallDone.current) {
      return;
    }

    const abortController = new AbortController();

    axios
      .get<MapProperties[]>("/api/mapschools/?q=2022", {
        signal: abortController.signal,
      })
      .then((res) => {
        mapDataApiCallDone.current = true;

        const processedMapData = processMapData(res.data);

        dispatch(setMapData(processedMapData));

        if (!mapDataExists) {
          setMapStatus(MapStatus.Rendering);
        }
      })
      .catch((error: AxiosError) => {
        if (!mapDataExists && error.name !== "CanceledError") {
          mapDataApiCallDone.current = true;

          setMapStatus(MapStatus.Failed);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [dispatch, mapDataExists]);

  const querySchools = () => {
    if (!mapRenderingComplete) {
      return;
    }

    if (mapRef.current) {
      const features = mapRef.current.queryRenderedFeatures(undefined, {
        layers: ["schools"],
      });

      setRenderedFeatures(features as MapboxGeoJSONFeatureExtended[]);
    }
  };

  const querySchoolsInitial = () => {
    if (mapRef.current) {
      const features = mapRef.current.queryRenderedFeatures(undefined, {
        layers: ["schools"],
      });

      setRenderedFeatures(features as MapboxGeoJSONFeatureExtended[]);
    }
  };

  const onInitialRender = (source) => {
    if (renderedFeatures.length > 0) {
      return;
    }

    if (
      source.isSourceLoaded &&
      source.sourceId === schoolsSourceId &&
      source.sourceCacheId === `other:${schoolsSourceId}` &&
      source.source.data.features.length > 0
    ) {
      querySchoolsInitial();
      setMapStatus(MapStatus.Complete);
    }
  };

  const onLoad = useCallback(() => {
    setHasMapLoaded(true);

    if (onSmallerScreen || zoomOnMap) {
      updateBounds(initialBounds);
    }
  }, [onSmallerScreen, zoomOnMap, initialBounds, updateBounds]);

  const pie = (small?: boolean) =>
    schoolName ? (
      <SchoolPie hoverInfo={hoverInfo} small={small} />
    ) : (
      <AreaPie hoverInfo={hoverInfo} mapData={mapData || []} small={small} />
    );

  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -98.5795,
          latitude: 39.828175,
          zoom: 4,
        }}
        style={{ position: "relative", width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        attributionControl={true}
        interactiveLayerIds={[
          "schools",
          "elementary-district-boundary",
          "secondary-district-boundary",
          "county-boundary",
          "state-boundary",
        ]}
        cursor={cursor}
        onDragStart={onMouseOut}
        onDragEnd={querySchools}
        onLoad={onLoad}
        onClick={handleDialog}
        onMouseMove={handleHover}
        onMouseLeave={onMouseLeave}
        onMouseOut={onMouseOut}
        onResize={querySchools}
        onZoomStart={onMouseOut}
        onZoomEnd={querySchools}
        onSourceData={onInitialRender}
      >
        {mapRenderingComplete && (
          <>
            <GeolocateControl position="top-left" />
            <FullscreenControl position="top-left" />
            <NavigationControl position="top-left" />
          </>
        )}

        {hasMapLoaded && (
          <>
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
            <Source
              id="state-boundary-source"
              type="vector"
              url={stateBoundaryURL}
            >
              <Layer {...stateLayer} />
            </Source>
            <Source
              id={schoolsSourceId}
              type="geojson"
              data={mapboxData}
              generateId
            >
              <Layer {...LayerProps} />
            </Source>
          </>
        )}
        {mapRenderingComplete && showPopup && (
          <Popup name={entityName} coordinates={coordinates}>
            {pie(true)}
          </Popup>
        )}
        {mapRenderingComplete && (
          <ViewInfo renderedFeatures={renderedFeatures} />
        )}
        <InfoDialog
          name={entityName}
          open={infoDialogOpen}
          handleClose={toggleInfoDialog}
          urlParams={urlParams}
          hideSegLink={hideSegLink}
        >
          {pie()}
        </InfoDialog>
        {mapRenderingComplete && (
          <ViewInfo renderedFeatures={renderedFeatures} />
        )}
        <LoadingDialog open={!mapRenderingComplete} mapStatus={mapStatus} />
      </Map>
      {mapRenderingComplete && (
        <Slideover
          mapLevel={mapLevel}
          handleMapLevel={handleMapLevel}
          handleBounds={handleBounds}
        />
      )}
    </>
  );
}
