import React from "react";

import DistrictPie from "../DistrictPie";

export default function SectionDistrictPie() {
  return (
    <>
      <p>
        In 2018-19, New York City&rsquo;s School District 15 was a racially
        diverse district.
      </p>
      <p className="mb-3">
        The 6<sup>th</sup> graders in the district were:
      </p>
      <div className="w-fit mx-auto">
        <div className="flex items-center">
          <div className="background-hispanic w-4 h-4 mr-1" />
          <p className="font-semibold">41% Hispanic</p>
        </div>
        <div className="flex items-center">
          <div className="background-whitestudents w-4 h-4 mr-1" />
          <p className="font-semibold">30% White</p>
        </div>
        <div className="flex items-center">
          <div className="background-asian w-4 h-4 mr-1" />
          <p className="font-semibold">13% Asian</p>
        </div>
        <div className="flex items-center">
          <div className="background-blackstudents w-4 h-4 mr-1" />
          <p className="font-semibold">13% Black</p>
        </div>
        <div className="flex items-center">
          <div className="background-other w-4 h-4 mr-1" />
          <p className="font-semibold">4% Other Races</p>
        </div>
      </div>
      <div className="w-full h-96 mt-6 lg:mt-12">
        <DistrictPie />
      </div>
    </>
  );
}
