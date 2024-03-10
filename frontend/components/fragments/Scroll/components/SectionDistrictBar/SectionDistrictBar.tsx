import React from "react";

import DistrictBar from "../DistrictBar";

export default function SectionDistrictBar() {
  return (
    <>
      <p className="mb-3">
        But when we look at District 15 on a school level, White students appear
        to be segregated from non-White students
      </p>
      <p>
        In 2019,{" "}
        <span className="text-whitestudents font-semibold">
          2/3 of White students
        </span>{" "}
        in the district attend just <b>5</b> of the district&#39;s <b>16</b>{" "}
        middle schools
      </p>
      <div className="w-full h-96 mt-6 lg:mt-12">
        <DistrictBar />
      </div>
    </>
  );
}
