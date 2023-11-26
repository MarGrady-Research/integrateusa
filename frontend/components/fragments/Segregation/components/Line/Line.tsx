import React from "react";
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

import { yearsData } from "../../../Selection/data";
import { legendMargin } from "../../../../../charts";
import {
  primaryColor,
  selectedLineColor,
  unselectedLineColor,
} from "../../../../../constants";
import { LineData } from "../../../../../interfaces";

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

export default function LineGraph({ linesData, id, year }: Props) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top" as "top",
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

  const lineData = linesData.map((e) => ({
    label: e.name,
    data: e.data.map((e) => e.seg),
    borderColor: e.id === id ? selectedLineColor : unselectedLineColor,
    backgroundColor: e.id === id ? selectedLineColor : unselectedLineColor,
  }));

  const data = {
    labels,
    datasets: lineData,
  };

  return <Line options={options} data={data} plugins={[legendMargin]} />;
}
