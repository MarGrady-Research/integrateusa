import React, { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";

import Head from "../components/fragments/Head";
import Header from "../components/fragments/Header";
import DemographicMap from "../components/fragments/Map";
import Loader from "../components/fragments/Loader";

import { mapHolder } from "./Map.module.scss";

export default function Map() {
  const [isLoading, setIsLoading] = useState(true);
  const [mapData, setMapData] = useState({
    type: "FeatureCollection" as "FeatureCollection",
    features: [],
  });

  const getData = () => {
    setIsLoading(true);

    axios
      .get("http://localhost:8000/api/mapschools/?q=2022")
      .then((res) => {
        setMapData((d) => ({
          ...d,
          features: res.data.map((e) => e.map_data),
        }));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head title="Map" desc="Mapping segregation">
        <link rel="icon" href="/mg_logo_cropped.png" />
      </Head>
      <Header />
      <div className={clsx("absolute w-full", mapHolder)}>
        {isLoading ? (
          <div className="pt-5">
            <Loader />
          </div>
        ) : (
          <DemographicMap mapData={mapData} />
        )}
      </div>
    </>
  );
}
