import React from "react";
import { useSelector } from "react-redux";

import BarChart from "./components/Bar";
import BarChart100 from "./components/Bar100";
import TableYearGrade from "./components/TableYearGrade";
import { selectGrade, selectYear } from "../../../store/selectSlice";

import { TrendData } from "../../../interfaces";

interface Props {
  trendData: TrendData;
}

export default function Trends({ trendData }: Props) {
  const grade = useSelector(selectGrade);
  const year = useSelector(selectYear);

  /*for (let i = 0; i < trendData.length; i++) {
    trendData[i]["total"] =
      trendData[i]["asian"] +
      trendData[i]["black"] +
      trendData[i]["hispanic"] +
      trendData[i]["white"] +
      trendData[i]["other"];
    trendData[i]["prop_as"] =
      Math.round((trendData[i]["asian"] / trendData[i]["total"]) * 1000) / 10;
    trendData[i]["prop_bl"] =
      Math.round((trendData[i]["black"] / trendData[i]["total"]) * 1000) / 10;
    trendData[i]["prop_hi"] =
      Math.round((trendData[i]["hispanic"] / trendData[i]["total"]) * 1000) /
      10;
    trendData[i]["prop_wh"] =
      Math.round((trendData[i]["white"] / trendData[i]["total"]) * 1000) / 10;
    trendData[i]["prop_ot"] =
      Math.round(
        (100 -
          (trendData[i]["prop_as"] +
            trendData[i]["prop_bl"] +
            trendData[i]["prop_hi"] +
            trendData[i]["prop_wh"])) *
          10
      ) / 10;
  }*/

  if (trendData.length > 0) {
    return (
      <>
        <h2 className="text-2xl mb-4">Enrollment Trends by Race</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-5 mb-10">
          <div>
            <div className="lg:w-5/6 xl:w-full mx-auto">
              <BarChart trendData={trendData} grade={grade} year={year} />
            </div>
          </div>
          <div>
            <div className="lg:w-5/6 xl:w-full mx-auto">
              <BarChart100 trendData={trendData} grade={grade} year={year} />
            </div>
          </div>
        </div>
        <h2 className="text-2xl mb-4">Enrollment Trends by Grade</h2>
        {/*<TableYearGrade
          trendData={trendData}
          selectedGrade={grade}
          selectedYear={year}
    />*/}
      </>
    );
  }

  return null;
}
