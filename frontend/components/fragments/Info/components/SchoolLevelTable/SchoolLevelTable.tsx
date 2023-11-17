import React from "react";

export default function SchoolLevelTable({ schoolLevel }) {
  const tableRows = (schooltype) => {
    return (
      <tr key={schooltype} className="border-b">
        <td className="school-td">{schooltype}</td>
        <td className="school-td">{schoolLevel[schooltype].length}</td>
        <td className="school-td">
          {Math.round(
            (schoolLevel[schooltype].length / schoolLevel.Total.all_schools) *
              100
          )}
        </td>
        <td className="school-td">
          {schoolLevel[schooltype]
            .map((e) => e.tot_enr)
            .reduce((a, b) => a + b, 0)
            .toLocaleString()}
        </td>
        <td className="school-td">
          {Math.round(
            (schoolLevel[schooltype]
              .map((e) => e.tot_enr)
              .reduce((a, b) => a + b, 0) /
              schoolLevel.Total.all_students) *
              100
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="shadow overflow-x-auto border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th scope="col" className="school-th">
              School Type
            </th>
            <th scope="col" className="school-th">
              # of Schools
            </th>
            <th scope="col" className="school-th">
              % of Schools
            </th>
            <th scope="col" className="school-th">
              # of Students
            </th>
            <th scope="col" className="school-th">
              % of Students
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {tableRows("ES")}
          {tableRows("ESMS")}
          {tableRows("MS")}
          {tableRows("MSHS")}
          {tableRows("HS")}
          {tableRows("K12")}
          {tableRows("Other")}
        </tbody>

        <tfoot className="border-b">
          <tr>
            <td scope="col" className="school-td font-medium py-4">
              Total
            </td>
            <td scope="col" className="school-td font-medium py-4">
              {schoolLevel.Total.all_schools.toLocaleString()}
            </td>
            <td scope="col" className="school-td font-medium py-4">
              100
            </td>
            <td scope="col" className="school-td font-medium py-4">
              {schoolLevel.Total.all_students.toLocaleString()}
            </td>
            <td scope="col" className="school-td font-medium py-4">
              100
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
