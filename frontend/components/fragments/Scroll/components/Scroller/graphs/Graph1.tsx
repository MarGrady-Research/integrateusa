import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ScrollerPie({ rawdata }) {
  const groups = ["asian", "black", "hispanic", "other", "white"];
  const enrTotal =
    rawdata.asian +
    rawdata.black +
    rawdata.hispanic +
    rawdata.other +
    rawdata.white;

  const pieData = groups.map((e) => {
    return {
      group: e,
      enr: Math.round((rawdata[e] / enrTotal) * 100),
    };
  });

  const options = {
    reponsive: true,
    plugins: {
      legend: {
        display: false,
      },
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
    labels: ["Asian", "Black", "Hispanic", "Other", "White"],
    datasets: [
      {
        label: "Enrollment Share by Race",
        data: pieData.map((e) => e.enr),
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

  return <Pie data={data} options={options} />;
}
