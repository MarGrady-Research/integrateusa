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
import ErrorIcon from "@mui/icons-material/Error";

import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "@/colors";

import { legendMargin } from "charts";

import { RacialProportion, School } from "interfaces";

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
  infoData: School[];
  isLoading: boolean;
  hasFailed: boolean;
}

interface SortButtonProps {
  isSortedBy: boolean;
  onClick: () => void;
  label: string;
  className: string;
}

interface SchoolData {
  prop: number;
  county_name: string;
  dist_name: string;
}

const getBarData = (data: School[]) => {
  const asianData: SchoolData[] = [];
  const blackData: SchoolData[] = [];
  const hispanicData: SchoolData[] = [];
  const whiteData: SchoolData[] = [];
  const otherData: SchoolData[] = [];
  const labels: string[] = [];

  for (const school of data) {
    const {
      asian,
      black,
      hispanic,
      white,
      other,
      sch_name,
      county_name,
      dist_name,
    } = school;

    const tot_enr = asian + black + hispanic + white + other;

    const prop_as = (asian * 100) / tot_enr;
    const prop_bl = (black * 100) / tot_enr;
    const prop_hi = (hispanic * 100) / tot_enr;
    const prop_wh = (white * 100) / tot_enr;
    const prop_or = (other * 100) / tot_enr;

    asianData.push({ prop: prop_as, county_name, dist_name });
    blackData.push({ prop: prop_bl, county_name, dist_name });
    hispanicData.push({ prop: prop_hi, county_name, dist_name });
    whiteData.push({ prop: prop_wh, county_name, dist_name });
    otherData.push({ prop: prop_or, county_name, dist_name });
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
  parsing: {
    xAxisKey: "prop",
    yAxisKey: "prop",
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      display: true,
      callbacks: {
        afterTitle: (tooltipItems: TooltipItem<any>[]) => {
          const { dist_name, county_name } = tooltipItems[0].raw as {
            dist_name: string;
            county_name: string;
          };
          return `${dist_name}\n${county_name}`;
        },
        label: (tooltipItem: TooltipItem<any>) => {
          const label = tooltipItem.dataset.data[tooltipItem.dataIndex].prop;
          return (
            tooltipItem.dataset.label + " " + parseFloat(label).toFixed(1) + "%"
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

const SortButton = ({
  isSortedBy,
  onClick,
  className,
  label,
}: SortButtonProps) => {
  const ariaLabel = `${label}-sort`;

  return (
    <div
      className={clsx("mr-2 mb-1 sm:mb-0 last:mr-0 flex items-center", {
        "text-primary": isSortedBy,
      })}
    >
      <button
        className={clsx(className, "flex items-center justify-center")}
        onClick={onClick}
        aria-labelledby={ariaLabel}
      />
      <span id={ariaLabel}>{label}</span>
    </div>
  );
};

export default function BarChart({ infoData, isLoading, hasFailed }: Props) {
  const [sortBy, setSortBy] = useState("" as RacialProportion | "");

  if (isLoading) {
    return (
      <>
        <Skeleton variant="rectangular" className={clsx(legend, "mb-1")} />
        <Skeleton variant="rectangular" className={container} />
      </>
    );
  }

  if (hasFailed) {
    return (
      <>
        <div className={clsx(legend, "mb-1")} />
        <div
          className={clsx(
            "flex flex-col items-center justify-center shadow border border-gray-200",
            container
          )}
        >
          <ErrorIcon color="error" fontSize="medium" className="mb-1" />
          Error loading data
        </div>
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

  const barLegend = (
    <div
      className={clsx(
        "flex justify-center items-center flex-col sm:flex-row mb-1",
        legend
      )}
    >
      <p className="text-sm mr-1 sm:-mt-0.5 sm:mr-0 mb-2 sm:mb-0">
        Click to sort
      </p>
      <ArrowForwardIcon className="mr-1 !hidden sm:!inline-block" />
      <div className={clsx("flex flex-wrap justify-center", buttons)}>
        <SortButton
          isSortedBy={sortedByAsian}
          onClick={() => handleSort("prop_as")}
          label="Asian"
          className={buttonAsian}
        />
        <SortButton
          isSortedBy={sortedByBlack}
          onClick={() => handleSort("prop_bl")}
          label="Black"
          className={buttonBlack}
        />
        <SortButton
          isSortedBy={sortedByHispanic}
          onClick={() => handleSort("prop_hi")}
          label="Hispanic"
          className={buttonHispanic}
        />
        <SortButton
          isSortedBy={sortedByWhite}
          onClick={() => handleSort("prop_wh")}
          label="White"
          className={buttonWhite}
        />
        <SortButton
          isSortedBy={sortedByOther}
          onClick={() => handleSort("prop_or")}
          label="Other"
          className={buttonOther}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      {barLegend}
      <div className={container}>
        <Bar data={data} options={options} plugins={[legendMargin]} />
      </div>
    </div>
  );
}
