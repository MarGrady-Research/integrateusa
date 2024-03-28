import React from "react";

import DistrictBar from "../DistrictBar";

export default function SectionDistrictBar() {
  return (
    <>
      <p className="mb-3">
        But when we look at District 15 on a school level, the distribution of
        students across the district&rsquo;s 16 middle schools appears to be
        uneven. For example,{" "}
        <span className="decoration-whitestudents decoration-2 underline underline-offset-4 font-semibold">
          White
        </span>{" "}
        students appear to be somewhat segregated from non-
        <span className="decoration-whitestudents decoration-2 underline underline-offset-4 font-semibold">
          White
        </span>{" "}
        students.
      </p>
      <p>
        In 2018-19,{" "}
        <span className="decoration-whitestudents decoration-2 underline underline-offset-4 font-semibold">
          White
        </span>{" "}
        students made up more than <b>50%</b> of the population at three schools
        and less than <b>5%</b> of the population at four other schools.
      </p>
      <div className="w-full h-96 mt-6 lg:mt-12">
        <DistrictBar />
      </div>
    </>
  );
}
