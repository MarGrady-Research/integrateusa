import React, { useState } from "react";
import clsx from "clsx";
import { Scrollama, Step } from "react-scrollama";

import { useBreakpointRegion } from "hooks";

import Info from "../Info";
import ExposureBar, { ExposureBarStep } from "../ExposureBar";

import { holder, section } from "./SectionExposureBar.module.scss";

const charts = (currentStepIndex: number) => {
  const step: ExposureBarStep =
    currentStepIndex === 0 || currentStepIndex === -1
      ? ExposureBarStep.StepOne
      : ExposureBarStep.StepTwo;

  return <ExposureBar step={step} />;
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

  const onMobile = breakpointRegion === "xs" || breakpointRegion === "sm";

  const SCROLL_OFFSET = onMobile ? 0.8 : 0.7;

  return (
    <>
      <p className="mb-3">
        One way to measure segregation is using <b>Normalized Exposure</b>{" "}
        rates.
      </p>
      <p>
        For example, we can compare the share of{" "}
        <span className="decoration-whitestudents decoration-2 underline underline-offset-4 font-semibold">
          White
        </span>{" "}
        students in the average{" "}
        <span className="decoration-whitestudents decoration-2 underline underline-offset-4 font-semibold">
          White
        </span>{" "}
        student&#39;s school to the share of{" "}
        <span className="decoration-whitestudents decoration-2 underline underline-offset-4 font-semibold">
          White
        </span>{" "}
        students in the average non-
        <span className="decoration-whitestudents decoration-2 underline underline-offset-4 font-semibold">
          White
        </span>{" "}
        student&#39;s school.
      </p>
      <div className={clsx("relative w-full", holder)}>
        <div
          className={clsx(
            "w-full top-0 flex justify-center items-start sticky",
            section
          )}
        >
          <div className="w-full h-full max-h-96 mt-12">
            {charts(currentStepIndex)}
          </div>
        </div>
        <div className="absolute top-0 w-full pointer-events-none">
          <Scrollama
            onStepEnter={onStepEnter}
            onStepExit={onStepExit}
            offset={SCROLL_OFFSET}
          >
            <Step data={0}>
              <div className={clsx("w-full", section)} />
            </Step>
            <Step data={1}>
              <div
                className={clsx(
                  "w-full flex items-start justify-center",
                  section
                )}
              >
                <Info>
                  <p className="mb-3">
                    In District 15 in 2019, the average White student&#39;s
                    school had <b>43%</b> White students
                  </p>
                  <p className="mb-3">
                    The average non-White student&#39;s school had <b>24%</b>{" "}
                    White students
                  </p>
                  <p>
                    The difference of these percentages is the{" "}
                    <b>normalized exposure</b> rate: <b>19%</b>
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
