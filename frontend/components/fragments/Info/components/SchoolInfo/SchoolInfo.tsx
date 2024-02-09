import React from "react";

import { InfoData } from "interfaces";

interface Props {
  infoData: InfoData;
}

export default function SchoolInfo({ infoData }: Props) {
  if (infoData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full shadow border border-gray-200">
        No data available
      </div>
    );
  }

  const {
    dist_name,
    sch_name,
    state_abb,
    level,
    asian,
    black,
    hispanic,
    white,
    other,
  } = infoData[0];

  const tot_enr = asian + black + hispanic + white + other;

  return (
    <div className="h-full shadow border border-gray-200 px-4 py-3">
      <p>
        <b>Name:</b> {sch_name}
      </p>
      <p>
        <b>District:</b> {dist_name}
      </p>
      <p>
        <b>Level:</b> {level}
      </p>
      <p>
        <b>Enrollment:</b> {tot_enr}
      </p>
      <p>
        <b>State:</b> {state_abb}
      </p>
    </div>
  );
}
