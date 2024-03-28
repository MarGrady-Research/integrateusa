import React from "react";
import clsx from "clsx";

import Head from "components/fragments/Head";
import DemographicMap from "components/fragments/Map";

import { useBreakpointRegion } from "hooks";

import { mapHolder } from "./index.module.scss";

export default function Map() {
  const breakpointRegion = useBreakpointRegion();
  const onSmallerScreen =
    breakpointRegion === "xs" ||
    breakpointRegion === "sm" ||
    breakpointRegion === "md";

  return (
    <>
      <Head
        title="IntegrateUSA"
        desc="IntegrateUSA is a project by MarGrady Research, a mission-driven consulting firm specializing in education projects."
      />
      <div className={clsx("absolute w-full", mapHolder)}>
        <DemographicMap onSmallerScreen={onSmallerScreen} />
      </div>
    </>
  );
}
