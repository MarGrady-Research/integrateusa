import React, { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";

import Head from "../components/fragments/Head";
import Header from "../components/fragments/Header";
import DemographicMap from "../components/fragments/Map";
import Loader from "../components/fragments/Loader";

// @ts-ignore
import { mapHolder } from "./Map.module.scss";

type Device = "Tablet" | "Desktop" | "Initial";

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

  const [device, setDevice] = useState("Initial");

  useEffect(() => {
    const returnDevice = (): Device => {
      if (window.innerWidth < 1024) {
        return "Tablet";
      }

      return "Desktop";
    };

    const handleResize = () => {
      const currentDevice = returnDevice();
      setDevice(currentDevice);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
