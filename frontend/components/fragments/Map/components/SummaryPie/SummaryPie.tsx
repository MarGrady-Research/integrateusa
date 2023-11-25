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

export default function SummaryPie({ pieData }) {
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

  const options = {
    reponsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        display: true,
        callbacks: {
          label: function (context) {
            let label = context.dataset.data[context.dataIndex];
            return (
              data.labels[context.dataIndex] + " " + label.toFixed(1) + "%"
            );
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return <Pie data={data} options={options} />;
}
