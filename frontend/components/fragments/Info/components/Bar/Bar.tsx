import React, { useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  CategoryScale,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import { Mode } from "chartjs-plugin-zoom/types/options";
import clsx from "clsx";
import Skeleton from "@mui/material/Skeleton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "@/colors";

import { legendMargin } from "charts";

import { InfoData, RacialProportion, School } from "interfaces";

import {
  container,
  buttons,
  buttonAsian,
  buttonBlack,
  buttonHispanic,
  buttonWhite,
  buttonOther,
  legend,
} from "./Bar.module.scss";

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

const getBarData = (data: InfoData) => {
  const asianData = [];
  const blackData = [];
  const hispanicData = [];
  const whiteData = [];
  const otherData = [];
  const labels = [];

  for (const school of data) {
    const { asian, black, hispanic, white, other, sch_name } = school;

    const tot_enr = asian + black + hispanic + white + other;

    const prop_as = (asian * 100) / tot_enr;
    const prop_bl = (black * 100) / tot_enr;
    const prop_hi = (hispanic * 100) / tot_enr;
    const prop_wh = (white * 100) / tot_enr;
    const prop_or = (other * 100) / tot_enr;

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

const getPropData = (school: School, sortBy: RacialProportion): number => {
  const { asian, black, hispanic, white, other } = school;

  const tot_enr = asian + black + hispanic + white + other;

  let prop = 0;

  switch (sortBy) {
    case "prop_as":
      prop = asian;
      break;
    case "prop_bl":
      prop = black;
      break;
    case "prop_hi":
      prop = hispanic;
      break;
    case "prop_wh":
      prop = white;
      break;
    case "prop_or":
      prop = other;
      break;
  }

  return (prop * 100) / tot_enr;
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
        label: (context: TooltipItem<any>) => {
          const label = context.dataset.data[context.dataIndex];
          return (
            context.dataset.label + " " + parseFloat(label).toFixed(1) + "%"
          );
        },
      },
    },
    zoom: {
      pan: {
        enabled: true,
        mode: "x" as Mode,
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: "x" as Mode,
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
      display: false,
      stacked: true,
      barPercentage: 1,
    },
    y: {
      stacked: true,
      min: 0,
      max: 100,
    },
  },
};

export default function BarChart({ infoData, isLoading }: Props) {
  const [sortBy, setSortBy] = useState("" as RacialProportion | "");

  if (isLoading) {
    return (
      <>
        <Skeleton variant="rectangular" className={clsx(legend, "mb-1")} />
        <Skeleton variant="rectangular" className={container} />
      </>
    );
  }

  const handleSort = (v: RacialProportion) => setSortBy(v);

  const sortedData = [...infoData];

  if (!!sortBy) {
    sortedData.sort((a, b) => {
      return getPropData(a, sortBy) - getPropData(b, sortBy);
    });
  } else {
    sortedData.sort((a, b) => {
      return a.sch_name < b.sch_name ? -1 : a.sch_name > b.sch_name ? 1 : 0;
    });
  }

  const { asianData, blackData, hispanicData, whiteData, otherData, labels } =
    getBarData(sortedData);

  const sortedByAsian = sortBy === "prop_as";
  const sortedByBlack = sortBy === "prop_bl";
  const sortedByHispanic = sortBy === "prop_hi";
  const sortedByWhite = sortBy === "prop_wh";
  const sortedByOther = sortBy === "prop_or";

  const barData = [
    {
      label: "Asian",
      id: "prop_as",
      data: asianData,
      backgroundColor: asianColor,
      order: sortedByAsian ? 0 : 1,
    },
    {
      label: "Black",
      id: "prop_bl",
      data: blackData,
      backgroundColor: blackColor,
      order: sortedByBlack ? 0 : 1,
    },
    {
      label: "Hispanic",
      id: "prop_hi",
      data: hispanicData,
      backgroundColor: hispanicColor,
      order: sortedByHispanic ? 0 : 1,
    },
    {
      label: "White",
      id: "prop_wh",
      data: whiteData,
      backgroundColor: whiteColor,
      order: sortedByWhite ? 0 : 1,
    },
    {
      label: "Other",
      id: "prop_or",
      data: otherData,
      backgroundColor: otherColor,
      order: sortedByOther ? 0 : 1,
    },
  ];

  const data = {
    labels: labels,
    datasets: barData,
  };

  return (
    <div className="flex flex-col">
      <div
        className={clsx(
          "flex justify-center items-center flex-col sm:flex-row mb-1",
          legend
        )}
      >
        <p className="text-sm mr-1 sm:-mt-0.5 sm:mr-0 mb-1 sm:mb-0">
          Click to sort
        </p>
        <ArrowForwardIcon className="mr-1 !hidden sm:!inline-block" />
        <div className={clsx("flex flex-wrap justify-center", buttons)}>
          <div className={clsx({ "text-primary": sortedByAsian })}>
            <button
              className={buttonAsian}
              onClick={() => handleSort("prop_as")}
            />
            Asian
          </div>
          <div className={clsx({ "text-primary": sortedByBlack })}>
            <button
              className={buttonBlack}
              onClick={() => handleSort("prop_bl")}
            />
            Black
          </div>
          <div className={clsx({ "text-primary": sortedByHispanic })}>
            <button
              className={buttonHispanic}
              onClick={() => handleSort("prop_hi")}
            />
            Hispanic
          </div>
          <div className={clsx({ "text-primary": sortedByWhite })}>
            <button
              className={buttonWhite}
              onClick={() => handleSort("prop_wh")}
            />
            White
          </div>
          <div className={clsx({ "text-primary": sortedByOther })}>
            <button
              className={buttonOther}
              onClick={() => handleSort("prop_or")}
            />
            Other
          </div>
        </div>
      </div>
      <div className={container}>
        <Bar data={data} options={options} plugins={[legendMargin]} />
      </div>
    </div>
  );
}
