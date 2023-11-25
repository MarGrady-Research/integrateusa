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
import annotationPlugin from "chartjs-plugin-annotation";

import { selectedLineColor } from "../../../../../../constants";

import { lineLabels as labels } from "./commonData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  annotationPlugin
);

export default function ScrollerLine2({ d15ExposureWhite }) {
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
    annotations: {
      line1: {
        type: "line",
        xMin: 9,
        xMax: 9,
        yMax: 0.42,
        borderColor: "#000",
        borderDash: [3, 4],
        borderCapStyle: "round",
        borderWidth: 2,
      },
      label1: {
        type: "label",
        xValue: 9,
        yValue: 0.45,
        content: ["Integration Plan", "Implemented"],
        font: {
          size: 12,
        },
      },
    },
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
