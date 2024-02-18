import React from "react";

import DistrictBar from "../DistrictBar";
import Info from "../Info";
import Section from "../Section";

export default function SectionDistrictBar() {
  return (
    <Section>
      <Info>
        <p className="mb-3">
          But when we look at District 15 on a school level, White students
          appear to be segregated from non-White students
        </p>
        <p>
          In 2019,{" "}
          <span className="text-whitestudents font-semibold">
            2/3 of White students
          </span>{" "}
          in the district attend just <b>5</b> of the district&#39;s <b>16</b>{" "}
          middle schools
        </p>
      </Info>
      <div className="w-full md:w-2/3 lg:w-1/2 h-96">
        <DistrictBar />
      </div>
    </Section>
  );
}
