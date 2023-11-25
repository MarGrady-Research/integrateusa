import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  CategoryScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "../../../../../../constants";

ChartJS.register(
  LinearScale,
  BarElement,
  CategoryScale,
  Tooltip,
  annotationPlugin
);

const labels = [
  "Demographics of Avg White Student's School",
  "Demograpics of Avg Non-White Student's school",
];

const getBarData = (exposureData) => {
  const asianData = [];
  const blackData = [];
  const hispanicData = [];
  const whiteData = [];
  const otherData = [];

  for (let e of exposureData) {
    const { white, asian, black, hispanic, other } = e;

    asianData.push(asian);
    blackData.push(black);
    hispanicData.push(hispanic);
    whiteData.push(white);
    otherData.push(other);
  }

  return {
    asianData,
    blackData,
    hispanicData,
    whiteData,
    otherData,
  };
};

export default function ScrollerBar2({ exposureData }) {
  const { asianData, blackData, hispanicData, whiteData, otherData } =
    getBarData(exposureData);

  const barData = [
    {
      label: "White",
      id: "prop_wh",
      data: whiteData,
      backgroundColor: whiteColor,
    },
    {
      label: "Asian",
      id: "prop_as",
      data: asianData,
      backgroundColor: asianColor,
    },
    {
      label: "Black",
      id: "prop_bl",
      data: blackData,
      backgroundColor: blackColor,
    },
    {
      label: "Hispanic",
      id: "prop_hi",
      data: hispanicData,
      backgroundColor: hispanicColor,
    },
    {
      label: "Other",
      id: "prop_or",
      data: otherData,
      backgroundColor: otherColor,
    },
  ];

  const data = {
    labels: labels,
    datasets: barData,
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        display: true,
        callbacks: {
          label: (context) => {
            const label = context.dataset.data[context.dataIndex];
            return context.dataset.label + " " + label + "%";
          },
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        display: true,
        stacked: true,
        barPercentage: 1,
      },
      y: {
        stacked: true,
        max: 100,
        grid: {
          display: false,
        },
        position: "right",
      },
    } as any,
  };

  return <Bar data={data} options={options} />;
}
