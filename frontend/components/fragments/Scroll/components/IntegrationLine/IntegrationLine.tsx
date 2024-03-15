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

import { fullCompData, compDataNormalized, ids } from "./data";

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
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018,
  2019,
  2020,
  2021,
  "",
];

const distAlt = "1500000";

const getLineData = (
  data: {
    year: number;
    dist_id_alt: string;
    dist_name_alt: string;
    norm_exp_wh?: number;
    norm_exp_wh_19?: number;
  }[]
) => {
  const ld = {} as { [key: string]: number[] };

  for (const id of ids) {
    ld[id.dist_id_alt] = [];
  }

  for (const item of data) {
    if (ld[item.dist_id_alt]) {
      if (typeof item.norm_exp_wh !== "undefined") {
        ld[item.dist_id_alt].push(item.norm_exp_wh);
      } else if (typeof item.norm_exp_wh_19 !== "undefined") {
        ld[item.dist_id_alt].push(item.norm_exp_wh_19);
      }
    }
  }

  return ld;
};

const compData = getLineData(fullCompData);
const normalizedCompData = getLineData(compDataNormalized);

const compDataDistrict = compData[distAlt];
const compDataDistrictPreIntegration = compDataDistrict.slice(0, -2);

const compDataDistrictObj = {
  [distAlt]: compDataDistrict,
};
const compDataDistrictPreIntegrationObj = {
  [distAlt]: compDataDistrictPreIntegration,
};

const getLines = (data: { [key: string]: number[] }, lineWidth = 1) =>
  ids.map((id) => ({
    label: id.dist_name_alt,
    data: data[id.dist_id_alt] || [],
    borderColor:
      id.dist_id_alt === distAlt ? selectedLineColor : unselectedLineColor,
    borderWidth: lineWidth,
    backgroundColor:
      id.dist_id_alt === distAlt ? selectedLineColor : unselectedLineColor,
    order: id.dist_id_alt === distAlt ? 0 : 1,
  }));

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
      lineData = getLines(compDataDistrictPreIntegrationObj, lineWidth);
      break;
    case IntegrationLineStep.StepTwo:
      lineData = getLines(compDataDistrictObj, lineWidth);
      break;
    case IntegrationLineStep.StepThree:
      lineData = getLines(compData, lineWidth);
      break;
    case IntegrationLineStep.StepFour:
      lineData = getLines(normalizedCompData, lineWidth);
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
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        position: "right" as "right",
        min: isOnFourthStep ? -0.2 : 0,
        max: isOnFourthStep ? 0.2 : 0.5,
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
        xMin: 9,
        xMax: 9,
        yMin: isOnFourthStep ? -0.2 : 0,
        yMax: isOnFirstStep ? 0 : isOnFourthStep ? 0.12 : 0.4,
        borderColor: "#000",
        borderDash: [3, 4],
        borderCapStyle: "round",
        borderWidth: 2,
      },
      label1: {
        type: "label",
        xValue: 9,
        yValue: isOnFourthStep ? 0.15 : 0.4375,
        content: isOnFirstStep ? [] : ["Integration Plan", "Implemented"],
        font: {
          size: 12,
        },
      },
    },
  };

  return <Line options={options} data={data} />;
}
