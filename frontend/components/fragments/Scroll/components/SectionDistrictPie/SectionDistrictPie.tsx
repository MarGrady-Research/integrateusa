import React from "react";

import DistrictPie from "../DistrictPie";
import Info from "../Info";

export default function SectionDistrictPie() {
  return (
    <div className="px-5 md:px-10 py-10 flex flex-col items-center">
      <Info>
        <p className="mb-1 md:mb-3">
          In 2019, New York City&#39;s School District 15 was a racially diverse
          district
        </p>
        <p className="mb-1 mb-3">The 6th graders in the district were:</p>
        <p className="text-hispanic font-semibold">41% Hispanic</p>
        <p className="text-whitestudents font-semibold">30% White</p>
        <p className="text-asian font-semibold">13% Asian</p>
        <p className="text-blackstudents font-semibold">13% Black</p>
        <p className="text-other font-semibold">4% Other Races</p>
      </Info>
      <div className="w-full h-96">
        <DistrictPie />
      </div>
    </div>
  );
}
