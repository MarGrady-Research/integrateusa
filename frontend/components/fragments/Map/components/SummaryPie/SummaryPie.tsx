import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "constants/";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  pieData: number[];
}

const labels = ["Asian", "Black", "Hispanic", "White", "Other Races"];

const options = {
  reponsive: true,
  plugins: {
    tooltip: {
      enabled: true,
      display: true,
      callbacks: {
        label: (context) => {
          const label = context.dataset.data[context.dataIndex];
          return labels[context.dataIndex] + " " + label.toFixed(1) + "%";
        },
      },
    },
    legend: {
      display: false,
    },
  },
};

export default function SummaryPie({ pieData }: Props) {
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

  return <Pie data={data} options={options} />;
}
