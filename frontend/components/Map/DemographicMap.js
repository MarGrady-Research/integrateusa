import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import Loader from "../fragments/Loader";

import Map, {
  Layer,
  Source,
  NavigationControl,
  GeolocateControl,
  FullscreenControl,
} from "react-map-gl";
import mapbox_token from "../../Key";
import MapPie from "./MapPies";
import Slideover from "./Slideover";
import SummaryPie from "./SummaryPie";
import AreaPie from "./AreaPie";
import "mapbox-gl/dist/mapbox-gl.css";

export default function DemographicMap() {
  // Loading state variable
  const [isLoading, setIsLoading] = useState(false);

  // Cursor state variable
  const [cursor, setCursor] = useState("auto");

  // Data state variable
  const [data, setData] = useState({});

  const getData = async () => {
    setIsLoading(true);
    const response = await axios.get(
      "http://localhost:8000/api/mapschools/?q=2022"
    );
    setData({
      type: "FeatureCollection",
      features: response.data.map((e) => e.map_data),
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  // State variable to control the visibility of the boundary layer
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

  // Layer object for state boundary layer
  const stateLayer = {
    id: "state-boundary",
    type: "fill",
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
    },
    layout: {
      visibility: stateVisible,
    },
  };

  // State variable to control the visibility of the county boundary layer
  const [countyVisible, setCountyVisible] = useState("none");

  // Layer object for the county boundary layer
  const countyLayer = {
    id: "county-boundary",
    type: "fill",
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
    },
    layout: {
      visibility: countyVisible,
    },
  };

  // State variable to control the visibility of the district boundary layer
  const [districtVisible, setDistrictVisible] = useState("none");

  // Layer object for the district boundary layer
  const districtLayer = {
    id: "district-boundary",
    type: "fill",
    "source-layer": "2021_sd_unified-4mqqrn",
    paint: {
      "fill-outline-color": "rgba(0,0,0,0.4)",
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "rgba(0,0,0,0.1)",
        "rgba(255,255,255,0.1)",
      ],
    },
    layout: {
      visibility: districtVisible,
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
    type: "circle",
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
    },
  };

  // Using the useMap hook to access additional map methods
  const mapRef = useRef();

  const updateBounds = useCallback((e) => {
    mapRef.current.fitBounds(
      [
        [e.lngmin, e.latmin],
        [e.lngmax, e.latmax],
      ],
      { padding: 25, duration: 2000 }
    );
  }, []);

  // Handle bounds change
  const handleBounds = (e) => {
    updateBounds(e);
  };

  // Click info state variable, to hold relevant data from clicked school
  const [clickInfo, setClickInfo] = useState(null);

  // Initializing variables for hover source and hover source layer, so that we can refer back to them in onmouseleave function
  let hoverSource;
  let hoverSourceLayer;

  // Hover function gets data from hovered areas and sets styles
  const handleHover = useCallback((event) => {
    setClickInfo(null);
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = event.features && event.features[0];
    setClickInfo(hoveredFeature && { feature: hoveredFeature, x, y });
    if (hoveredFeature) {
      hoverSource = hoveredFeature.source;
      hoverSourceLayer = hoveredFeature.sourceLayer;
    }
    hoveredFeature &&
      mapRef.current.removeFeatureState({
        source: hoveredFeature.source,
        sourceLayer: hoveredFeature.sourceLayer,
      });
    hoveredFeature &&
      mapRef.current.setFeatureState(
        {
          source: hoveredFeature.source,
          sourceLayer: hoveredFeature.sourceLayer,
          id: hoveredFeature.id,
        },
        { hover: true }
      );
  }, []);

  // True if a school is under the mouse
  const selectedSchool =
    (clickInfo && clickInfo.feature.properties.sch_name) || "";
  // True if an area is under the mouse
  const selectedArea = (clickInfo && clickInfo.feature.properties.NAME) || "";

  // Set State on mouse enter
  const onMouseEnter = useCallback(() => setCursor("pointer"), []);

  // Set state on mouse leave
  const onMouseLeave = useCallback(() => {
    mapRef.current.removeFeatureState({
      source: hoverSource,
      sourceLayer: hoverSourceLayer,
    });
    setCursor("auto");
  }, []);

  // Set state on mouse exiting map canvas
  const onMouseOut = useCallback(() => {
    mapRef.current.removeFeatureState({
      source: hoverSource,
      sourceLayer: hoverSourceLayer,
    });
    setClickInfo(null);
  }, []);

  // State variable for currently rendered source
  const [renderedFeatures, setRenderedFeatures] = useState([]);

  // return an array of the schools currently rendered
  const querySchools = useCallback(() => {
    setRenderedFeatures(
      mapRef.current.queryRenderedFeatures({ layers: ["schools"] })
    );
  }, []);

  // Determine ID based on feature under the mouse
  let areaID = () => {
    if (clickInfo.feature.properties.GEOID.length === 5) {
      return "county_id";
    } else if (clickInfo.feature.properties.GEOID.length === 7) {
      return "dist_id";
    } else if (clickInfo.feature.properties.STUSPS) {
      return "state_abb";
    }
  };

  // Determine which property to match with
  let layerProp = () =>
    clickInfo.feature.properties.STUSPS ? "STUSPS" : "GEOID";

  return (
    <>
      {isLoading ? (
        <div className="pt-5">
          <Loader />
        </div>
      ) : (
        <>
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
              <Source type="geojson" data={data}>
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
                        {data.features
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
                        {data.features
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
                            (data.features
                              .filter(
                                (e) =>
                                  e.properties[areaID()] ===
                                  clickInfo.feature.properties[layerProp()]
                              )
                              .map((e) => e.properties.as)
                              .reduce((a, b) => a + b, 0) /
                              data.features
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
                            (data.features
                              .filter(
                                (e) =>
                                  e.properties[areaID()] ===
                                  clickInfo.feature.properties[layerProp()]
                              )
                              .map((e) => e.properties.bl)
                              .reduce((a, b) => a + b, 0) /
                              data.features
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
                            (data.features
                              .filter(
                                (e) =>
                                  e.properties[areaID()] ===
                                  clickInfo.feature.properties[layerProp()]
                              )
                              .map((e) => e.properties.hi)
                              .reduce((a, b) => a + b, 0) /
                              data.features
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
                            (data.features
                              .filter(
                                (e) =>
                                  e.properties[areaID()] ===
                                  clickInfo.feature.properties[layerProp()]
                              )
                              .map((e) => e.properties.or)
                              .reduce((a, b) => a + b, 0) /
                              data.features
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
                            (data.features
                              .filter(
                                (e) =>
                                  e.properties[areaID()] ===
                                  clickInfo.feature.properties[layerProp()]
                              )
                              .map((e) => e.properties.wh)
                              .reduce((a, b) => a + b, 0) /
                              data.features
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
                          piedata={data}
                          clickInfo={clickInfo}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="absolute bottom-10 left-10 bg-gray-900 text-white text-center font-light w-60 h-72 rounded-md hidden lg:block">
                <div className="p-3">
                  {renderedFeatures.length === 0 ? (
                    <span className="italic">
                      Zoom or drag the map to see school data here!
                    </span>
                  ) : (
                    <>
                      <span>
                        <b>Schools in View: </b>
                        {renderedFeatures
                          ? renderedFeatures.length.toLocaleString()
                          : 0}
                      </span>
                      <br />
                      <span>
                        <b>Students Enrolled: </b>
                        {renderedFeatures
                          .map((e) => e.properties.tot_enr)
                          .reduce((a, b) => a + b, 0)
                          .toLocaleString()}
                      </span>
                      <br />
                      <span className="text-asian">
                        <b>Asian:</b>{" "}
                        <span className="text-white">
                          {(
                            (renderedFeatures
                              .map((e) => e.properties.as)
                              .reduce((a, b) => a + b, 0) /
                              renderedFeatures
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
                            (renderedFeatures
                              .map((e) => e.properties.bl)
                              .reduce((a, b) => a + b, 0) /
                              renderedFeatures
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
                            (renderedFeatures
                              .map((e) => e.properties.hi)
                              .reduce((a, b) => a + b, 0) /
                              renderedFeatures
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
                            (renderedFeatures
                              .map((e) => e.properties.or)
                              .reduce((a, b) => a + b, 0) /
                              renderedFeatures
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
                            (renderedFeatures
                              .map((e) => e.properties.wh)
                              .reduce((a, b) => a + b, 0) /
                              renderedFeatures
                                .map((e) => e.properties.tot_enr)
                                .reduce((a, b) => a + b, 0)) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </span>
                      <br />
                      <div className="w-1/2 justify-center pt-2 mx-auto">
                        <SummaryPie renderedFeatures={renderedFeatures} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Map>
            <Slideover
              handleVisibility={handleVisibility}
              handleBounds={handleBounds}
            />
          </div>
        </>
      )}
    </>
  );
}
