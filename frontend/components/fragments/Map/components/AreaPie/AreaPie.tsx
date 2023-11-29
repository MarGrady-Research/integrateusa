import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import clsx from "clsx";

import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "../../../../../constants";

import { MapData } from "../../../../../interfaces";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  hoverInfo: any;
  mapData: MapData;
  small?: boolean;
}

const labels = ["Asian", "Black", "Hispanic", "White", "Other Races"];

const getAreaInfo = (hoverInfo, mapData) => {
  const { GEOID, STUSPS } = hoverInfo.feature.properties;

  const layerProp = STUSPS || GEOID;

  let areaId = "";

  if (GEOID.length === 5) {
    areaId = "county_id";
  } else if (GEOID.length === 7) {
    areaId = "dist_id";
  } else if (STUSPS) {
    areaId = "state_abb";
  }

  let schoolsTotal = 0;
  let studentsTotal = 0;
  let asianTotal = 0;
  let blackTotal = 0;
  let hispanicTotal = 0;
  let whiteTotal = 0;
  let otherTotal = 0;

  for (const feature of mapData) {
    const { tot_enr, as, bl, hi, wh, or } = feature.properties;

    if (feature.properties[areaId] === layerProp) {
      schoolsTotal += 1;
      studentsTotal += tot_enr;
      asianTotal += as;
      blackTotal += bl;
      hispanicTotal += hi;
      whiteTotal += wh;
      otherTotal += or;
    }
  }

  const asianPercentageRaw = (asianTotal / studentsTotal) * 100;
  const blackPercentageRaw = (blackTotal / studentsTotal) * 100;
  const hispanicPercentageRaw = (hispanicTotal / studentsTotal) * 100;
  const whitePercentageRaw = (whiteTotal / studentsTotal) * 100;
  const otherPercentageRaw = (otherTotal / studentsTotal) * 100;

  const schoolsInArea = schoolsTotal.toLocaleString();
  const studentsEnrolled = studentsTotal.toLocaleString();
  const asianPercentage = asianPercentageRaw.toFixed(1);
  const blackPercentage = blackPercentageRaw.toFixed(1);
  const hispanicPercentage = hispanicPercentageRaw.toFixed(1);
  const whitePercentage = whitePercentageRaw.toFixed(1);
  const otherPercentage = otherPercentageRaw.toFixed(1);

  const pieData = [
    asianPercentageRaw,
    blackPercentageRaw,
    hispanicPercentageRaw,
    whitePercentageRaw,
    otherPercentageRaw,
  ];

  return {
    schoolsInArea,
    studentsEnrolled,
    asianPercentage,
    blackPercentage,
    hispanicPercentage,
    whitePercentage,
    otherPercentage,
    pieData,
  };
};

const options = {
  reponsive: true,
  plugins: {
    tooltip: {
      enabled: true,
      display: true,
      callbacks: {
        label: (context) => {
          const label = context.dataset.data[context.dataIndex];
          return (
            labels[context.dataIndex] + " " + Math.round(label * 100) + "%"
          );
        },
      },
    },
    legend: {
      display: false,
    },
  },
};

export default function AreaPie({ hoverInfo, mapData, small = false }: Props) {
  const {
    schoolsInArea,
    studentsEnrolled,
    asianPercentage,
    blackPercentage,
    hispanicPercentage,
    whitePercentage,
    otherPercentage,
    pieData,
  } = getAreaInfo(hoverInfo, mapData);

  const data = {
    labels,
    datasets: [
      {
        label: "Enrollment Share by Race",
        data: pieData,
        borderColor: [
          asianColor,
          blackColor,
          hispanicColor,
          whiteColor,
          otherColor,
        ],
        borderWidth: 1,
        backgroundColor: [
          asianColor,
          blackColor,
          hispanicColor,
          whiteColor,
          otherColor,
        ],
      },
    ],
  };

  return (
    <>
      <div
        className={clsx({
          "pb-10": !small,
          "pb-2": small,
        })}
      >
        <p>
          <b>Total Schools:</b> {schoolsInArea}
        </p>
        <p>
          <b>Students Enrolled:</b> {studentsEnrolled}
        </p>
      </div>
      <div
        className={clsx({
          "pb-4": !small,
          "pb-2 text-center": small,
        })}
      >
        <p>
          <b className="text-asian">Asian: </b> {asianPercentage}%
        </p>
        <p>
          <b className="text-blackstudents">Black: </b> {blackPercentage}%
        </p>
        <p>
          <b className="text-hispanic">Hispanic: </b> {hispanicPercentage}%
        </p>
        <p>
          <b className="text-whitestudents">White: </b> {whitePercentage}%
        </p>
        <p>
          <b className="text-other">Other: </b> {otherPercentage}%
        </p>
      </div>
      <div className="w-1/2 justify-center mx-auto">
        <Pie data={data} options={options} />
      </div>
    </>
  );
}
