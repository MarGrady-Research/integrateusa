import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  annotationPlugin
);

export default function ScrollerLine4({ compDataNormalized }) {
  const ids = [
    {
      dist_id_alt: "0300000",
      dist_name_alt: "NYC Geographic District #03",
    },
    {
      dist_id_alt: "0400680",
      dist_name_alt: "Amphitheater Unified District (4406)",
    },
    {
      dist_id_alt: "0506330",
      dist_name_alt: "Fort Smith School District",
    },
    {
      dist_id_alt: "0601332",
      dist_name_alt: "Twin Rivers Unified",
    },
    {
      dist_id_alt: "0606810",
      dist_name_alt: "Cajon Valley Union",
    },
    {
      dist_id_alt: "0620250",
      dist_name_alt: "La Mesa-Spring Valley",
    },
    {
      dist_id_alt: "0636840",
      dist_name_alt: "Simi Valley Unified",
    },
    {
      dist_id_alt: "1500000",
      dist_name_alt: "NYC Geographic District #15",
    },
    {
      dist_id_alt: "1713710",
      dist_name_alt: "School District U-46",
    },
    {
      dist_id_alt: "2012990",
      dist_name_alt: "Wichita",
    },
    {
      dist_id_alt: "2400480",
      dist_name_alt: "Montgomery County Public Schools",
    },
    {
      dist_id_alt: "2513230",
      dist_name_alt: "Worcester",
    },
    {
      dist_id_alt: "4814280",
      dist_name_alt: "Clear Creek Independent School District",
    },
    {
      dist_id_alt: "4815000",
      dist_name_alt: "Conroe Independent School District",
    },
    {
      dist_id_alt: "4824060",
      dist_name_alt: "Hurst-Euless-Bedford Independent School District",
    },
    {
      dist_id_alt: "4825170",
      dist_name_alt: "Katy Independent School District",
    },
    {
      dist_id_alt: "4827300",
      dist_name_alt: "Lewisville Independent School District",
    },
    {
      dist_id_alt: "4837020",
      dist_name_alt: "Richardson Independent School District",
    },
    {
      dist_id_alt: "4841100",
      dist_name_alt: "Spring Branch Independent School District",
    },
    {
      dist_id_alt: "5103130",
      dist_name_alt: "Prince William Co Pblc Schs",
    },
  ];

  const lines = () => {
    return ids.map((id) => {
      return {
        label: id.dist_name_alt,
        data: compDataNormalized
          .filter((e) => e.dist_id_alt === id.dist_id_alt)
          .map((e) => e.norm_exp_wh_19),
        borderColor:
          id.dist_id_alt === "1500000"
            ? "rgb(255, 99, 132)"
            : "rgb(169, 169, 169)",
        backgroundColor:
          id.dist_id_alt === "1500000"
            ? "rgb(255, 99, 132)"
            : "rgb(169, 169, 169)",
      };
    });
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        position: "right",
        min: -0.2,
        max: 0.2,
        grid: {
          display: false,
        },
      },
    } as any,
    annotations: {
      line1: {
        type: "line",
        xMin: 9,
        xMax: 9,
        yMin: -0.2,
        yMax: 0.12,
        borderColor: "#000000",
        borderDash: [3, 4],
        borderCapStyle: "round",
        borderWidth: 2,
      },
      label1: {
        type: "label",
        xValue: 9,
        yValue: 0.15,
        content: ["Integration Plan", "Implemented"],
        font: {
          size: 12,
        },
      },
    },
  };

  const labels = [
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    ,
  ];

  const data = {
    labels,
    datasets: lines(),
  };

  return <Line options={options} data={data} />;
}
