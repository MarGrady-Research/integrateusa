// JLM This is copied from the GradeLines.js and SchoolLevelTable.js

import React, { useRef, useState, useEffect } from "react";
import { years } from "../Select/SelectOptions.js";
import { gradesTable } from "../Select/SelectOptions.js";

export default function TableYearGrade({ TrendData }) {
  /* tableHeader: function to create header row across the top of the table */
  const tableHeader = (e) => (
    <tr>
      <th scope="col" className="school-ch"></th>
      {e.map((element) => (
        <th scope="col" className="school-th" key={element.value}>
          {" "}
          {element.label}{" "}
        </th>
      ))}
    </tr>
  );

  /* tableBody: function to create rows and columns for body of table */
  const tableBody = (e, f) =>
    e.map((elementRow) => (
      <tr key={elementRow.value}>
        <td className="school-ch"> {elementRow.label} </td>
        {f.map((elementCol) => (
          <td className="school-td" key={elementCol.value}>
            {" "}
            {TrendData.filter(
              (e) =>
                (e.year === elementRow.value) & (e.grade === elementCol.value)
            )[0]
              ? TrendData.filter(
                  (e) =>
                    (e.year === elementRow.value) &
                    (e.grade === elementCol.value)
                )[0]["total"].toLocaleString()
              : "-"}
          </td>
        ))}
      </tr>
    ));
  /* return statement, which calls the functions */
  return (
    <div className="mt-2 container flex flex-col">
      <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-2 lg:-mx-4">
        <div className="py-2 align -middle inline-block min-w-full">
          <div className="shadow overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                  {tableHeader(gradesTable)}
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {tableBody(years, gradesTable)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
