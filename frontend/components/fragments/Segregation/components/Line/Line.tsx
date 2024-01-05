import React, { memo } from "react";
import { useSelector } from "react-redux";
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
import CircularProgress from "@mui/material/CircularProgress";
import ErrorIcon from "@mui/icons-material/Error";
import clsx from "clsx";

import { yearsData } from "../../../Selection/data";
import { legendMargin } from "../../../../../charts";
import {
  primaryColor,
  selectedLineColor,
  unselectedLineColor,
} from "../../../../../constants";
import { ApiStatus, LineDataBase } from "../../../../../interfaces";

import { selectLineData } from "../../../../../store/apiCacheSlice";

// @ts-ignore
import { container } from "./Line.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  lines: LineDataBase[];
  id: string;
  year: number;
  grade: string;
  measure: {
    accessor: string;
    name: string;
  };
}

const labels = yearsData
  .map((e) => e.value)
  .sort((a, b) => {
    return a - b;
  });

const processLineData = (
  data: {
    [key: string]: any;
  }[],
  measure: {
    name: string;
    accessor: string;
  }
) => {
  let finalData = data.map((d) => ({
    seg: d[measure.accessor],
    year: d.year,
  }));

  labels.forEach((l) => {
    const yearInData = finalData.findIndex((d) => d.year === l) != -1;

    if (!yearInData) {
      let tempData = [...finalData, { seg: null, year: l }];

      finalData = tempData.sort((a, b) => {
        return a.year - b.year;
      });
    }
  });

  return finalData;
};

const LineGraph = memo(({ lines, id, year, grade, measure }: Props) => {
  const lineDataStore = useSelector(selectLineData);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        position: "right" as "right",
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

  const graphData = [];

  lines.forEach((line) => {
    const lineKey = `${grade}-${line.id}`;
    const lineKeyCache = lineDataStore[lineKey];
    const isLineKeyCached = typeof lineKeyCache !== "undefined";
    const lineDataCache = isLineKeyCached ? lineKeyCache.data : null;
    const isLineDataCached = typeof lineDataCache !== "undefined";

    if (isLineDataCached && lineDataCache) {
      const lineDataForMeasure = processLineData(lineDataCache, measure);

      graphData.push({
        label: line.name,
        data: lineDataForMeasure.map((li) => li.seg),
        borderColor: line.id === id ? selectedLineColor : unselectedLineColor,
        backgroundColor:
          line.id === id ? selectedLineColor : unselectedLineColor,
      });
    }
  });

  const data = {
    labels,
    datasets: graphData,
  };

  const legend = (
    <div className="flex flex-wrap justify-center text-sm">
      {lines.map((l) => {
        const lineKey = `${grade}-${l.id}`;
        const lineKeyCache = lineDataStore[lineKey];
        const isLineKeyCached = typeof lineKeyCache !== "undefined";
        const lineDataCache = isLineKeyCached ? lineKeyCache.data : null;
        const isLineDataCached = typeof lineDataCache !== "undefined";

        const isLoading =
          !isLineKeyCached ||
          (!isLineDataCached && lineKeyCache.status !== ApiStatus.Failure);
        const hasFailed =
          !isLineDataCached && lineKeyCache.status === ApiStatus.Failure;

        const bgColor =
          isLoading || hasFailed
            ? "transparent"
            : l.id === id
            ? selectedLineColor
            : unselectedLineColor;

        return (
          <div key={l.id} className="flex items-center mr-2 last:mr-0">
            <div
              className="w-10 h-3 mr-2 flex items-center justify-center"
              style={{
                backgroundColor: bgColor,
              }}
            >
              {isLoading && <CircularProgress color="inherit" size={14} />}
              {hasFailed && <ErrorIcon color="error" fontSize="medium" />}
            </div>
            {l.name}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={clsx(container, "mb-2")}>
      {legend}
      <Line options={options} data={data} plugins={[legendMargin]} />
    </div>
  );
});

export default LineGraph;
