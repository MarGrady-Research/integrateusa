import React from "react";
import { useSelector } from "react-redux";

import BarChart from "./components/Bar";
import BarChart100 from "./components/Bar100";
import TableYearGrade from "./components/TableYearGrade"; // can set ./TableYearGrade back to ./GradeLine to get line graph back
import { selectGrade, selectYear } from "../../../store/selectSlice";

export default function Trends({ trendData }) {
  const grade = useSelector(selectGrade);
  const year = useSelector(selectYear);

  /* calculate totals and percentages by race */
  for (let i = 0; i < trendData.length; i++) {
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
  }

  /* display trend bar charts and table (wrapped in if statement b/c otherwise runs through twice,
    once to display blank tables and then a second time with data) */

  if (trendData.length > 0) {
    return (
      <>
        <h2 className="text-2xl mb-4">Enrollment Trends by Race</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-5 mb-10">
          <div>
            <div className="lg:w-5/6 xl:w-full mx-auto">
              <BarChart TrendData={trendData} grade={grade} year={year} />
            </div>
          </div>
          <div>
            <div className="lg:w-5/6 xl:w-full mx-auto">
              <BarChart100 TrendData={trendData} grade={grade} year={year} />
            </div>
          </div>
        </div>
        <h2 className="text-2xl mb-4">Enrollment Trends by Grade</h2>
        <TableYearGrade
          TrendData={trendData}
          selectedGrade={grade}
          selectedYear={year}
        />
      </>
    );
  }

  return null;
}
