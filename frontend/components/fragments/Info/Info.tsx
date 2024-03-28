import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import RotateRightRoundedIcon from "@mui/icons-material/RotateRightRounded";
import clsx from "clsx";

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
  selectYear,
  selectGrade,
  selectSelectedName,
} from "store/selectSlice";
import { selectRehydrated } from "store/hydrateSlice";

import { Level, School, SchoolInfo } from "interfaces";

import { exportRaceBreakdown } from "excel";

import { container, tableContainer } from "./Info.module.scss";

interface Props {
  title: string;
  infoData: School[];
  isInfoDataLoading: boolean;
  hasInfoDataFailed: boolean;
  schoolInfo: SchoolInfo[];
  isSchoolInfoLoading: boolean;
  hasSchoolInfoFailed: boolean;
  setSnackbarOpen: (open: boolean) => void;
}

export default function Info({
  title,
  infoData,
  isInfoDataLoading,
  hasInfoDataFailed,
  schoolInfo,
  isSchoolInfoLoading,
  hasSchoolInfoFailed,
  setSnackbarOpen,
}: Props) {
  const id = useSelector(selectId);
  const bounds = useSelector(selectBounds);
  const coordinates = useSelector(selectSchoolCoordinates);
  const level = useSelector(selectLevel);
  const year = useSelector(selectYear);
  const grade = useSelector(selectGrade);
  const selectedName = useSelector(selectSelectedName);

  const isSchool = level === Level.School;

  const [downloadingRaceBreakdown, setDownloadingRaceBreakdown] =
    useState(false);

  const downloadRaceBreakdown = async () => {
    setDownloadingRaceBreakdown(true);

    const downloaded = await exportRaceBreakdown(
      infoData,
      year,
      grade,
      level,
      selectedName
    );

    setDownloadingRaceBreakdown(false);

    if (!downloaded) {
      setSnackbarOpen(true);
    }
  };

  const rehydrated = useSelector(selectRehydrated);

  return (
    <>
      <h1 className="text-3xl lg:text-4xl font-semibold mb-5">
        {rehydrated ? title : <Skeleton width={150} />}
      </h1>
      <h2 className="text-2xl font-medium mb-4">Overview</h2>
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
          {!rehydrated ? (
            <Skeleton variant="rectangular" className="h-full" />
          ) : isSchool ? (
            <SchoolInfoComponent
              infoData={infoData}
              isInfoDataLoading={isInfoDataLoading}
              schoolInfo={schoolInfo}
              isSchoolInfoLoading={isSchoolInfoLoading}
              hasSchoolInfoFailed={hasSchoolInfoFailed}
            />
          ) : (
            <SchoolLevelTable
              infoData={infoData}
              isLoading={isInfoDataLoading}
              hasFailed={hasInfoDataFailed}
            />
          )}
        </div>
        <div className={container}>
          <PieChart
            infoData={infoData}
            isLoading={isInfoDataLoading}
            hasFailed={hasInfoDataFailed}
          />
        </div>
      </div>
      {rehydrated && !isSchool && (
        <div className="mb-10">
          <div className="mb-4 flex items-center">
            <h2 className="text-2xl font-medium mr-2">
              Race Breakdown by School
            </h2>
            {!isInfoDataLoading && (
              <IconButton
                size="small"
                aria-label="Download Race Breakdown by School data"
                onClick={downloadRaceBreakdown}
              >
                {downloadingRaceBreakdown ? (
                  <RotateRightRoundedIcon
                    fontSize="inherit"
                    className="animate-spin"
                  />
                ) : (
                  <DownloadRoundedIcon fontSize="inherit" />
                )}
              </IconButton>
            )}
          </div>
          <BarChart
            infoData={infoData}
            isLoading={isInfoDataLoading}
            hasFailed={hasInfoDataFailed}
          />
        </div>
      )}
    </>
  );
}
