import React from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import Skeleton from "@mui/material/Skeleton";

import BarChart from "./components/Bar";
import PieChart from "./components/Pie";
import InsetMap from "./components/InsetMap";
import SchoolLevelTable from "./components/SchoolLevelTable";
import SchoolInfo from "./components/SchoolInfo";

import {
  selectId,
  selectBounds,
  selectLevel,
  selectSchoolCoordinates,
} from "../../../store/selectSlice";
import { Level } from "../../../interfaces";

// @ts-ignore
import { container, tableContainer } from "./Info.module.scss";

import { InfoData } from "../../../interfaces";

interface Props {
  title: string;
  infoData: InfoData;
  isLoading: boolean;
}

export default function Info({ infoData, title, isLoading }: Props) {
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
          {isLoading ? (
            <Skeleton variant="rectangular" className="!h-full w-full" />
          ) : isSchool ? (
            <SchoolInfo infoData={infoData} />
          ) : (
            <SchoolLevelTable infoData={infoData} />
          )}
        </div>
        <div className={container}>
          {<PieChart infoData={infoData} isLoading={isLoading} />}
        </div>
      </div>
      {!isSchool && (
        <div className="mb-10">
          <h2 className="text-2xl mb-4">Race Breakdown by School</h2>
          <BarChart infoData={infoData} isLoading={isLoading} />
        </div>
      )}
    </>
  );
}
