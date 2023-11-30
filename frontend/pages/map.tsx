import React, { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";

import Head from "../components/fragments/Head";
import Header from "../components/fragments/Header";
import DemographicMap from "../components/fragments/Map";
import { useDevice } from "../hooks";

// @ts-ignore
import { mapHolder } from "./Map.module.scss";

export default function Map() {
  const device = useDevice();
  const onSmallerScreen = device === "Tablet";

  return (
    <>
      <Head title="Map" desc="Mapping segregation">
        <link rel="icon" href="/mg_logo_cropped.png" />
      </Head>
      <Header />
      <div className={clsx("absolute w-full", mapHolder)}>
        <DemographicMap onSmallerScreen={onSmallerScreen} />
      </div>
    </>
  );
}
