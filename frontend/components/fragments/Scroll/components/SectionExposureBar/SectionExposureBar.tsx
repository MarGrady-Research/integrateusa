import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";

import { useBreakpointRegion } from "hooks";

import Info from "../Info";
import ExposureBar, { ExposureBarStep } from "../ExposureBar";

const SCROLL_OFFSET = 0.65;

const charts = (currentStepIndex: number, onTablet: boolean) => {
  const step: ExposureBarStep =
    currentStepIndex === 0 || currentStepIndex === -1
      ? ExposureBarStep.StepOne
      : ExposureBarStep.StepTwo;

  return <ExposureBar step={step} onTablet={onTablet} />;
};

export default function SectionExposureBar() {
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  const onStepExit = ({ data, direction }) => {
    data === 0 && direction === "up" ? setCurrentStepIndex(-1) : null;
  };

  const breakpointRegion = useBreakpointRegion();
  const onTablet =
    breakpointRegion === "xs" ||
    breakpointRegion === "sm" ||
    breakpointRegion === "md";

  return (
    <>
      <p className="mb-3">
        One way to measure segregation is using <b>Normalized Exposure</b>{" "}
        rates.
      </p>
      <p>
        For example, we can compare the share of{" "}
        <span className="text-whitestudents">White</span> students in the
        average <span className="text-whitestudents">White</span> student&#39;s
        school to the share of <span className="text-whitestudents">White</span>{" "}
        students in the average non-
        <span className="text-whitestudents">White</span> student&#39;s school.
      </p>
      <div className="relative w-full " style={{ height: "140vh" }}>
        <div
          className="w-full top-0 flex justify-center items-start sticky"
          style={{ height: "70vh" }}
        >
          <div className="w-full h-full max-h-96 mt-6 lg:mt-12">
            {charts(currentStepIndex, onTablet)}
          </div>
        </div>
        <div className="absolute top-0 w-full">
          <Scrollama
            onStepEnter={onStepEnter}
            onStepExit={onStepExit}
            offset={SCROLL_OFFSET}
          >
            <Step data={0}>
              <div className="w-full" style={{ height: "70vh" }} />
            </Step>
            <Step data={1}>
              <div
                className="w-full flex items-start justify-center"
                style={{ height: "70vh" }}
              >
                <Info>
                  <p className="mb-3">
                    In District 15 in 2019, the average White student&#39;s
                    school had <b>42%</b> White students
                  </p>
                  <p className="mb-3">
                    The average non-White student&#39;s school had <b>24%</b>{" "}
                    White students
                  </p>
                  <p>
                    The difference of these shares is the{" "}
                    <b>Normalized Exposure</b> rate: <b>18%</b>
                  </p>
                </Info>
              </div>
            </Step>
          </Scrollama>
        </div>
      </div>
    </>
  );
}
