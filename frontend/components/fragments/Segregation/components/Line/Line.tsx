import React, { memo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorIcon from "@mui/icons-material/Error";
import clsx from "clsx";

import { yearsData } from "../../../Selection/data";
import { legendMargin } from "../../../../../charts";
import {
  primaryColor,
  selectedLineColor,
  unselectedLineColor,
} from "../../../../../constants";
import { LineData, LineDataLoaded } from "../../../../../interfaces";

// @ts-ignore
import { container } from "./Line.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  linesData: LineData[];
  id: string;
  year: number;
}

const labels = yearsData
  .map((e) => e.value)
  .sort((a, b) => {
    return a - b;
  });

const LineGraph = memo(({ linesData, id, year }: Props) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        position: "right" as "right",
        min: 0,
        max: 100,
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

  const lineData = linesData
    .filter((l) => l.status === "loaded")
    .map((l: LineDataLoaded) => ({
      label: l.name,
      data: l.data.map((li) => li.seg),
      borderColor: l.id === id ? selectedLineColor : unselectedLineColor,
      backgroundColor: l.id === id ? selectedLineColor : unselectedLineColor,
    }));

  const data = {
    labels,
    datasets: lineData,
  };

  const legend = (
    <div className="flex flex-wrap justify-center text-sm">
      {linesData.map((l) => {
        const isLoading = l.status === "loading";
        const hasFailed = l.status === "failed";

        const bgColor =
          isLoading || hasFailed
            ? "transparent"
            : l.id === id
            ? selectedLineColor
            : unselectedLineColor;

        return (
          <div key={l.id} className="flex items-center mr-2 last:mr-0">
            <div
              className="w-10 h-3 mr-2 flex items-center justify-center"
              style={{
                backgroundColor: bgColor,
              }}
            >
              {isLoading && <CircularProgress color="inherit" size={14} />}
              {hasFailed && <ErrorIcon color="error" fontSize="medium" />}
            </div>
            {l.name}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={clsx(container, "mb-2")}>
      {legend}
      <Line options={options} data={data} plugins={[legendMargin]} />
    </div>
  );
});

export default LineGraph;
