import React, {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import Skeleton from "@mui/material/Skeleton";
import ErrorIcon from "@mui/icons-material/Error";
import { Pie } from "react-chartjs-2";

import { legendMargin } from "charts";

import {
  asianColor,
  blackColor,
  hispanicColor,
  whiteColor,
  otherColor,
} from "@/colors";

import { School } from "interfaces";

import { pieLegendSkeleton } from "./Pie.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  infoData: School[];
  isLoading: boolean;
  hasFailed: boolean;
}

const getPieData = (infoData: School[]) => {
  let studentsTotal = 0;
  let asianTotal = 0;
  let blackTotal = 0;
  let hispanicTotal = 0;
  let whiteTotal = 0;
  let otherTotal = 0;

  for (const school of infoData) {
    const { asian, black, hispanic, white, other } = school;

    const tot_enr = asian + black + hispanic + white + other;

    studentsTotal += tot_enr;
    asianTotal += asian;
    blackTotal += black;
    hispanicTotal += hispanic;
    whiteTotal += white;
    otherTotal += other;
  }

  const asianPercentage = Math.round((asianTotal / studentsTotal) * 100);
  const blackPercentage = Math.round((blackTotal / studentsTotal) * 100);
  const hispanicPercentage = Math.round((hispanicTotal / studentsTotal) * 100);
  const whitePercentage = Math.round((whiteTotal / studentsTotal) * 100);
  const otherPercentage = Math.round((otherTotal / studentsTotal) * 100);

  return [
    asianPercentage,
    blackPercentage,
    hispanicPercentage,
    whitePercentage,
    otherPercentage,
  ];
};

const labels = ["Asian", "Black", "Hispanic", "White", "Other"];

const options = {
  animation: false,
  reponsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: true,
      display: true,
      callbacks: {
        label: (context: TooltipItem<any>) => {
          const label = context.dataset.data[context.dataIndex];
          return labels[context.dataIndex] + " " + label + "%";
        },
      },
    },
  },
};

export default function PieChart({ infoData, isLoading, hasFailed }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const setDimensions = useCallback(() => {
    if (!ref.current) {
      return;
    }

    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
  }, []);

  useEffect(() => {
    setDimensions();
  }, [setDimensions]);

  useEffect(() => {
    const handleWindowResize = () => {
      setDimensions();
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [setDimensions]);

  if (isLoading) {
    const circleDiameter = Math.min(height, width);
    return (
      <div className="flex flex-col  items-center h-full">
        <Skeleton variant="rectangular" className={pieLegendSkeleton} />
        <div className="flex-1 w-full flex justify-center" ref={ref}>
          <Skeleton
            variant="circular"
            width={circleDiameter}
            height={circleDiameter}
          />
        </div>
      </div>
    );
  }

  if (hasFailed) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <ErrorIcon color="error" fontSize="medium" className="mb-1" />
        Error loading data
      </div>
    );
  }

  if (infoData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        No data available
      </div>
    );
  }

  const pieData = getPieData(infoData);

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

  return <Pie data={data} options={options} plugins={[legendMargin]} />;
}
