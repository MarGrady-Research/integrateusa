import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  CategoryScale,
  Tooltip,
  TooltipItem,
  CartesianScaleTypeRegistry,
  ScaleOptionsByType,
} from "chart.js";
import { _DeepPartialObject } from "chart.js/types/utils";
import { Bar } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "@/colors";

interface Props {
  step: ExposureBarStep;
  onTablet: boolean;
}

ChartJS.register(
  LinearScale,
  BarElement,
  CategoryScale,
  Tooltip,
  annotationPlugin
);

export enum ExposureBarStep {
  StepOne,
  StepTwo,
}

const labels = [
  "Demographics of Avg White Student's School",
  "Demograpics of Avg Non-White Student's school",
];

const mobileLabels = [
  ["Demographics of", "Avg White Student's", "School"],
  ["Demographics of", "Avg Non-White Student's", "School"],
];

const asianData = [8.99, 8.79];
const blackData = [14.85, 17.11];
const hispanicData = [28.86, 46.64];
const whiteData = [41.99, 24.08];
const otherData = [5.3, 3.38];

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

export default function ExposureBar({ step, onTablet }: Props) {
  const isOnFirstStep = step === ExposureBarStep.StepOne;

  const barDataFiltered = isOnFirstStep
    ? barData
    : barData.map((d) => {
        if (d.label != "White") {
          return {
            ...d,
            data: [0, 0],
          };
        }

        return d;
      });

  const data = {
    labels,
    datasets: barDataFiltered,
  };

  const chartLabels = onTablet ? mobileLabels : labels;

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: isOnFirstStep,
        display: isOnFirstStep,
        callbacks: {
          label: (context: TooltipItem<any>) => {
            const label = context.dataset.data[context.dataIndex];
            return context.dataset.label + " " + label + "%";
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        stacked: true,
        barPercentage: 1,
        ticks: {
          crossAlign: "far",
          callback: (value: string) => {
            return chartLabels[value];
          },
        },
      },
      y: {
        stacked: true,
        max: 100,
        grid: {
          display: false,
        },
        position: "right",
      },
    } as _DeepPartialObject<{
      [key: string]: ScaleOptionsByType<keyof CartesianScaleTypeRegistry>;
    }>,
    annotations: {
      label1: {
        type: "label",
        xValue: 0,
        yValue: 21,
        content: isOnFirstStep ? [] : ["42%"],
        font: {
          size: 18,
        },
      },
      label2: {
        type: "label",
        xValue: 1,
        yValue: 12,
        content: isOnFirstStep ? [] : ["24%"],
        font: {
          size: 18,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
