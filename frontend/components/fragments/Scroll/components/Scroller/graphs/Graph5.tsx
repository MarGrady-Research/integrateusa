import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { selectedLineColor } from "../../../../../../constants";

import { lineLabels as labels } from "./commonData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export default function ScrollerLine({ d15ExposureWhite }) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        position: "right",
        min: 0,
        max: 0.5,
        grid: {
          display: false,
        },
      },
    } as any,
  };

  const data = {
    labels,
    datasets: [
      {
        label: "District 15",
        data: d15ExposureWhite,
        borderColor: selectedLineColor,
        backgroundColor: selectedLineColor,
      },
    ],
  };

  return <Line options={options} data={data} />;
}
