import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { legendMargin } from "../../../../../charts";
import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "../../../../../constants";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ filterData }) {
  const groups = ["asian", "black", "hispanic", "white", "other"];

  const enrSum = (arr, group) => {
    return arr.reduce(function (a, b) {
      return a + b[group];
    }, 0);
  };

  const enrData = (arr, total) => {
    return arr.map((item) => {
      return {
        group: item,
        enr: Math.round((enrSum(filterData, item) / total) * 100),
      };
    });
  };

  const enrTotal = enrSum(filterData, "tot_enr");
  const pieData = enrData(groups, enrTotal);

  const options = {
    reponsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        display: true,
        callbacks: {
          label: function (context) {
            let label = context.dataset.data[context.dataIndex];
            return data.labels[context.dataIndex] + " " + label + "%";
          },
        },
      },
    },
  };

  const data = {
    labels: ["Asian", "Black", "Hispanic", "White", "Other"],
    datasets: [
      {
        label: "Enrollment Share by Race",
        data: pieData.map((e) => e.enr),
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

  return <Pie data={data} options={options} plugins={[legendMargin]} />;
}
