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

import { InfoData } from "../../../interfaces";

const BarChart = dynamic(() => import("./components/Bar"), {
  ssr: false,
});

interface Props {
  title: string;
  infoData: InfoData;
}

export default function Info({ infoData, title }: Props) {
  const id = useSelector(selectId);
  const bounds = useSelector(selectBounds);

  const showTitle = infoData.length > 0 && !!title;

  return (
    <>
      {showTitle && <h1 className="text-4xl font-bold mb-5">{title}</h1>}
      <h2 className="text-2xl mb-4">Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-5 mb-10">
        <div className={clsx("hidden lg:block", container)}>
          <InsetMap id={id} bounds={bounds} />
        </div>
        <div className={clsx(container, "col-span-2")}>
          <SchoolLevelTable infoData={infoData} />
        </div>
        <div className={container}>
          <PieChart infoData={infoData} />
        </div>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl mb-4">Race Breakdown by School</h2>
        <BarChart filterData={infoData} />
      </div>
    </>
  );
}
