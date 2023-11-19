import React, { memo } from "react";

import MapPie from "../MapPies";

interface Props {
  clickInfo: any;
}

const getSchoolInfo = (clickInfo) => {
  const {
    dist_name,
    county_name,
    year,
    tot_enr,
    as,
    bl,
    hi,
    wh,
    or,
    sch_name,
  } = clickInfo.feature.properties;

  const districtName = dist_name;
  const countyName = county_name;
  const enrollmentYear = year;
  const schoolName = sch_name;

  const studentsTotal = tot_enr;
  const asianTotal = as;
  const blackTotal = bl;
  const hispanicTotal = hi;
  const whiteTotal = wh;
  const otherTotal = or;

  const asianRatio = asianTotal / studentsTotal;
  const blackRatio = blackTotal / studentsTotal;
  const hispanicRatio = hispanicTotal / studentsTotal;
  const whiteRatio = whiteTotal / studentsTotal;
  const otherRatio = otherTotal / studentsTotal;

  const studentsEnrolled = studentsTotal.toLocaleString();
  const asianPercentage = (asianRatio * 100).toFixed(1);
  const blackPercentage = (blackRatio * 100).toFixed(1);
  const hispanicPercentage = (hispanicRatio * 100).toFixed(1);
  const whitePercentage = (whiteRatio * 100).toFixed(1);
  const otherPercentage = (otherRatio * 100).toFixed(1);

  const pieData = [
    asianRatio,
    blackRatio,
    hispanicRatio,
    whiteRatio,
    otherRatio,
  ];

  return {
    schoolName,
    districtName,
    countyName,
    enrollmentYear,
    studentsEnrolled,
    asianPercentage,
    blackPercentage,
    hispanicPercentage,
    whitePercentage,
    otherPercentage,
    pieData,
  };
};

const SchoolDialog = memo(({ clickInfo }: Props) => {
  const {
    schoolName,
    districtName,
    countyName,
    enrollmentYear,
    studentsEnrolled,
    asianPercentage,
    blackPercentage,
    hispanicPercentage,
    whitePercentage,
    otherPercentage,
    pieData,
  } = getSchoolInfo(clickInfo);

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
        <span className="overflow-ellipsis">
          <b>{schoolName}</b>
        </span>
        <br />
        <span>
          <b>District: </b>
          {districtName}
        </span>
        <br />
        <span>
          <b>County: </b>
          {countyName}
        </span>
        <br />
        <span>
          <b>{enrollmentYear} Enrollment: </b> {studentsEnrolled}
        </span>
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
          <MapPie pieData={pieData} />
        </div>
      </div>
    </div>
  );
});

export default SchoolDialog;
