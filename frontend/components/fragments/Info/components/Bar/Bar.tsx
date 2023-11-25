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
import Select from "react-select";

import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "../../../../../constants";
import { legendMargin } from "../../../../../charts";

ChartJS.register(
  LinearScale,
  BarElement,
  CategoryScale,
  Tooltip,
  Legend,
  zoomPlugin
);

export default function BarChart({ filterData }) {
  const bar = (data, group) => {
    return data.map((e) => e[group]);
  };

  const [labels, setLabels] = useState(filterData.map((e) => e.sch_name));

  const [asianOrder, setAsianOrder] = useState(0);
  const [blackOrder, setBlackOrder] = useState(1);
  const [hispanicOrder, setHispanicOrder] = useState(1);
  const [whiteOrder, setWhiteOrder] = useState(1);
  const [otherOrder, setOtherOrder] = useState(1);

  const sortData = (group) => {
    let newdata = filterData;
    newdata.sort((a, b) => {
      return a[group] - b[group];
    });

    setLabels(newdata.map((e) => e.sch_name));

    group === "prop_as" ? setAsianOrder(0) : setAsianOrder(1);
    group === "prop_bl" ? setBlackOrder(0) : setBlackOrder(1);
    group === "prop_hi" ? setHispanicOrder(0) : setHispanicOrder(1);
    group === "prop_wh" ? setWhiteOrder(0) : setWhiteOrder(1);
    group === "prop_or" ? setOtherOrder(0) : setOtherOrder(1);
  };

  const sortOptions = [
    { value: "prop_as", label: "Asian" },
    { value: "prop_bl", label: "Black" },
    { value: "prop_hi", label: "Hispanic" },
    { value: "prop_wh", label: "White" },
    { value: "prop_or", label: "Other" },
  ];

  const barData = [
    {
      label: "Asian",
      id: "prop_as",
      data: bar(filterData, "prop_as"),
      backgroundColor: asianColor,
      order: asianOrder,
    },
    {
      label: "Black",
      id: "prop_bl",
      data: bar(filterData, "prop_bl"),
      backgroundColor: blackColor,
      order: blackOrder,
    },
    {
      label: "Hispanic",
      id: "prop_hi",
      data: bar(filterData, "prop_hi"),
      backgroundColor: hispanicColor,
      order: hispanicOrder,
    },
    {
      label: "White",
      id: "prop_wh",
      data: bar(filterData, "prop_wh"),
      backgroundColor: whiteColor,
      order: whiteOrder,
    },
    {
      label: "Other",
      id: "prop_or",
      data: bar(filterData, "prop_or"),
      backgroundColor: otherColor,
      order: otherOrder,
    },
  ];

  const data = {
    labels: labels,
    datasets: barData,
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: true,
        display: true,
        callbacks: {
          label: function (context) {
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

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-5 mb-4">
        <Select
          placeholder="Sort by..."
          options={sortOptions}
          onChange={(e) => sortData(e.value)}
        />
      </div>
      <div className="lg:w-5/6 mx-auto">
        <Bar data={data} options={options as any} plugins={[legendMargin]} />
      </div>
    </>
  );
}
