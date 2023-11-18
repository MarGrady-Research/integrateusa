import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AreaPie({ areaID, layerProp, piedata, clickInfo }) {
  const chartData = [
    (piedata.features
      .filter(
        (e) =>
          e.properties[areaID()] === clickInfo.feature.properties[layerProp()]
      )
      .map((e) => e.properties.as)
      .reduce((a, b) => a + b, 0) /
      piedata.features
        .filter(
          (e) =>
            e.properties[areaID()] === clickInfo.feature.properties[layerProp()]
        )
        .map((e) => e.properties.tot_enr)
        .reduce((a, b) => a + b, 0)) *
      100,
    (piedata.features
      .filter(
        (e) =>
          e.properties[areaID()] === clickInfo.feature.properties[layerProp()]
      )
      .map((e) => e.properties.bl)
      .reduce((a, b) => a + b, 0) /
      piedata.features
        .filter(
          (e) =>
            e.properties[areaID()] === clickInfo.feature.properties[layerProp()]
        )
        .map((e) => e.properties.tot_enr)
        .reduce((a, b) => a + b, 0)) *
      100,
    (piedata.features
      .filter(
        (e) =>
          e.properties[areaID()] === clickInfo.feature.properties[layerProp()]
      )
      .map((e) => e.properties.hi)
      .reduce((a, b) => a + b, 0) /
      piedata.features
        .filter(
          (e) =>
            e.properties[areaID()] === clickInfo.feature.properties[layerProp()]
        )
        .map((e) => e.properties.tot_enr)
        .reduce((a, b) => a + b, 0)) *
      100,
    (piedata.features
      .filter(
        (e) =>
          e.properties[areaID()] === clickInfo.feature.properties[layerProp()]
      )
      .map((e) => e.properties.or)
      .reduce((a, b) => a + b, 0) /
      piedata.features
        .filter(
          (e) =>
            e.properties[areaID()] === clickInfo.feature.properties[layerProp()]
        )
        .map((e) => e.properties.tot_enr)
        .reduce((a, b) => a + b, 0)) *
      100,
    (piedata.features
      .filter(
        (e) =>
          e.properties[areaID()] === clickInfo.feature.properties[layerProp()]
      )
      .map((e) => e.properties.wh)
      .reduce((a, b) => a + b, 0) /
      piedata.features
        .filter(
          (e) =>
            e.properties[areaID()] === clickInfo.feature.properties[layerProp()]
        )
        .map((e) => e.properties.tot_enr)
        .reduce((a, b) => a + b, 0)) *
      100,
  ];

  const data = {
    labels: ["Asian", "Black", "Hispanic", "Other Races", "White"],
    datasets: [
      {
        label: "Enrollment Share by Race",
        data: chartData,
        borderColor: ["#FF5050", "#4472C4", "#FF9900", "#FFC000", "#339933"],
        borderWidth: 1,
        backgroundColor: [
          "#FF5050",
          "#4472C4",
          "#FF9900",
          "#FFC000",
          "#339933",
        ],
      },
    ],
  };

  const options = {
    reponsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        display: true,
        callbacks: {
          label: function (context) {
            let label = context.dataset.data[context.dataIndex];
            return (
              data.labels[context.dataIndex] +
              " " +
              Math.round(label * 100) +
              "%"
            );
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return <Pie data={data} options={options} />;
}
