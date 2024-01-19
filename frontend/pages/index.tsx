import React from "react";
import clsx from "clsx";

import Head from "components/fragments/Head";
import DemographicMap from "components/fragments/Map";

import { useBreakpoint } from "hooks";

import { mapHolder } from "./index.module.scss";

export default function Map() {
  const breakpoint = useBreakpoint();
  const onSmallerScreen =
    breakpoint === "xs" || breakpoint === "sm" || breakpoint === "md";

  return (
    <>
      <Head title="Integrate USA" desc="Mapping segregation" />
      <div className={clsx("absolute w-full", mapHolder)}>
        <DemographicMap onSmallerScreen={onSmallerScreen} />
      </div>
    </>
  );
}
