import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";

import { useBreakpoint } from "hooks";

import Section from "../Section";
import Info from "../Info";
import ExposureBar, { ExposureBarStep } from "../ExposureBar";

const SCROLL_OFFSET = 0.85;

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

  const breakpoint = useBreakpoint();
  const onTablet =
    breakpoint === "xs" || breakpoint === "sm" || breakpoint === "md";

  return (
    <Section>
      <div className="relative w-full" style={{ height: "200vh" }}>
        <div className="h-screen w-full top-0 flex justify-center items-center sticky">
          <div className="w-full md:w-2/3 lg:w-1/2 h-96">
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
              <div className="h-screen w-full flex items-start justify-center">
                <Info>
                  <p className="mb-3">
                    One way to measure segregation is using{" "}
                    <b>Normalized Exposure</b> rates
                  </p>
                  <p>
                    For example, we can compare the share of{" "}
                    <span className="text-whitestudents">White</span> students
                    in the average{" "}
                    <span className="text-whitestudents">White</span>{" "}
                    student&#39;s school to the share of{" "}
                    <span className="text-whitestudents">White</span> students
                    in the average non-
                    <span className="text-whitestudents">White</span>{" "}
                    student&#39;s school
                  </p>
                </Info>
              </div>
            </Step>
            <Step data={1}>
              <div className="h-screen w-full flex items-start justify-center">
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
    </Section>
  );
}
