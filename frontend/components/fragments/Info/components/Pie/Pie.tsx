import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { legendMargin } from "../../../../../charts";
import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "../../../../../constants";
import { InfoData } from "../../../../../interfaces";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  infoData: InfoData;
}

const getPieData = (infoData: InfoData) => {
  let studentsTotal = 0;
  let asianTotal = 0;
  let blackTotal = 0;
  let hispanicTotal = 0;
  let whiteTotal = 0;
  let otherTotal = 0;

  for (let school of infoData) {
    const { tot_enr, asian, black, hispanic, white, other } = school;

    studentsTotal += tot_enr;
    asianTotal += asian;
    blackTotal += black;
    hispanicTotal += hispanic;
    whiteTotal += white;
    otherTotal += other;
  }

  const asianPercentage = Math.round((asianTotal / studentsTotal) * 100);
  const blackPercentage = Math.round((blackTotal / studentsTotal) * 100);
  const hispanicPercentage = Math.round((hispanicTotal / studentsTotal) * 100);
  const whitePercentage = Math.round((whiteTotal / studentsTotal) * 100);
  const otherPercentage = Math.round((otherTotal / studentsTotal) * 100);

  return [
    asianPercentage,
    blackPercentage,
    hispanicPercentage,
    whitePercentage,
    otherPercentage,
  ];
};

const labels = ["Asian", "Black", "Hispanic", "White", "Other"];

const options = {
  reponsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: true,
      display: true,
      callbacks: {
        label: (context) => {
          const label = context.dataset.data[context.dataIndex];
          return labels[context.dataIndex] + " " + label + "%";
        },
      },
    },
  },
};

export default function PieChart({ infoData }: Props) {
  const pieData = getPieData(infoData);

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

  return <Pie data={data} options={options} plugins={[legendMargin]} />;
}
