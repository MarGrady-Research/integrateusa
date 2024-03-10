import React from "react";

import DistrictPie from "../DistrictPie";

export default function SectionDistrictPie() {
  return (
    <>
      <p>
        In 2019, New York City&#39;s School District 15 was a racially diverse
        district.
      </p>
      <p className="mb-3">The 6th graders in the district were:</p>
      <p className="text-hispanic font-semibold text-center">41% Hispanic</p>
      <p className="text-whitestudents font-semibold text-center">30% White</p>
      <p className="text-asian font-semibold text-center">13% Asian</p>
      <p className="text-blackstudents font-semibold text-center">13% Black</p>
      <p className="text-other font-semibold text-center">4% Other Races</p>
      <div className="w-full h-96 mt-12">
        <DistrictPie />
      </div>
    </>
  );
}
