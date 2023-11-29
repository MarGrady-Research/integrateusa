import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "../../../../../constants";

ChartJS.register(ArcElement, Tooltip, Legend);

const labels = ["Asian", "Black", "Hispanic", "White", "Other"];
const pieData = [13, 13, 41, 30, 4];

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
  labels,
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

export default function DistrictPie() {
  return (
    <div className="p-0 md:p-20">
      <Pie data={data} options={options} />
    </div>
  );
}
