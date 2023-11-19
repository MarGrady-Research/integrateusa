import React from "react";

import AreaPie from "../AreaPie";

const getAreaInfo = (clickInfo, mapData) => {
  const { NAME, GEOID, STUSPS } = clickInfo.feature.properties;

  const areaName = NAME;
  const layerProp = STUSPS || GEOID;

  let areaId = "";

  if (GEOID.length === 5) {
    areaId = "county_id";
  } else if (GEOID.length === 7) {
    areaId = "dist_id";
  } else if (STUSPS) {
    areaId = "state_abb";
  }

  let schoolsTotal = 0;
  let studentsTotal = 0;
  let asianTotal = 0;
  let blackTotal = 0;
  let hispanicTotal = 0;
  let whiteTotal = 0;
  let otherTotal = 0;

  for (let feature of mapData) {
    const { tot_enr, as, bl, hi, wh, or } = feature.properties;

    if (feature.properties[areaId] === layerProp) {
      schoolsTotal += feature.length;
      studentsTotal += tot_enr;
      asianTotal += as;
      blackTotal += bl;
      hispanicTotal += hi;
      whiteTotal += wh;
      otherTotal += or;
    }
  }

  const schoolsInArea = schoolsTotal.toLocaleString();
  const studentsEnrolled = studentsTotal.toLocaleString();
  const asianPercentage = (asianTotal / studentsTotal) * 100;
  const blackPercentage = (blackTotal / studentsTotal) * 100;
  const hispanicPercentage = (hispanicTotal / studentsTotal) * 100;
  const whitePercentage = (whiteTotal / studentsTotal) * 100;
  const otherPercentage = (otherTotal / studentsTotal) * 100;

  return {
    areaName,
    schoolsInArea,
    studentsEnrolled,
    asianPercentage,
    blackPercentage,
    hispanicPercentage,
    whitePercentage,
    otherPercentage,
  };
};

export default function AreaDialog({ clickInfo, mapData }) {
  const {
    areaName,
    schoolsInArea,
    studentsEnrolled,
    asianPercentage,
    blackPercentage,
    hispanicPercentage,
    whitePercentage,
    otherPercentage,
  } = getAreaInfo(clickInfo, mapData);

  const pieData = [
    asianPercentage,
    blackPercentage,
    hispanicPercentage,
    whitePercentage,
    otherPercentage,
  ];

  return (
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
      <div className="p-3">
        <span>
          <b>{areaName}</b>
        </span>
        <br />
        <span>Total Schools: {schoolsInArea}</span>
        <br />
        <span>Students Enrolled: {studentsEnrolled}</span>
        <br />
        <span className="text-asian">
          <b>Asian:</b>{" "}
          <span className="text-white">{asianPercentage.toFixed(1)}%</span>
        </span>
        <br />
        <span className="text-blackstudents">
          <b>Black:</b>{" "}
          <span className="text-white">{blackPercentage.toFixed(1)}%</span>
        </span>
        <br />
        <span className="text-hispanic">
          <b>Hispanic:</b>{" "}
          <span className="text-white">{hispanicPercentage.toFixed(1)}%</span>
        </span>
        <br />
        <span className="text-whitestudents">
          <b>White:</b>{" "}
          <span className="text-white">{whitePercentage.toFixed(1)}%</span>
        </span>
        <br />
        <span className="text-other">
          <b>Other:</b>{" "}
          <span className="text-white">{otherPercentage.toFixed(1)}%</span>
        </span>
        <br />
        <div className="w-1/2 justify-center pt-2 mx-auto">
          <AreaPie pieData={pieData} />
        </div>
      </div>
    </div>
  );
}
