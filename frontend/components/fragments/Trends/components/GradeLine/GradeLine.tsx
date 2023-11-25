import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function GradeLines({ trendData, grade }) {
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

  let sortedData = trendData.sort((a, b) => {
    return a["year"] - b["year"];
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as any,
      },
    },
    scales: {
      y: {
        position: "right" as any,
      },
    },
  };

  const labels = [...new Set(sortedData.map((e) => e.year))];

  const makeLines = () => {
    return grades.map((el) => {
      return {
        label: el,
        data: sortedData
          .filter((e) => e.grade === el)
          .map((e) => e.asian + e.black + e.hispanic + e.other + e.white),
        borderColor: el === grade ? "rgb(255, 99, 132)" : "rgb(169, 169, 169)",
        backgroundColor:
          el === grade ? "rgb(255, 99, 132)" : "rgb(169, 169, 169)",
      };
    });
  };

  const data = {
    labels,
    datasets: makeLines(),
  };

  return <>{trendData && <Line options={options} data={data} />}</>;
}
