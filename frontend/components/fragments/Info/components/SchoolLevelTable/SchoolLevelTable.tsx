import React from "react";

const getSchoolLevel = (infoData) => {
  const schoolLevel = {
    ES: {
      schools: 0,
      students: 0,
    },
    ESMS: {
      schools: 0,
      students: 0,
    },
    MS: {
      schools: 0,
      students: 0,
    },
    MSHS: {
      schools: 0,
      students: 0,
    },
    HS: {
      schools: 0,
      students: 0,
    },
    K12: {
      schools: 0,
      students: 0,
    },
    Other: {
      schools: 0,
      students: 0,
    },
    Total: {
      schools: 0,
      students: 0,
    },
  };

  for (let school of infoData) {
    schoolLevel.Total.schools += 1;
    schoolLevel.Total.students += school.tot_enr;

    schoolLevel[school.level].schools += 1;
    schoolLevel[school.level].students += school.tot_enr;
  }

  return schoolLevel;
};

export default function SchoolLevelTable({ infoData }) {
  const schoolLevel = getSchoolLevel(infoData);

  const totalSchools = schoolLevel.Total.schools;
  const totalStudents = schoolLevel.Total.students;

  const tableRows = (schooltype) => {
    const noOfSchools = schoolLevel[schooltype].schools;
    const noOfStudents = schoolLevel[schooltype].students;

    const percentageOfSchools = Math.round((noOfSchools / totalSchools) * 100);
    const percentageOfStudents = Math.round(
      (noOfStudents / totalStudents) * 100
    );

    const noOfSchoolsString = noOfSchools.toLocaleString();
    const noOfStudentsString = noOfStudents.toLocaleString();

    return (
      <tr key={schooltype} className="border-b">
        <td className="school-td">{schooltype}</td>
        <td className="school-td">{noOfSchoolsString}</td>
        <td className="school-td">{percentageOfSchools}</td>
        <td className="school-td">{noOfStudentsString}</td>
        <td className="school-td">{percentageOfStudents}</td>
      </tr>
    );
  };

  const totalSchoolsString = totalSchools.toLocaleString();
  const totalStudentsString = totalStudents.toLocaleString();

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
              {totalSchoolsString}
            </td>
            <td scope="col" className="school-td font-medium py-4">
              100
            </td>
            <td scope="col" className="school-td font-medium py-4">
              {totalStudentsString}
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
