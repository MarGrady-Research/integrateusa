import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { selectedLineColor, unselectedLineColor } from "constants/";
import { TrendData } from "interfaces";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const grades = [
  "PK",
  "KG",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "UG",
];

interface Props {
  trendData: TrendData;
  grade: string;
}

const sortTrendData = (trendData: TrendData) =>
  trendData.sort((a, b) => a.year - b.year);

const getLineData = (data: TrendData) => {
  const lineData = {};

  for (const grade of grades) {
    lineData[grade] = [];
  }

  for (const trend of data) {
    const { asian, black, hispanic, white, other } = trend;
    const total = asian + black + hispanic + white + other;

    if (lineData[trend.grade]) {
      lineData[trend.grade].push(total);
    }
  }

  return lineData;
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as "top",
    },
  },
  scales: {
    y: {
      position: "right" as "right",
    },
  },
};

export default function GradeLines({ trendData, grade }: Props) {
  const sortedData = useMemo(() => sortTrendData(trendData), [trendData]);

  const lineData = useMemo(() => getLineData(sortedData), [sortedData]);

  const labels = [...new Set(sortedData.map((e) => e.year))];

  const makeLines = () =>
    grades.map((el) => ({
      label: el,
      data: lineData[el],
      borderColor: el === grade ? selectedLineColor : unselectedLineColor,
      backgroundColor: el === grade ? selectedLineColor : unselectedLineColor,
    }));

  const data = {
    labels,
    datasets: makeLines(),
  };

  return <Line options={options} data={data} />;
}
