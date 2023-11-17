import React, { useEffect } from "react";
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
import { yearsData } from "../../../Selection/data";

import { legendMargin } from "../../../../../charts";
import { primaryColor } from "../../../../../constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineGraph({ linedata, id, year }) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top" as any,
      },
    },
    scales: {
      y: {
        position: "right" as any,
        min: 0,
        max: 100,
      },
      x: {
        stacked: true,
        ticks: {
          font: {
            weight: (c) => {
              if (c.tick.label === year) {
                return "bold";
              }
            },
          },
          color: (c) => {
            if (c.tick.label === year) {
              return primaryColor;
            }
          },
        },
      },
    },
  };

  const labels = yearsData
    .map((e) => e.value)
    .sort((a, b) => {
      return a - b;
    });

  const makeLines = () => {
    return linedata.map((e) => {
      return {
        label: e.name,
        data: e.data.map((e) => e.seg),
        borderColor: e.id === id ? "rgb(255, 99, 132)" : "rgb(169, 169, 169)",
        backgroundColor:
          e.id === id ? "rgb(255, 99, 132)" : "rgb(169, 169, 169)",
      };
    });
  };

  const data = {
    labels,
    datasets: makeLines(),
  };

  useEffect(() => {
    makeLines();
  }, [linedata, makeLines]);

  return <Line options={options} data={data} plugins={[legendMargin]} />;
}
