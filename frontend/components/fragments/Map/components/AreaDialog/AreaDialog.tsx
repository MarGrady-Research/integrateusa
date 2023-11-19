import React, { memo } from "react";

import AreaPie from "../AreaPie";

interface Props {
  clickInfo: any;
  mapData: any[];
}

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

  for (let feature of mapData.features) {
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

  const asianPercentageRaw = (asianTotal / studentsTotal) * 100;
  const blackPercentageRaw = (blackTotal / studentsTotal) * 100;
  const hispanicPercentageRaw = (hispanicTotal / studentsTotal) * 100;
  const whitePercentageRaw = (whiteTotal / studentsTotal) * 100;
  const otherPercentageRaw = (otherTotal / studentsTotal) * 100;

  const schoolsInArea = schoolsTotal.toLocaleString();
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
    areaName,
    schoolsInArea,
    studentsEnrolled,
    asianPercentage,
    blackPercentage,
    hispanicPercentage,
    whitePercentage,
    otherPercentage,
    pieData,
  };
};

const AreaDialog = memo(({ clickInfo, mapData }: Props) => {
  const {
    areaName,
    schoolsInArea,
    studentsEnrolled,
    asianPercentage,
    blackPercentage,
    hispanicPercentage,
    whitePercentage,
    otherPercentage,
    pieData,
  } = getAreaInfo(clickInfo, mapData);

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
          <b>Asian:</b> <span className="text-white">{asianPercentage}%</span>
        </span>
        <br />
        <span className="text-blackstudents">
          <b>Black:</b> <span className="text-white">{blackPercentage}%</span>
        </span>
        <br />
        <span className="text-hispanic">
          <b>Hispanic:</b>{" "}
          <span className="text-white">{hispanicPercentage}%</span>
        </span>
        <br />
        <span className="text-whitestudents">
          <b>White:</b> <span className="text-white">{whitePercentage}%</span>
        </span>
        <br />
        <span className="text-other">
          <b>Other:</b> <span className="text-white">{otherPercentage}%</span>
        </span>
        <br />
        <div className="w-1/2 justify-center pt-2 mx-auto">
          <AreaPie pieData={pieData} />
        </div>
      </div>
    </div>
  );
});

export default AreaDialog;
