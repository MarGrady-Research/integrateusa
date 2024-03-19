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

import { selectedLineColor, unselectedLineColor } from "constants/";

import { compData } from "./data";

interface Props {
  step: IntegrationLineStep;
  onTablet: boolean;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export enum IntegrationLineStep {
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
}

const labels = [
  "2016-17",
  "2017-18",
  "2018-19",
  "2019-20",
  "2020-21",
  "2021-22",
  "2022-23",
  "",
];

const distName = "NYC Geographic District #15 (NY)";

const compDataNormalized = compData.map((d) => ({
  dist_name: d.dist_name,
  data: d.norm_data,
}));

const compDataDistrict = compData.filter((d) => d.dist_name === distName);

const compDataDistrictPreIntegration = compDataDistrict.map((d) => ({
  dist_name: d.dist_name,
  data: d.data.slice(0, -2),
}));

const getLines = (
  districtsData: { dist_name: string; data: number[] }[],
  lineWidth = 1
) =>
  districtsData.map((d) => {
    const isSelectedDistrict = d.dist_name === distName;

    return {
      label: d.dist_name,
      data: d.data,
      borderColor: isSelectedDistrict ? selectedLineColor : unselectedLineColor,
      borderWidth: lineWidth,
      backgroundColor: isSelectedDistrict
        ? selectedLineColor
        : unselectedLineColor,
      order: isSelectedDistrict ? 0 : 1,
    };
  });

export default function IntegrationLine({ step, onTablet }: Props) {
  const isOnFirstStep = step === IntegrationLineStep.StepOne;
  const isOnFourthStep = step === IntegrationLineStep.StepFour;

  const lineWidth = onTablet ? 1 : 2;

  let lineData: {
    label: string;
    data: number[];
    borderColor: string;
    borderWidth: number;
    backgroundColor: string;
    order: number;
  }[] = [];

  switch (step) {
    case IntegrationLineStep.StepOne:
      lineData = getLines(compDataDistrictPreIntegration, lineWidth);
      break;
    case IntegrationLineStep.StepTwo:
      lineData = getLines(compDataDistrict, lineWidth);
      break;
    case IntegrationLineStep.StepThree:
      lineData = getLines(compData, lineWidth);
      break;
    case IntegrationLineStep.StepFour:
      lineData = getLines(compDataNormalized, lineWidth);
      break;
  }

  const data = {
    labels,
    datasets: lineData,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: () => "",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        position: "right" as "right",
        min: isOnFourthStep ? -12 : 0,
        max: isOnFourthStep ? 6 : 25,
        grid: {
          display: false,
        },
        ticks: {
          callback: (value: number) => {
            const prepend = value >= 0 ? "  " : "";

            return prepend + value.toFixed(2);
          },
        },
      },
    },
    annotations: {
      line1: {
        type: "line",
        xMin: 4,
        xMax: 4,
        yMin: isOnFourthStep ? -12 : 0,
        yMax: isOnFirstStep ? 0 : isOnFourthStep ? 3 : 23,
        borderColor: "#000",
        borderDash: [3, 4],
        borderCapStyle: "round",
        borderWidth: 2,
      },
      label1: {
        type: "label",
        xValue: 4,
        yValue: isOnFourthStep ? 4 : 24,
        content: isOnFirstStep ? [] : ["Integration Plan", "Implemented"],
        font: {
          size: 12,
        },
      },
    },
  };

  return <Line options={options} data={data} />;
}
