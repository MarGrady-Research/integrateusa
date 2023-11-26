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

import {
  selectedLineColor,
  unselectedLineColor,
} from "../../../../../../../constants";

import { fullCompData } from "../data";
import { lineLabels as labels, ids, distAlt } from "../commonData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  annotationPlugin
);

const getLineData = (data) => {
  const lineData = {};

  for (const id of ids) {
    lineData[id.dist_id_alt] = [];
  }

  for (const item of data) {
    if (lineData[item.dist_id_alt]) {
      lineData[item.dist_id_alt].push(item.norm_exp_wh);
    }
  }

  return lineData;
};

const lineData = getLineData(fullCompData);

const lines = () =>
  ids.map((id) => ({
    label: id.dist_name_alt,
    data: lineData[id.dist_id_alt],
    borderColor:
      id.dist_id_alt === distAlt ? selectedLineColor : unselectedLineColor,
    backgroundColor:
      id.dist_id_alt === distAlt ? selectedLineColor : unselectedLineColor,
  }));
const options = {
  responsive: true,
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
      borderColor: "#000000",
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
  datasets: lines(),
};

export default function ScrollerLine3() {
  return <Line options={options} data={data} />;
}
