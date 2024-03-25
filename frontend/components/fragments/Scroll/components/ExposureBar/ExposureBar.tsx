import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  CategoryScale,
  Tooltip,
  TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import annotationPlugin, { AnnotationElement } from "chartjs-plugin-annotation";

import { useBreakpointRegion } from "hooks";

import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "@/colors";

interface Props {
  step: ExposureBarStep;
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

const desktopLabels = [
  ["Demographics of", "Avg White Student's", "School"],
  ["Demographics of", "Avg Non-White Student's", "School"],
];

const mobileLabels = [
  ["Demographics of", "Avg White", " Student'sSchool"],
  ["Demographics of", "Avg Non-White", "Student's School"],
];

const asianData = [11.4, 13.4];
const blackData = [12.6, 13.1];
const hispanicData = [27.7, 46.3];
const whiteData = [43.3, 24.1];
const otherData = [5.0, 3.1];

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

export default function ExposureBar({ step }: Props) {
  const breakpointRegion = useBreakpointRegion();

  const onMobile = breakpointRegion === "xs";

  const labels = onMobile ? mobileLabels : desktopLabels;

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

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: isOnFirstStep,
        display: isOnFirstStep,
        callbacks: {
          title: () => "",
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
          font: {
            size: 14,
          },
          callback: (value: string) => {
            return labels[value];
          },
        },
      },
      y: {
        stacked: true,
        max: 100,
        grid: {
          display: false,
        },
        position: "right" as "right",
        ticks: {
          callback: (val: string) => {
            return val + "  ";
          },
        },
      },
    },
    annotations: {
      label1: {
        type: "label",
        xValue: 0,
        yValue: 21.65,
        content: isOnFirstStep ? [] : "43.3%",
        font: {
          size: onMobile ? 20 : 24,
        },
      },
      label2: {
        type: "label",
        xValue: 1,
        yValue: 12.05,
        content: isOnFirstStep ? [] : "24.1%",
        font: {
          size: onMobile ? 20 : 24,
        },
      },
      label3: {
        type: "label",
        xValue: onMobile ? 0.96 : 0.85,
        yValue: 33,
        content: isOnFirstStep ? null : "19.2%",
        font: {
          size: onMobile ? 20 : 24,
        },
        init: ({ properties }: { properties: AnnotationElement }) => {
          return {
            ...properties,
            x: properties.x + 7,
          };
        },
      },
      label4: {
        type: "label",
        xValue: onMobile ? 0.69 : 0.67,
        yValue: 33.7,
        content: isOnFirstStep ? null : "}",
        font: {
          size: 62,
          weight: 400,
        },
        init: ({ properties }: { properties: AnnotationElement }) => {
          return {
            ...properties,
            x: properties.x + 7,
          };
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
