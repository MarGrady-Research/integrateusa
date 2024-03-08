import React from "react";
import { useSelector } from "react-redux";

import BarChart from "./components/Bar";
import BarChart100 from "./components/Bar100";
import TableYearGrade from "./components/TableYearGrade";

import { selectGrade, selectYear } from "store/selectSlice";

import { TrendData } from "interfaces";

interface Props {
  trendData: TrendData;
  isLoading: boolean;
  hasFailed: boolean;
}

export default function Trends({ trendData, isLoading, hasFailed }: Props) {
  const grade = useSelector(selectGrade);
  const year = useSelector(selectYear);

  return (
    <>
      <h2 className="text-2xl font-medium  mb-4">Enrollment Trends by Race</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-5 mb-10">
        <div>
          <div className="lg:w-5/6 xl:w-full mx-auto">
            <BarChart
              trendData={trendData}
              grade={grade}
              year={year}
              isLoading={isLoading}
              hasFailed={hasFailed}
            />
          </div>
        </div>
        <div>
          <div className="lg:w-5/6 xl:w-full mx-auto">
            <BarChart100
              trendData={trendData}
              grade={grade}
              year={year}
              isLoading={isLoading}
              hasFailed={hasFailed}
            />
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-medium mb-4">Enrollment Trends by Grade</h2>
      <TableYearGrade
        trendData={trendData}
        selectedGrade={grade}
        selectedYear={year}
        isLoading={isLoading}
        hasFailed={hasFailed}
      />
    </>
  );
}
