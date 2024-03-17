import React, { useState } from "react";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import RotateRightRoundedIcon from "@mui/icons-material/RotateRightRounded";

import BarChart from "./components/Bar";
import BarChart100 from "./components/Bar100";
import TableYearGrade from "./components/TableYearGrade";

import { selectGrade, selectYear } from "store/selectSlice";

import { TrendData } from "interfaces";

import { exportTrendsByRace } from "excel";

interface Props {
  trendData: TrendData;
  isLoading: boolean;
  hasFailed: boolean;
  setSnackbarOpen: (open: boolean) => void;
}

export default function Trends({
  trendData,
  isLoading,
  hasFailed,
  setSnackbarOpen,
}: Props) {
  const grade = useSelector(selectGrade);
  const year = useSelector(selectYear);

  const [downloadingTrendsByRace, setDownloadingTrendsByRace] = useState(false);

  const downloadTrendsByRace = async () => {
    setDownloadingTrendsByRace(true);

    const downloaded = await exportTrendsByRace();

    setDownloadingTrendsByRace(false);

    if (!downloaded) {
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center">
        <h2 className="text-2xl font-medium mr-2">Enrollment Trends by Race</h2>
        {!isLoading && (
          <IconButton
            size="small"
            aria-label="Download Enrollment Trends by Race data"
            onClick={downloadTrendsByRace}
          >
            {downloadingTrendsByRace ? (
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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-5 mb-10">
        <div>
          <div className="lg:w-5/6 xl:w-full mx-auto">
            <BarChart
              trendData={trendData}
              grade={grade}
              year={year}
              isLoading={isLoading}
              hasFailed={hasFailed}
            />
          </div>
        </div>
        <div>
          <div className="lg:w-5/6 xl:w-full mx-auto">
            <BarChart100
              trendData={trendData}
              grade={grade}
              year={year}
              isLoading={isLoading}
              hasFailed={hasFailed}
            />
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-medium mb-4">Enrollment Trends by Grade</h2>
      <TableYearGrade
        trendData={trendData}
        selectedGrade={grade}
        selectedYear={year}
        isLoading={isLoading}
        hasFailed={hasFailed}
      />
    </>
  );
}
