import React from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import clsx from "clsx";

import PieChart from "./components/Pie";
import InsetMap from "./components/InsetMap";
import SchoolLevelTable from "./components/SchoolLevelTable";
import { selectId, selectBounds } from "../../../store/selectSlice";

// @ts-ignore
import { container } from "./Info.module.scss";

const BarChart = dynamic(() => import("./components/Bar"), {
  ssr: false,
});

export default function Info({ infoData, title }) {
  /* used this when we were selecting all grades and years -- but too slow */
  /* let filterData = InfoData.filter(e => e.grade === grade & e.year === year) */

  const id = useSelector(selectId);
  const bounds = useSelector(selectBounds);

  let filterData = infoData;

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
        <h1 className="text-4xl font-bold mb-5">{title}</h1>
      )}
      <h2 className="text-2xl mb-4">Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-5 mb-10">
        <div className={clsx("hidden lg:block", container)}>
          <InsetMap id={id} bounds={bounds} />
        </div>
        <div className={clsx(container, "col-span-2")}>
          <SchoolLevelTable schoolLevel={schoolLevel} />
        </div>
        <div className={container}>
          <PieChart filterData={filterData} />
        </div>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl mb-4">Race Breakdown by School</h2>
        <BarChart filterData={filterData} />
      </div>
    </>
  );
}
