import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Tick,
} from "chart.js";
import clsx from "clsx";
import { Bar } from "react-chartjs-2";
import Skeleton from "@mui/material/Skeleton";
import ErrorIcon from "@mui/icons-material/Error";

import { legendMargin } from "charts";

import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "@/colors";

import { TrendData } from "interfaces";

import { container } from "./Bar.module.scss";
import { primaryColor } from "constants/";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  trendData: TrendData;
  grade: string;
  year: number;
  isLoading: boolean;
  hasFailed: boolean;
}

const sortTrendData = (trendData: TrendData, grade: string) =>
  trendData.filter((e) => e.grade === grade).sort((a, b) => a.year - b.year);

const getBarData = (data: TrendData) => {
  const asianData: number[] = [];
  const blackData: number[] = [];
  const hispanicData: number[] = [];
  const whiteData: number[] = [];
  const otherData: number[] = [];
  const labels: string[] = [];

  for (const trend of data) {
    const { asian, black, hispanic, white, other, year } = trend;

    asianData.push(asian);
    blackData.push(black);
    hispanicData.push(hispanic);
    whiteData.push(white);
    otherData.push(other);
    labels.push(year.toString());
  }

  return {
    asianData,
    blackData,
    hispanicData,
    whiteData,
    otherData,
    labels,
  };
};

export default function BarChart({
  trendData,
  grade,
  year,
  isLoading,
  hasFailed,
}: Props) {
  const sortedData = useMemo(
    () => sortTrendData(trendData, grade),
    [trendData, grade]
  );

  const { asianData, blackData, hispanicData, whiteData, otherData, labels } =
    useMemo(() => getBarData(sortedData), [sortedData]);

  if (isLoading) {
    return <Skeleton variant="rectangular" className={container} />;
  }

  if (hasFailed) {
    return (
      <div
        className={clsx(
          "flex flex-col items-center justify-center shadow border border-gray-200",
          container
        )}
      >
        <ErrorIcon color="error" fontSize="medium" className="mb-1" />
        Error loading data
      </div>
    );
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Asian",
        data: asianData,
        backgroundColor: asianColor,
      },
      {
        label: "Black",
        data: blackData,
        backgroundColor: blackColor,
      },
      {
        label: "Hispanic",
        data: hispanicData,
        backgroundColor: hispanicColor,
      },
      {
        label: "White",
        data: whiteData,
        backgroundColor: whiteColor,
      },
      {
        label: "Other",
        data: otherData,
        backgroundColor: otherColor,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as "top",
      },
    },
    scales: {
      y: {
        min: 0,
        stacked: true,
        ticks: {
          callback: (val: string) => {
            return "   " + val.toLocaleString();
          },
        },
      },
      x: {
        stacked: true,
        ticks: {
          font: {
            weight: (c: { tick: Tick }) => {
              if (c.tick.label === year.toString()) {
                return "bold";
              }
            },
          },
          color: (c: { tick: Tick }) => {
            if (c.tick.label === year.toString()) {
              return primaryColor;
            }
          },
        },
      },
    },
  };

  return (
    <div className={container}>
      <Bar options={options} data={data} plugins={[legendMargin]} />
    </div>
  );
}
