import React, { useState, useCallback, useRef } from "react";
import Map, {
  Layer,
  Source,
  NavigationControl,
  GeolocateControl,
  FullscreenControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSelector } from "react-redux";

import mapbox_token from "../../../Key";
import Slideover from "./components/Slideover";
import ViewDialog from "./components/ViewDialog";
import AreaDialog from "./components/AreaDialog";
import SchoolDialog from "./components/SchoolDialog";
import Popup from "./components/Popup";
import { selectBounds } from "../../../store/selectSlice";

export default function DemographicMap({ mapData, onSmallerScreen }) {
  const initialBounds = useSelector(selectBounds);

  const [schoolDialogOpen, setSchoolDialogOpen] = useState(false);
  const toggleSchoolDialog = () => setSchoolDialogOpen((o) => !o);

  const [areaDialogOpen, setAreaDialogOpen] = useState(false);
  const toggleAreaDialog = () => setAreaDialogOpen((o) => !o);

  const [cursor, setCursor] = useState("auto");

  const [stateVisible, setStateVisible] = useState("none");

  const handleVisibility = (level) => {
    if (level === "District") {
      setDistrictVisible("visible");
      setCountyVisible("none");
      setStateVisible("none");
    } else if (level === "County") {
      setDistrictVisible("none");
      setCountyVisible("visible");
      setStateVisible("none");
    } else if (level === "State") {
      setDistrictVisible("none");
      setCountyVisible("none");
      setStateVisible("visible");
    } else {
      setDistrictVisible("none");
      setCountyVisible("none");
      setStateVisible("none");
    }
  };

  const stateLayer = {
    id: "state-boundary",
    type: "fill" as any,
    source: "state-boundary-source",
    "source-layer": "cb_2018_us_state_500k-8q06w5",
    paint: {
      "fill-outline-color": "rgba(0,0,0,0.4)",
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "rgba(0,0,0,0.1)",
        "rgba(255,255,255,0.1)",
      ],
    } as any,
    layout: {
      visibility: stateVisible as any,
    },
  };

  const [countyVisible, setCountyVisible] = useState("none");

  const countyLayer = {
    id: "county-boundary",
    type: "fill" as any,
    source: "county-boundary-source",
    "source-layer": "cb_2018_us_county_500k-6dd9y3",
    paint: {
      "fill-outline-color": "rgba(0,0,0,0.4)",
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "rgba(0,0,0,0.1)",
        "rgba(255,255,255,0.1)",
      ],
    } as any,
    layout: {
      visibility: countyVisible as any,
    },
  };

  const [districtVisible, setDistrictVisible] = useState("none");

  const districtLayer = {
    id: "district-boundary",
    type: "fill" as any,
    "source-layer": "2021_sd_unified-4mqqrn",
    paint: {
      "fill-outline-color": "rgba(0,0,0,0.4)",
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "rgba(0,0,0,0.1)",
        "rgba(255,255,255,0.1)",
      ],
    } as any,
    layout: {
      visibility: districtVisible as any,
    },
  };

  const prop_array = [
    "max",
    ["get", "as"],
    ["get", "bl"],
    ["get", "hi"],
    ["get", "or"],
    ["get", "wh"],
  ];

  const LayerProps = {
    id: "schools",
    type: "circle" as any,
    source: "schools-source",
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 3.5, 1, 14, 9],
      "circle-color": [
        "case",
        ["==", ["get", "as"], prop_array],
        "#FF5050",
        ["==", ["get", "bl"], prop_array],
        "#4472C4",
        ["==", ["get", "hi"], prop_array],
        "#FF9900",
        ["==", ["get", "or"], prop_array],
        "#FFC000",
        ["==", ["get", "wh"], prop_array],
        "#339933",
        "#808080",
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

  // Using the useMap hook to access additional map methods
  const mapRef = useRef();

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

  const [hoverInfo, setHoverInfo] = useState(null);
  const [dialogInfo, setDialogInfo] = useState(null);

  const [hoverSource, setHoverSource] = useState(null);
  const [hoverSourceLayer, setHoverSourceLayer] = useState(null);

  const handleHover = useCallback((event) => {
    setHoverInfo(null);
    setDialogInfo(null);
    const {
      point: { x, y },
      originalEvent: {
        originalTarget: { height, width },
      },
    } = event;

    const hoveredFeature = event.features && event.features[0];
    setHoverInfo(
      hoveredFeature && {
        schoolName: hoveredFeature.properties.sch_name,
        areaName: hoveredFeature.properties.NAME,
        x,
        y,
        height,
        width,
      }
    );
    setDialogInfo(hoveredFeature && { feature: hoveredFeature });

    if (hoveredFeature) {
      setHoverSource(hoveredFeature.source);
      setHoverSourceLayer(hoveredFeature.sourceLayer);

      if (mapRef.current) {
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
  }, []);

  const onMouseEnter = useCallback(() => setCursor("pointer"), []);

  const onMouseLeave = useCallback(() => {
    if (mapRef.current && hoverSource && hoverSourceLayer) {
      (mapRef.current as any).removeFeatureState({
        source: hoverSource,
        sourceLayer: hoverSourceLayer,
      });
    }

    setCursor("auto");
  }, []);

  const onMouseOut = useCallback(() => {
    if (mapRef.current && hoverSource && hoverSourceLayer) {
      (mapRef.current as any).removeFeatureState({
        source: hoverSource,
        sourceLayer: hoverSourceLayer,
      });
    }
    setHoverInfo(null);
  }, []);

  const handleClick = useCallback(() => {
    if (dialogInfo) {
      const isSchool = !!dialogInfo.feature.properties.sch_name;

      if (isSchool) {
        toggleSchoolDialog();
        return;
      }

      const isArea = !!dialogInfo.feature.properties.NAME;

      if (isArea) {
        toggleAreaDialog();
      }
    }
  }, [dialogInfo]);

  const [renderedFeatures, setRenderedFeatures] = useState([]);

  const querySchools = useCallback(() => {
    if (mapRef.current) {
      setRenderedFeatures(
        (mapRef.current as any).queryRenderedFeatures({ layers: ["schools"] })
      );
    }
  }, []);

  const onLoad = () => {
    if (onSmallerScreen) {
      updateBounds(initialBounds);
    }
    querySchools();
  };

  const coordinates = {
    x: hoverInfo?.x,
    y: hoverInfo?.y,
    height: hoverInfo?.height,
    width: hoverInfo?.width,
  };

  const schoolName = hoverInfo?.schoolName;
  const areaName = hoverInfo?.areaName;

  const isSchoolSelected =
    dialogInfo && !!dialogInfo.feature.properties.sch_name;

  const isAreaSelected = dialogInfo && !!dialogInfo.feature.properties.NAME;

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
        mapboxAccessToken={mapbox_token}
        attributionControl={true}
        interactiveLayerIds={[
          "schools",
          "district-boundary",
          "county-boundary",
          "state-boundary",
        ]}
        cursor={cursor}
        onDragStart={onMouseOut}
        onDragEnd={querySchools}
        onLoad={onLoad}
        onClick={handleClick}
        onMouseMove={handleHover}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseOut={onMouseOut}
        onResize={querySchools}
        onZoomStart={onMouseOut}
        onZoomEnd={querySchools}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <Source
          id="district-boundary-source"
          type="vector"
          url="mapbox://theokaufman.45uz283x"
        >
          <Layer {...districtLayer} />
        </Source>
        <Source
          id="county-boundary-source"
          type="vector"
          url="mapbox://theokaufman.6i9q4by5"
        >
          <Layer {...countyLayer} />
        </Source>
        <Source
          id="state-boundary-source"
          type="vector"
          url="mapbox://theokaufman.a7l31auu"
        >
          <Layer {...stateLayer} />
        </Source>
        <Source id="schools-source" type="geojson" data={mapData} generateId>
          <Layer {...LayerProps} />
        </Source>
        {schoolName && <Popup name={schoolName} coordinates={coordinates} />}
        {areaName && <Popup name={areaName} coordinates={coordinates} />}
        {isSchoolSelected && (
          <SchoolDialog
            dialogInfo={dialogInfo}
            open={schoolDialogOpen}
            handleClose={toggleSchoolDialog}
          />
        )}
        {isAreaSelected && (
          <AreaDialog
            dialogInfo={dialogInfo}
            open={areaDialogOpen}
            handleClose={toggleAreaDialog}
            mapData={mapData}
          />
        )}
        <ViewDialog renderedFeatures={renderedFeatures} />
      </Map>
      <Slideover
        handleVisibility={handleVisibility}
        handleBounds={handleBounds}
      />
    </>
  );
}
