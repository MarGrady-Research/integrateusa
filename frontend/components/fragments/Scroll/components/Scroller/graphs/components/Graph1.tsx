import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "../../../../../../../constants";
import { rawData } from "../data";

ChartJS.register(ArcElement, Tooltip, Legend);

const groups = ["asian", "black", "hispanic", "white", "other"];

const { asian, black, hispanic, other, white } = rawData;

const enrTotal = asian + black + hispanic + other + white;

const pieData = groups.map((g) => Math.round((rawData[g] / enrTotal) * 100));

const options = {
  reponsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      display: true,
      callbacks: {
        label: (context) => {
          let label = context.dataset.data[context.dataIndex];
          return data.labels[context.dataIndex] + " " + label + "%";
        },
      },
    },
  },
};

const data = {
  labels: ["Asian", "Black", "Hispanic", "White", "Other"],
  datasets: [
    {
      label: "Enrollment Share by Race",
      data: pieData,
      borderColor: [
        asianColor,
        blackColor,
        hispanicColor,
        whiteColor,
        otherColor,
      ],
      borderWidth: 1,
      backgroundColor: [
        asianColor,
        blackColor,
        hispanicColor,
        whiteColor,
        otherColor,
      ],
    },
  ],
};

export default function ScrollerPie() {
  return <Pie data={data} options={options} />;
}
