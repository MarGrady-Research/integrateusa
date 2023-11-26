import React, { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";

import Head from "../components/fragments/Head";
import Header from "../components/fragments/Header";
import DemographicMap from "../components/fragments/Map";
import Loader from "../components/fragments/Loader";
import { useDevice } from "../hooks";

import { MapData } from "../interfaces";

// @ts-ignore
import { mapHolder } from "./Map.module.scss";

export default function Map() {
  const [isLoading, setIsLoading] = useState(true);
  const [mapData, setMapData] = useState([] as MapData);

  const getData = () => {
    setIsLoading(true);

    axios
      .get("/api/mapschools/?q=2022")
      .then((res) => {
        setMapData(res.data.map((d) => d.map_data));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const device = useDevice();
  const deviceLoading = device === "Initial";
  const onSmallerScreen = device === "Tablet";

  return (
    <>
      <Head title="Map" desc="Mapping segregation">
        <link rel="icon" href="/mg_logo_cropped.png" />
      </Head>
      <Header />
      <div className={clsx("absolute w-full", mapHolder)}>
        {isLoading || deviceLoading ? (
          <div className="pt-5">
            <Loader />
          </div>
        ) : (
          <DemographicMap mapData={mapData} onSmallerScreen={onSmallerScreen} />
        )}
      </div>
    </>
  );
}
