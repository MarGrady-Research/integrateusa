import React from "react";
import PieChart from "./components/Pie";
import InsetMap from "./components/InsetMap";
import dynamic from "next/dynamic";
import SchoolLevelTable from "./components/SchoolLevelTable";

const BarChart = dynamic(() => import("./components/Bar"), {
  ssr: false,
});

export default function Info({ InfoData, title, id, bounds }) {
  /* used this when we were selecting all grades and years -- but too slow */
  /* let filterData = InfoData.filter(e => e.grade === grade & e.year === year) */

  let filterData = InfoData;

  const schoolLevel = {
    ES: filterData.filter((e) => e.level === "ES"),
    ESMS: filterData.filter((e) => e.level === "ESMS"),
    MS: filterData.filter((e) => e.level === "MS"),
    MSHS: filterData.filter((e) => e.level === "MSHS"),
    HS: filterData.filter((e) => e.level === "HS"),
    K12: filterData.filter((e) => e.level === "K12"),
    Other: filterData.filter((e) => e.level === "Other"),
    Total: {
      all_schools: filterData.length,
      all_students: filterData.map((e) => e.tot_enr).reduce((a, b) => a + b, 0),
    },
  };

  return (
    <>
      {filterData.length > 0 && title && (
        <div className="flex flex-row mx-auto">
          <span className="text-4xl">
            <b>{title}</b>
          </span>
        </div>
      )}
      <div className="flex flex-row mt-auto">
        <span className="text-2xl pt-4 pb-2">Overview</span>
      </div>
      <div className="container relative flex flex-wrap justify-between pb-5">
        <div className="w-1/3 h-300">
          <InsetMap id={id} bounds={bounds} />
        </div>
        <div className="w-1/3 h-full">
          <SchoolLevelTable schoolLevel={schoolLevel} />
        </div>
        <div className="w-1/4 h-full">
          <PieChart filterData={filterData} />
        </div>
      </div>
      <div className="pb-5">
        <div className="flex flex-row mx-auto">
          <span className="text-2xl pb-2">Race Breakdown by School</span>
        </div>
        <div className="h-100 w-100 overflow-auto">
          <BarChart
            filterData={filterData}
            className="py-4 left-0 top-0 absolute"
          />
        </div>
      </div>
    </>
  );
}
