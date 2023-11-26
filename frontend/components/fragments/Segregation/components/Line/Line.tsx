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
  unselectedAreaColor,
  unselectedLineColor,
} from "../../../../../constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineGraph({ linesData, id, year }) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top" as any,
      },
    },
    scales: {
      y: {
        position: "right" as any,
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

  const labels = yearsData
    .map((e) => e.value)
    .sort((a, b) => {
      return a - b;
    });

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
