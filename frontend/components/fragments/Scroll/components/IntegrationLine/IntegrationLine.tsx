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

import {
  selectedLineColor,
  unselectedLineColor,
} from "../../../../../constants";

import { fullCompData, compDataNormalized, ids } from "./data";

interface Props {
  step: IntegrationLineStep;
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

const getLineData = (data) => {
  const ld = {};

  for (const id of ids) {
    ld[id.dist_id_alt] = [];
  }

  for (const item of data) {
    if (ld[item.dist_id_alt]) {
      if (item.hasOwnProperty("norm_exp_wh")) {
        ld[item.dist_id_alt].push(item.norm_exp_wh);
      } else if (item.hasOwnProperty("norm_exp_wh_19")) {
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

const getLines = (data) =>
  ids.map((id) => ({
    label: id.dist_name_alt,
    data: data[id.dist_id_alt] || [],
    borderColor:
      id.dist_id_alt === distAlt ? selectedLineColor : unselectedLineColor,
    backgroundColor:
      id.dist_id_alt === distAlt ? selectedLineColor : unselectedLineColor,
    order: id.dist_id_alt === distAlt ? 0 : 1,
  }));

export default function IntegrationLine({ step }: Props) {
  const isOnFirstStep = step === IntegrationLineStep.StepOne;
  const isOnFourthStep = step === IntegrationLineStep.StepFour;

  let lineData = [];

  switch (step) {
    case IntegrationLineStep.StepOne:
      lineData = getLines(compDataDistrictPreIntegrationObj);
      break;
    case IntegrationLineStep.StepTwo:
      lineData = getLines(compDataDistrictObj);
      break;
    case IntegrationLineStep.StepThree:
      lineData = getLines(compData);
      break;
    case IntegrationLineStep.StepFour:
      lineData = getLines(normalizedCompData);
      break;
  }

  const data = {
    labels,
    datasets: lineData,
  };

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
        min: isOnFourthStep ? -0.2 : 0,
        max: isOnFourthStep ? 0.2 : 0.5,
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
        yMin: isOnFourthStep ? -0.2 : 0,
        yMax: isOnFirstStep ? 0 : isOnFourthStep ? 0.12 : 0.42,
        borderColor: "#000",
        borderDash: [3, 4],
        borderCapStyle: "round",
        borderWidth: 2,
      },
      label1: {
        type: "label",
        xValue: 9,
        yValue: isOnFourthStep ? 0.15 : 0.45,
        content: isOnFirstStep ? [] : ["Integration Plan", "Implemented"],
        font: {
          size: 12,
        },
      },
    },
  };

  return <Line options={options} data={data} />;
}
