import React, { useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import clsx from "clsx";
import Skeleton from "@mui/material/Skeleton";

import Select from "../../../../atoms/Select";

import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "../../../../../constants";

import { legendMargin } from "../../../../../charts";

import { InfoData, RacialProportion } from "../../../../../interfaces";

import { sortOnOrder } from "../../../../../utils";

// @ts-ignore
import { container } from "./Bar.module.scss";

ChartJS.register(
  LinearScale,
  BarElement,
  CategoryScale,
  Tooltip,
  Legend,
  zoomPlugin
);

interface Props {
  infoData: InfoData;
  isLoading: boolean;
}

const sortOptions = [
  { value: "prop_as", label: "Asian" },
  { value: "prop_bl", label: "Black" },
  { value: "prop_hi", label: "Hispanic" },
  { value: "prop_wh", label: "White" },
  { value: "prop_or", label: "Other" },
] as { value: RacialProportion; label: string }[];

const labelOrder = ["Asian", "Black", "Hispanic", "White", "Other"];

const getBarData = (data: InfoData) => {
  const asianData = [];
  const blackData = [];
  const hispanicData = [];
  const whiteData = [];
  const otherData = [];
  const labels = [];

  for (const school of data) {
    const { prop_as, prop_bl, prop_hi, prop_wh, prop_or, sch_name } = school;

    asianData.push(prop_as);
    blackData.push(prop_bl);
    hispanicData.push(prop_hi);
    whiteData.push(prop_wh);
    otherData.push(prop_or);
    labels.push(sch_name);
  }

  return {
    asianData,
    blackData,
    hispanicData,
    whiteData,
    otherData,
    labels,
  };
};

const options = {
  animation: false,
  plugins: {
    legend: {
      labels: {
        sort: (a, b) => sortOnOrder(a.text, b.text, labelOrder),
      },
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
    zoom: {
      pan: {
        enabled: true,
        mode: "x",
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: "x",
      },
      limits: {
        y: { min: 0, max: 150 },
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: false,
      display: false,
      stacked: true,
      barPercentage: 1,
    },
    y: {
      stacked: true,
      max: 100,
    },
  },
};

export default function BarChart({ infoData, isLoading }: Props) {
  if (isLoading) {
    return <Skeleton variant="rectangular" className={container} />;
  }

  const [sortBy, setSortBy] = useState("" as RacialProportion | "");

  const handleSort = (e) => setSortBy(e.target.value as RacialProportion);

  const sortedData = [...infoData];

  if (!!sortBy) {
    sortedData.sort((a, b) => {
      return a[sortBy] - b[sortBy];
    });
  }

  const { asianData, blackData, hispanicData, whiteData, otherData, labels } =
    getBarData(sortedData);

  const barData = [
    {
      label: "Asian",
      id: "prop_as",
      data: asianData,
      backgroundColor: asianColor,
      order: sortBy === "prop_as" ? 0 : 1,
    },
    {
      label: "Black",
      id: "prop_bl",
      data: blackData,
      backgroundColor: blackColor,
      order: sortBy === "prop_bl" ? 0 : 1,
    },
    {
      label: "Hispanic",
      id: "prop_hi",
      data: hispanicData,
      backgroundColor: hispanicColor,
      order: sortBy === "prop_hi" ? 0 : 1,
    },
    {
      label: "White",
      id: "prop_wh",
      data: whiteData,
      backgroundColor: whiteColor,
      order: sortBy === "prop_wh" ? 0 : 1,
    },
    {
      label: "Other",
      id: "prop_or",
      data: otherData,
      backgroundColor: otherColor,
      order: sortBy === "prop_or" ? 0 : 1,
    },
  ];

  const data = {
    labels: labels,
    datasets: barData,
  };

  return (
    <div className={clsx(container, "flex flex-col")}>
      <div className="grid grid-cols-1 lg:grid-cols-4 mb-4">
        <Select
          id="sort-select"
          value={sortBy}
          label="Sort by"
          onChange={handleSort}
          options={sortOptions}
        />
      </div>
      <div className="flex-1">
        <Bar data={data} options={options as any} plugins={[legendMargin]} />
      </div>
    </div>
  );
}
