import React from "react";

import Head from "../components/fragments/Head";
import Header from "../components/Header";
import DemographicMap from "../components/Map/DemographicMap";

export default function Map() {
  return (
    <>
      <Head title="Map" desc="Mapping segregation">
        <link rel="icon" href="/mg_logo_cropped.png" />
      </Head>
      <Header />
      <div className="absolute flex flex-col h-[calc(100vh-83px)] w-full">
        <DemographicMap />
      </div>
    </>
  );
}
