import React, { useState, useCallback, useRef } from "react";
import Map, {
  Layer,
  Source,
  NavigationControl,
  GeolocateControl,
  FullscreenControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import mapbox_token from "../../../Key";
import MapPie from "./components/MapPies";
import Slideover from "./components/Slideover";
import AreaPie from "./components/AreaPie";
import ViewDialog from "./components/ViewDialog";

export default function DemographicMap({ mapData }) {
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

  const [clickInfo, setClickInfo] = useState(null);

  let hoverSource;
  let hoverSourceLayer;

  const handleHover = useCallback((event) => {
    setClickInfo(null);
    const {
      point: { x, y },
    } = event;

    const hoveredFeature = event.features && event.features[0];
    setClickInfo(hoveredFeature && { feature: hoveredFeature, x, y });

    if (hoveredFeature) {
      hoverSource = hoveredFeature.source;
      hoverSourceLayer = hoveredFeature.sourceLayer;

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

  const selectedSchool =
    (clickInfo && clickInfo.feature.properties.sch_name) || "";
  const selectedArea = (clickInfo && clickInfo.feature.properties.NAME) || "";

  const onMouseEnter = useCallback(() => setCursor("pointer"), []);

  const onMouseLeave = useCallback(() => {
    if (mapRef.current) {
      (mapRef.current as any).removeFeatureState({
        source: hoverSource,
        sourceLayer: hoverSourceLayer,
      });
    }

    setCursor("auto");
  }, []);

  const onMouseOut = useCallback(() => {
    if (mapRef.current) {
      (mapRef.current as any).removeFeatureState({
        source: hoverSource,
        sourceLayer: hoverSourceLayer,
      });
    }
    setClickInfo(null);
  }, []);

  const [renderedFeatures, setRenderedFeatures] = useState([]);

  const querySchools = useCallback(() => {
    if (mapRef.current) {
      setRenderedFeatures(
        (mapRef.current as any).queryRenderedFeatures({ layers: ["schools"] })
      );
    }
  }, []);

  let areaID = () => {
    if (clickInfo.feature.properties.GEOID.length === 5) {
      return "county_id";
    } else if (clickInfo.feature.properties.GEOID.length === 7) {
      return "dist_id";
    } else if (clickInfo.feature.properties.STUSPS) {
      return "state_abb";
    }
  };

  let layerProp = () =>
    clickInfo.feature.properties.STUSPS ? "STUSPS" : "GEOID";

  return (
    <div className="relative w-full h-[calc(100vh-66px)]">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -100,
          latitude: 40,
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
        onLoad={querySchools}
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
        <Source type="geojson" data={mapData}>
          <Layer {...LayerProps} />
        </Source>
        {(selectedSchool || selectedArea) && (
          <div
            style={{
              left: clickInfo.x + 20,
              top: clickInfo.y + 20,
              zIndex: 10,
              position: "absolute",
              maxWidth: "300px",
            }}
            className="bg-gray-900 text-white text-center font-light w-60 h-300 rounded-md"
          >
            {selectedSchool && (
              <div className="p-3">
                <span className="overflow-ellipsis">
                  <b>{selectedSchool}</b>
                </span>
                <br />
                <span>
                  <b>District: </b>
                  {clickInfo.feature.properties.dist_name}
                </span>
                <br />
                <span>
                  <b>County: </b>
                  {clickInfo.feature.properties.county_name}
                </span>
                <br />
                <span>
                  <b>{clickInfo.feature.properties.year} Enrollment: </b>{" "}
                  {clickInfo.feature.properties.tot_enr.toLocaleString()}
                </span>
                <br />
                <span className="text-asian">
                  <b>Asian:</b>{" "}
                  <span className="text-white">
                    {(
                      (clickInfo.feature.properties.as /
                        clickInfo.feature.properties.tot_enr) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </span>
                <br />
                <span className="text-blackstudents">
                  <b>Black:</b>{" "}
                  <span className="text-white">
                    {(
                      (clickInfo.feature.properties.bl /
                        clickInfo.feature.properties.tot_enr) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </span>
                <br />
                <span className="text-hispanic">
                  <b>Hispanic:</b>{" "}
                  <span className="text-white">
                    {(
                      (clickInfo.feature.properties.hi /
                        clickInfo.feature.properties.tot_enr) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </span>
                <br />
                <span className="text-other">
                  <b>Other:</b>{" "}
                  <span className="text-white">
                    {(
                      (clickInfo.feature.properties.or /
                        clickInfo.feature.properties.tot_enr) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </span>
                <br />
                <span className="text-whitestudents">
                  <b>White:</b>{" "}
                  <span className="text-white">
                    {(
                      (clickInfo.feature.properties.wh /
                        clickInfo.feature.properties.tot_enr) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </span>
                <br />
                <div className="w-1/2 justify-center pt-2 mx-auto">
                  <MapPie clickInfo={clickInfo} />
                </div>
              </div>
            )}

            {selectedArea && (
              <div className="p-3">
                <span>
                  <b>{selectedArea}</b>
                </span>
                <br />
                <span>
                  Total Schools:{" "}
                  {mapData.features
                    .filter(
                      (e) =>
                        e.properties[areaID()] ===
                        clickInfo.feature.properties[layerProp()]
                    )
                    .length.toLocaleString()}
                </span>
                <br />
                <span>
                  Students Enrolled:{" "}
                  {mapData.features
                    .filter(
                      (e) =>
                        e.properties[areaID()] ===
                        clickInfo.feature.properties[layerProp()]
                    )
                    .map((e) => e.properties.tot_enr)
                    .reduce((a, b) => a + b, 0)
                    .toLocaleString()}
                </span>
                <br />
                <span className="text-asian">
                  <b>Asian:</b>{" "}
                  <span className="text-white">
                    {(
                      (mapData.features
                        .filter(
                          (e) =>
                            e.properties[areaID()] ===
                            clickInfo.feature.properties[layerProp()]
                        )
                        .map((e) => e.properties.as)
                        .reduce((a, b) => a + b, 0) /
                        mapData.features
                          .filter(
                            (e) =>
                              e.properties[areaID()] ===
                              clickInfo.feature.properties[layerProp()]
                          )
                          .map((e) => e.properties.tot_enr)
                          .reduce((a, b) => a + b, 0)) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </span>
                <br />
                <span className="text-blackstudents">
                  <b>Black:</b>{" "}
                  <span className="text-white">
                    {(
                      (mapData.features
                        .filter(
                          (e) =>
                            e.properties[areaID()] ===
                            clickInfo.feature.properties[layerProp()]
                        )
                        .map((e) => e.properties.bl)
                        .reduce((a, b) => a + b, 0) /
                        mapData.features
                          .filter(
                            (e) =>
                              e.properties[areaID()] ===
                              clickInfo.feature.properties[layerProp()]
                          )
                          .map((e) => e.properties.tot_enr)
                          .reduce((a, b) => a + b, 0)) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </span>
                <br />
                <span className="text-hispanic">
                  <b>Hispanic:</b>{" "}
                  <span className="text-white">
                    {(
                      (mapData.features
                        .filter(
                          (e) =>
                            e.properties[areaID()] ===
                            clickInfo.feature.properties[layerProp()]
                        )
                        .map((e) => e.properties.hi)
                        .reduce((a, b) => a + b, 0) /
                        mapData.features
                          .filter(
                            (e) =>
                              e.properties[areaID()] ===
                              clickInfo.feature.properties[layerProp()]
                          )
                          .map((e) => e.properties.tot_enr)
                          .reduce((a, b) => a + b, 0)) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </span>
                <br />
                <span className="text-other">
                  <b>Other:</b>{" "}
                  <span className="text-white">
                    {(
                      (mapData.features
                        .filter(
                          (e) =>
                            e.properties[areaID()] ===
                            clickInfo.feature.properties[layerProp()]
                        )
                        .map((e) => e.properties.or)
                        .reduce((a, b) => a + b, 0) /
                        mapData.features
                          .filter(
                            (e) =>
                              e.properties[areaID()] ===
                              clickInfo.feature.properties[layerProp()]
                          )
                          .map((e) => e.properties.tot_enr)
                          .reduce((a, b) => a + b, 0)) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </span>
                <br />
                <span className="text-whitestudents">
                  <b>White:</b>{" "}
                  <span className="text-white">
                    {(
                      (mapData.features
                        .filter(
                          (e) =>
                            e.properties[areaID()] ===
                            clickInfo.feature.properties[layerProp()]
                        )
                        .map((e) => e.properties.wh)
                        .reduce((a, b) => a + b, 0) /
                        mapData.features
                          .filter(
                            (e) =>
                              e.properties[areaID()] ===
                              clickInfo.feature.properties[layerProp()]
                          )
                          .map((e) => e.properties.tot_enr)
                          .reduce((a, b) => a + b, 0)) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </span>
                <br />
                <div className="w-1/2 justify-center pt-2 mx-auto">
                  <AreaPie
                    areaID={areaID}
                    layerProp={layerProp}
                    piedata={mapData}
                    clickInfo={clickInfo}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        <ViewDialog renderedFeatures={renderedFeatures} />
      </Map>
      <Slideover
        handleVisibility={handleVisibility}
        handleBounds={handleBounds}
      />
    </div>
  );
}
