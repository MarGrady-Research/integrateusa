import React from "react";
import clsx from "clsx";

import { yearsData } from "../../../Selection/data";
import { gradesTableData } from "../../data";

export default function TableYearGrade({
  TrendData,
  selectedGrade,
  selectedYear,
}) {
  const tableHeader = (e) => (
    <tr>
      <th scope="col" className="school-ch"></th>
      {e.map((element) => (
        <th scope="col" className="school-th" key={element.value}>
          {element.label}
        </th>
      ))}
    </tr>
  );

  const renderCell = (grade, year) => {
    let content = "-";

    const cells = TrendData.filter((e) => e.year === year && e.grade === grade);

    if (cells.length > 0) {
      content = cells[0]["total"].toLocaleString();
    }

    const isSelectedYear = year === selectedYear;
    const isSelectedGrade = grade === selectedGrade;

    const isSelected = isSelectedGrade || isSelectedYear;

    return (
      <td
        className={clsx({ "school-td": true, "bg-gray-100": isSelected })}
        key={grade}
      >
        {content}
      </td>
    );
  };

  const tableBody = (years, grades) =>
    years.map((year) => (
      <tr key={year.value}>
        <td
          className={clsx({
            "school-ch": true,
            "bg-gray-100": year.value === selectedYear,
          })}
        >
          {year.label}
        </td>
        {grades.map((grade) => renderCell(grade.value, year.value))}
      </tr>
    ));

  return (
    <div className="shadow border border-gray-200 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">{tableHeader(gradesTableData)}</thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableBody(yearsData, gradesTableData)}
        </tbody>
      </table>
    </div>
  );
}
