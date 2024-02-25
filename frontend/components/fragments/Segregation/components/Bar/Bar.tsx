import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  CategoryScale,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import clsx from "clsx";
import { Bar } from "react-chartjs-2";
import Skeleton from "@mui/material/Skeleton";
import ErrorIcon from "@mui/icons-material/Error";

import { SegEntity } from "interfaces";
import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "@/colors";

import { container } from "./Bar.module.scss";

ChartJS.register(LinearScale, BarElement, CategoryScale, Tooltip, Legend);

interface Props {
  focus: SegEntity;
  isLoading: boolean;
  hasFailed: boolean;
}

const labels = ["Asian", "Black", "Hispanic", "White", "Other Races"];

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      display: true,
      callbacks: {
        label: (context: TooltipItem<any>) => {
          const label = (context.dataset.data[context.dataIndex] * 100).toFixed(
            1
          );
          return context.dataset.label + " " + label + "%";
        },
      },
    },
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
      },
      stacked: true,
      barPercentage: 1,
    },
    y: {
      grid: {
        display: false,
      },
      stacked: true,
      max: 1,
      position: "right" as "right",
      ticks: {
        callback: (value: number) => {
          return value * 100 + "%";
        },
      },
    },
  },
};

export default function SegBar({ focus, isLoading, hasFailed }: Props) {
  if (hasFailed && !focus) {
    return (
      <div
        className={clsx(
          "flex flex-col items-center justify-center shadow border border-gray-200",
          container
        )}
      >
        <ErrorIcon color="error" fontSize="medium" className="mb-1" />
        Error loading data
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={container}>
        <Skeleton className="!h-full w-full" variant="rectangular" />
      </div>
    );
  }

  const {
    exp_as_as,
    exp_bl_as,
    exp_hi_as,
    exp_or_as,
    exp_wh_as,
    exp_as_bl,
    exp_bl_bl,
    exp_hi_bl,
    exp_or_bl,
    exp_wh_bl,
    exp_as_hi,
    exp_bl_hi,
    exp_hi_hi,
    exp_or_hi,
    exp_wh_hi,
    exp_as_wh,
    exp_bl_wh,
    exp_hi_wh,
    exp_or_wh,
    exp_wh_wh,
    exp_as_or,
    exp_bl_or,
    exp_hi_or,
    exp_or_or,
    exp_wh_or,
  } = focus;

  const dataset = [
    {
      label: "Asian",
      id: "as",
      data: [
        exp_as_as / 100,
        exp_bl_as / 100,
        exp_hi_as / 100,
        exp_wh_as / 100,
        exp_or_as / 100,
      ],
      backgroundColor: asianColor,
    },
    {
      label: "Black",
      id: "bl",
      data: [
        exp_as_bl / 100,
        exp_bl_bl / 100,
        exp_hi_bl / 100,
        exp_wh_bl / 100,
        exp_or_bl / 100,
      ],
      backgroundColor: blackColor,
    },
    {
      label: "Hispanic",
      id: "hi",
      data: [
        exp_as_hi / 100,
        exp_bl_hi / 100,
        exp_hi_hi / 100,
        exp_wh_hi / 100,
        exp_or_hi / 100,
      ],
      backgroundColor: hispanicColor,
    },
    {
      label: "White",
      id: "wh",
      data: [
        exp_as_wh / 100,
        exp_bl_wh / 100,
        exp_hi_wh / 100,
        exp_wh_wh / 100,
        exp_or_wh / 100,
      ],
      backgroundColor: whiteColor,
    },
    {
      label: "Other",
      id: "or",
      data: [
        exp_as_or / 100,
        exp_bl_or / 100,
        exp_hi_or / 100,
        exp_wh_or / 100,
        exp_or_or / 100,
      ],
      backgroundColor: otherColor,
    },
  ];

  const data = {
    labels: labels,
    datasets: dataset,
  };

  return (
    <div className={container}>
      <Bar options={options} data={data} />
    </div>
  );
}
