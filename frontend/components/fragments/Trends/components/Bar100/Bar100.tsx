import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Skeleton from "@mui/material/Skeleton";

import { legendMargin } from "charts";

import { primaryColor } from "constants/";

import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "@/colors";

import { TrendData } from "interfaces";

import { container } from "../Bar/Bar.module.scss";

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
}

const sortTrendData = (trendData: TrendData, grade: string) =>
  trendData.filter((e) => e.grade === grade).sort((a, b) => a.year - b.year);

const getBarData = (data: TrendData) => {
  const asianData = [];
  const blackData = [];
  const hispanicData = [];
  const whiteData = [];
  const otherData = [];
  const labels = [];

  for (const trend of data) {
    const { asian, black, hispanic, white, other, year } = trend;

    const total = asian + black + hispanic + white + other;

    const asianPercentage = (asian / total) * 100;
    const blackPercentage = (black / total) * 100;
    const hispanicPercentage = (hispanic / total) * 100;
    const whitePercentage = (white / total) * 100;
    const otherPercentage = (other / total) * 100;

    asianData.push(asianPercentage);
    blackData.push(blackPercentage);
    hispanicData.push(hispanicPercentage);
    whiteData.push(whitePercentage);
    otherData.push(otherPercentage);
    labels.push(year);
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

export default function BarChart100({
  trendData,
  grade,
  year,
  isLoading,
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
        position: "top" as any,
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            context.dataset.label +
            ": " +
            parseFloat(context.formattedValue).toFixed(1) +
            "%",
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        stacked: true,
      },
      x: {
        stacked: true,
        ticks: {
          font: {
            weight: (c) => {
              if (c.tick.label === year) {
                return "bold";
              }
            },
          },
          color: (c) => {
            if (c.tick.label === year) {
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
