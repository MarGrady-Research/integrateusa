import React from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import clsx from "clsx";
import Skeleton from "@mui/material/Skeleton";

import PieChart from "./components/Pie";
import InsetMap from "./components/InsetMap";
import SchoolLevelTable from "./components/SchoolLevelTable";
import SchoolInfoComponent from "./components/SchoolInfo";

const BarChart = dynamic(() => import("./components/Bar"), {
  ssr: false,
});

import {
  selectId,
  selectBounds,
  selectLevel,
  selectSchoolCoordinates,
} from "store/selectSlice";
import { Level, InfoData, SchoolInfo } from "interfaces";

import { container, tableContainer } from "./Info.module.scss";

interface Props {
  title: string;
  infoData: InfoData;
  isInfoDataLoading: boolean;
  schoolInfo: SchoolInfo[];
  isSchoolInfoLoading: boolean;
}

export default function Info({
  infoData,
  title,
  isInfoDataLoading,
  schoolInfo,
  isSchoolInfoLoading,
}: Props) {
  const id = useSelector(selectId);
  const bounds = useSelector(selectBounds);
  const coordinates = useSelector(selectSchoolCoordinates);
  const level = useSelector(selectLevel);

  const isSchool = level === Level.School;

  return (
    <>
      <h1 className="text-4xl font-bold mb-5">{title}</h1>
      <h2 className="text-2xl mb-4">Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-10 lg:gap-5 mb-10">
        <div className={clsx("hidden lg:block", container)}>
          <InsetMap
            id={id}
            bounds={bounds}
            level={level}
            coordinates={coordinates}
          />
        </div>
        <div className={clsx(tableContainer, "col-span-2")}>
          {isSchool ? (
            <SchoolInfoComponent
              infoData={infoData}
              isInfoDataLoading={isInfoDataLoading}
              schoolInfo={schoolInfo}
              isSchoolInfoLoading={isSchoolInfoLoading}
            />
          ) : isInfoDataLoading ? (
            <Skeleton variant="rectangular" className="!h-full w-full" />
          ) : (
            <SchoolLevelTable infoData={infoData} />
          )}
        </div>
        <div className={container}>
          {<PieChart infoData={infoData} isLoading={isInfoDataLoading} />}
        </div>
      </div>
      {!isSchool && (
        <div className="mb-10">
          <h2 className="text-2xl mb-4">Race Breakdown by School</h2>
          <BarChart infoData={infoData} isLoading={isInfoDataLoading} />
        </div>
      )}
    </>
  );
}
