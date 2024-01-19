import React, { useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Map, {
  Layer,
  Source,
  NavigationControl,
  GeolocateControl,
  FullscreenControl,
} from "react-map-gl";
import { Visibility } from "mapbox-gl";
import { useDispatch, useSelector } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";

import Slideover from "./components/Slideover";
import LoadingDialog from "./components/LoadingDialog";

const InfoDialog = dynamic(() => import("./components/InfoDialog"));
const Popup = dynamic(() => import("./components/Popup"));
const ViewInfo = dynamic(() => import("./components/ViewInfo"));
const SchoolPie = dynamic(() => import("./components/SchoolPie"));
const AreaPie = dynamic(() => import("./components/AreaPie"));

import { selectBounds } from "store/selectSlice";
import { selectMapData, setMapData } from "store/apiCacheSlice";
import { selectZoomOnMap } from "store/mapSlice";
import { Level, MapLevel, MapStatus } from "interfaces";
import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
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

const prop_array = [
  "max",
  ["get", "as"],
  ["get", "bl"],
  ["get", "hi"],
  ["get", "wh"],
  ["get", "or"],
];

interface Props {
  onSmallerScreen: boolean;
}

const schoolsSourceId = "schools-source";

export default function DemographicMap({ onSmallerScreen }: Props) {
  const dispatch = useDispatch();

  const zoomOnMap = useSelector(selectZoomOnMap);

  const mapData = useSelector(selectMapData);
  const mapDataExists = mapData !== null;

  const [mapStatus, setMapStatus] = useState(
    mapDataExists ? MapStatus.Rendering : MapStatus.Fetching
  );
  const mapRenderingComplete = mapStatus === MapStatus.Complete;

  const mapRef = useRef();

  const [hasMapLoaded, setHasMapLoaded] = useState(false);

  const initialBounds = useSelector(selectBounds);

  const [hoverInfo, setHoverInfo] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const [hoveredFeatureData, setHoveredFeatureData] = useState(null);
  const [hoveredSchoolData, setHoveredSchoolData] = useState(null);

  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const toggleInfoDialog = () => {
    setInfoDialogOpen((o) => !o);
    setIsHovering(false);
  };

  const [cursor, setCursor] = useState("auto");

  const [stateVisible, setStateVisible] = useState("none" as Visibility);
  const [countyVisible, setCountyVisible] = useState("none" as Visibility);
  const [elementaryDistrictVisible, setElementaryDistrictVisible] = useState(
    "none" as Visibility
  );
  const [secondaryDistrictVisible, setSecondaryDistrictVisible] = useState(
    "none" as Visibility
  );

  const [renderedFeatures, setRenderedFeatures] = useState([]);

  const stateLayer = {
    id: "state-boundary",
    type: "fill" as any,
    source: "state-boundary-source",
    "source-layer": stateSourceLayer,
    paint: {
      "fill-outline-color": "rgba(0,0,0,0.4)",
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        selectedAreaColor,
        unselectedAreaColor,
      ],
    } as any,
    layout: {
      visibility: stateVisible,
    },
  };

  const countyLayer = {
    id: "county-boundary",
    type: "fill" as any,
    source: "county-boundary-source",
    "source-layer": countySourceLayer,
    paint: {
      "fill-outline-color": "rgba(0,0,0,0.4)",
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        selectedAreaColor,
        unselectedAreaColor,
      ],
    } as any,
    layout: {
      visibility: countyVisible,
    },
  };

  const elementaryDistrictLayer = {
    id: "elementary-district-boundary",
    type: "fill" as any,
    source: "elementary-district-boundary-source",
    "source-layer": elementaryDistrictSourceLayer,
    paint: {
      "fill-outline-color": "rgba(0,0,0,0.4)",
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        selectedAreaColor,
        unselectedAreaColor,
      ],
    } as any,
    layout: {
      visibility: elementaryDistrictVisible,
    },
  };

  const secondaryDistrictLayer = {
    id: "secondary-district-boundary",
    type: "fill" as any,
    source: "secondary-district-boundary-source",
    "source-layer": secondaryDistrictSourceLayer,
    paint: {
      "fill-outline-color": "rgba(0,0,0,0.4)",
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        selectedAreaColor,
        unselectedAreaColor,
      ],
    } as any,
    layout: {
      visibility: secondaryDistrictVisible,
    },
  };

  const LayerProps = {
    id: "schools",
    type: "circle" as any,
    source: schoolsSourceId,
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 3.5, 1, 14, 9],
      "circle-color": [
        "case",
        ["==", ["get", "as"], prop_array],
        asianColor,
        ["==", ["get", "bl"], prop_array],
        blackColor,
        ["==", ["get", "hi"], prop_array],
        hispanicColor,
        ["==", ["get", "wh"], prop_array],
        whiteColor,
        ["==", ["get", "or"], prop_array],
        otherColor,
        defaultMapSchoolColor,
      ],
      "circle-stroke-width": 2,
      "circle-stroke-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "#000",
        "transparent",
      ],
    } as any,
  };

  const handleVisibility = (mapLevel: MapLevel) => {
    const elementaryDistrictVisibility =
      mapLevel === MapLevel.UnifiedElementaryDistrict ? "visible" : "none";
    const secondaryDistrictVisibility =
      mapLevel === MapLevel.UnifiedSecondaryDistrict ? "visible" : "none";
    const countyVisibility = mapLevel === MapLevel.County ? "visible" : "none";
    const stateVisibility = mapLevel === MapLevel.State ? "visible" : "none";

    setElementaryDistrictVisible(elementaryDistrictVisibility);
    setSecondaryDistrictVisible(secondaryDistrictVisibility);
    setCountyVisible(countyVisibility);
    setStateVisible(stateVisibility);
  };

  const updateBounds = useCallback((e) => {
    if (mapRef.current) {
      (mapRef.current as any).fitBounds(
        [
          [e.lngmin, e.latmin],
          [e.lngmax, e.latmax],
        ],
        { padding: 25, duration: 2000 }
      );
    }
  }, []);

  const handleBounds = (e) => {
    updateBounds(e);
  };

  const handleHover = useCallback(
    (event) => {
      setHoverInfo(null);
      setIsHovering(false);

      const {
        point: { x, y },
        originalEvent: {
          target: { height, width },
        },
      } = event;

      const hoveredFeature = event.features && event.features[0];

      if (hoveredFeature) {
        setCursor("pointer");
        setHoverInfo(
          hoveredFeature && {
            feature: hoveredFeature,
            x,
            y,
            height,
            width,
          }
        );
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
              (mapRef.current as any).setFeatureState(hoveredFeatureData, {
                hover: false,
              });
            }

            (mapRef.current as any).removeFeatureState({
              source: hoveredFeature.source,
            });

            (mapRef.current as any).setFeatureState(
              {
                source: hoveredFeature.source,
                id: hoveredFeature.id,
              },
              { hover: true }
            );
          } else {
            if (hoveredSchoolData) {
              (mapRef.current as any).setFeatureState(hoveredSchoolData, {
                hover: false,
              });
            }

            (mapRef.current as any).removeFeatureState({
              source: hoveredFeature.source,
              sourceLayer: hoveredFeature.sourceLayer,
            });

            (mapRef.current as any).setFeatureState(
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
        (mapRef.current as any).setFeatureState(hoveredFeatureData, {
          hover: false,
        });
      }

      if (hoveredSchoolData) {
        (mapRef.current as any).setFeatureState(hoveredSchoolData, {
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
        (mapRef.current as any).setFeatureState(hoveredFeatureData, {
          hover: false,
        });
      }

      if (hoveredSchoolData) {
        (mapRef.current as any).setFeatureState(hoveredSchoolData, {
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

  const getData = useCallback(() => {
    const mapDataExistsOnStore = mapData !== null;

    if (!mapDataExistsOnStore) {
      setMapStatus(MapStatus.Fetching);
    }

    axios
      .get("/api/mapschools/?q=2022")
      .then((res) => {
        dispatch(setMapData(res.data.map((d) => d.map_data)));

        if (!mapDataExistsOnStore) {
          setMapStatus(MapStatus.Rendering);
        }
      })
      .catch(() => {
        if (!mapDataExistsOnStore) {
          setMapStatus(MapStatus.Failed);
        }
      });
  }, [dispatch, mapData]);

  const querySchools = () => {
    if (!mapRenderingComplete) {
      return;
    }

    if (mapRef.current) {
      const features = (mapRef.current as any).queryRenderedFeatures({
        layers: ["schools"],
      });

      setRenderedFeatures(features);
    }
  };

  const querySchoolsInitial = () => {
    if (mapRef.current) {
      const features = (mapRef.current as any).queryRenderedFeatures({
        layers: ["schools"],
      });

      setRenderedFeatures(features);
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

    getData();
  }, [getData, onSmallerScreen, zoomOnMap, initialBounds, updateBounds]);

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

    urlParams = `/?${params.toString()}`;
  } else if (schoolName) {
    const { nces_id, sch_name, xmin, xmax, ymin, ymax, lat_new, lon_new } =
      hoverInfo.feature.properties;

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

    if (xmin) {
      params.append("xmin", xmin);
    }

    if (xmax) {
      params.append("xmax", xmax);
    }

    if (ymin) {
      params.append("ymin", ymin);
    }

    if (ymax) {
      params.append("ymax", ymax);
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
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
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
        {showPopup && (
          <Popup name={entityName} coordinates={coordinates}>
            {pie(true)}
          </Popup>
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
      <Slideover
        handleVisibility={handleVisibility}
        handleBounds={handleBounds}
      />
    </>
  );
}
