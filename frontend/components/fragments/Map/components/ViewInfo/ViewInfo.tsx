import React, { memo } from "react";
import Paper from "@mui/material/Paper";
import clsx from "clsx";

import SummaryPie from "../SummaryPie";

import { root } from "./ViewInfo.module.scss";
import { MapboxGeoJSONFeatureExtended } from "interfaces";

interface Props {
  renderedFeatures: MapboxGeoJSONFeatureExtended[];
}

const getViewInfo = (renderedFeatures: MapboxGeoJSONFeatureExtended[]) => {
  let studentsTotal = 0;
  let asianTotal = 0;
  let blackTotal = 0;
  let hispanicTotal = 0;
  let whiteTotal = 0;
  let otherTotal = 0;

  for (const feature of renderedFeatures) {
    const { asian, black, hispanic, white, other } = feature.properties;

    const tot_enr = asian + black + hispanic + white + other;

    studentsTotal += tot_enr;
    asianTotal += asian;
    blackTotal += black;
    hispanicTotal += hispanic;
    whiteTotal += white;
    otherTotal += other;
  }

  const asianPercentageRaw = (asianTotal / studentsTotal) * 100;
  const blackPercentageRaw = (blackTotal / studentsTotal) * 100;
  const hispanicPercentageRaw = (hispanicTotal / studentsTotal) * 100;
  const whitePercentageRaw = (whiteTotal / studentsTotal) * 100;
  const otherPercentageRaw = (otherTotal / studentsTotal) * 100;

  const studentsEnrolled = studentsTotal.toLocaleString();
  const asianPercentage = asianPercentageRaw.toFixed(1);
  const blackPercentage = blackPercentageRaw.toFixed(1);
  const hispanicPercentage = hispanicPercentageRaw.toFixed(1);
  const whitePercentage = whitePercentageRaw.toFixed(1);
  const otherPercentage = otherPercentageRaw.toFixed(1);

  const pieData = [
    asianPercentageRaw,
    blackPercentageRaw,
    hispanicPercentageRaw,
    whitePercentageRaw,
    otherPercentageRaw,
  ];

  return {
    studentsEnrolled,
    asianPercentage,
    blackPercentage,
    hispanicPercentage,
    whitePercentage,
    otherPercentage,
    pieData,
  };
};

const ViewInfo = memo(({ renderedFeatures }: Props) => {
  const {
    studentsEnrolled,
    asianPercentage,
    blackPercentage,
    hispanicPercentage,
    whitePercentage,
    otherPercentage,
    pieData,
  } = getViewInfo(renderedFeatures);

  const noOfSchoolsInView = renderedFeatures.length.toLocaleString();
  const areSchoolsPresentInView = renderedFeatures.length != 0;

  const content = () => {
    if (!areSchoolsPresentInView) {
      return (
        <div className="flex items-center h-full">
          <p className="italic">
            Zoom or drag the map to see school data here!
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="mb-2">
          <p>
            <b>Schools in View: </b>
            {noOfSchoolsInView}
          </p>
          <p>
            <b>Students Enrolled: </b>
            {studentsEnrolled}
          </p>
        </div>
        <div className="mb-4">
          <p>
            <b className="text-asian">Asian: </b> {asianPercentage}%
          </p>
          <p>
            <b className="text-blackstudents">Black: </b> {blackPercentage}%
          </p>
          <p>
            <b className="text-hispanic">Hispanic: </b> {hispanicPercentage}%
          </p>
          <p>
            <b className="text-whitestudents">White: </b> {whitePercentage}%
          </p>
          <p>
            <b className="text-other">Other: </b> {otherPercentage}%
          </p>
        </div>
        <div className="w-1/2 mx-auto">
          <SummaryPie pieData={pieData} />
        </div>
      </>
    );
  };

  return (
    <Paper
      className={clsx(
        "absolute bottom-10 left-2.5 p-3 w-60 h-80 text-center text-sm hidden lg:block font-normal",
        root
      )}
    >
      {content()}
    </Paper>
  );
});

ViewInfo.displayName = "ViewInfo";

export default ViewInfo;
