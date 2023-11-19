import React from "react";

import SummaryPie from "../SummaryPie";

const getViewInfo = (renderedFeatures) => {
  let studentsTotal = 0;
  let asianTotal = 0;
  let blackTotal = 0;
  let hispanicTotal = 0;
  let whiteTotal = 0;
  let otherTotal = 0;

  for (let feature of renderedFeatures) {
    const { tot_enr, as, bl, hi, wh, or } = feature.properties;
    studentsTotal += tot_enr;
    asianTotal += as;
    blackTotal += bl;
    hispanicTotal += hi;
    whiteTotal += wh;
    otherTotal += or;
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

export default function ViewDialog({ renderedFeatures }) {
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

  return (
    <div className="absolute bottom-10 left-10 bg-gray-900 text-white text-center font-light w-60 h-72 rounded-md hidden lg:block">
      <div className="p-3">
        {!areSchoolsPresentInView ? (
          <span className="italic">
            Zoom or drag the map to see school data here!
          </span>
        ) : (
          <>
            <span>
              <b>Schools in View: </b>
              {noOfSchoolsInView}
            </span>
            <br />
            <span>
              <b>Students Enrolled: </b>
              {studentsEnrolled}
            </span>
            <br />
            <span className="text-asian">
              <b>Asian:</b>{" "}
              <span className="text-white">{asianPercentage}%</span>
            </span>
            <br />
            <span className="text-blackstudents">
              <b>Black:</b>{" "}
              <span className="text-white">{blackPercentage}%</span>
            </span>
            <br />
            <span className="text-hispanic">
              <b>Hispanic:</b>{" "}
              <span className="text-white">{hispanicPercentage}%</span>
            </span>
            <br />
            <span className="text-whitestudents">
              <b>White:</b>{" "}
              <span className="text-white">{whitePercentage}%</span>
            </span>
            <br />
            <span className="text-other">
              <b>Other:</b>{" "}
              <span className="text-white">{otherPercentage}%</span>
            </span>
            <br />
            <div className="w-1/2 justify-center pt-2 mx-auto">
              <SummaryPie pieData={pieData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
