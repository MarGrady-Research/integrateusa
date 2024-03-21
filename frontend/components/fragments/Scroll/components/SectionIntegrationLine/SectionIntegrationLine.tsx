import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Scrollama, Step } from "react-scrollama";

import { useBreakpointRegion } from "hooks";

import Info from "../Info";
import IntegrationLine, { IntegrationLineStep } from "../IntegrationLine";

import { holder } from "./SectionIntegrationLine.module.scss";

const SCROLL_OFFSET = 0.8;

const charts = (currentStepIndex: number) => {
  let step: IntegrationLineStep = IntegrationLineStep.StepOne;

  switch (currentStepIndex) {
    case -1:
    case 0:
      step = IntegrationLineStep.StepOne;
      break;
    case 1:
      step = IntegrationLineStep.StepTwo;
      break;
    case 2:
      step = IntegrationLineStep.StepThree;
      break;
    case 3:
      step = IntegrationLineStep.StepFour;
      break;
  }

  return <IntegrationLine step={step} />;
};

export default function SectionIntegrationLine() {
  const ref = useRef<HTMLDivElement>(null);

  const breakpointRegion = useBreakpointRegion();

  const onMobile =
    breakpointRegion === "xs" ||
    breakpointRegion === "sm" ||
    breakpointRegion === "md";

  const [margin, setMargin] = useState(0);

  const modifyMargin = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const windowHeight = window.innerHeight;
    const chartHeight = ref.current.clientHeight;

    const offset = onMobile ? 12 : 24;

    const excess = (windowHeight - chartHeight) / 2 - offset;

    setMargin(-excess);
  }, [onMobile]);

  useEffect(() => {
    modifyMargin();
  }, [modifyMargin]);

  useEffect(() => {
    const handleWindowResize = () => {
      modifyMargin();
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [modifyMargin]);

  const [currentStepIndex, setCurrentStepIndex] = useState(-1);

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  const onStepExit = ({ data, direction }) => {
    data === 0 && direction === "up" ? setCurrentStepIndex(-1) : null;
  };

  return (
    <>
      <p>
        Normalized Exposure rates can help us to understand segregation in the
        district over time.
      </p>
      <div className={clsx("relative w-full", holder)}>
        <div
          className="w-full h-screen top-0 flex justify-center items-center sticky"
          style={{ marginTop: margin, marginBottom: margin }}
        >
          <div className="w-full h-full max-h-96 mt-6 lg:mt-12" ref={ref}>
            {charts(currentStepIndex, onMobile)}
          </div>
        </div>
        <div className="absolute top-0 w-full pointer-events-none">
          <Scrollama
            onStepEnter={onStepEnter}
            onStepExit={onStepExit}
            offset={SCROLL_OFFSET}
          >
            <Step data={0}>
              <div className="w-full h-screen" />
            </Step>
            <Step data={1}>
              <div className="w-full flex items-start justify-center h-screen">
                <Info>
                  <p className="mb-3">
                    In 2019,{" "}
                    <span className="text-line-selected">
                      <b>District 15</b>
                    </span>{" "}
                    implemented an integration plan.
                  </p>
                  <p>
                    After the plan&#39;s implementation, we see a decline in
                    normalized exposure rates for White students in the
                    district.
                  </p>
                </Info>
              </div>
            </Step>
            <Step data={2}>
              <div className="w-full flex items-start justify-center h-screen">
                <Info>
                  <p className="mb-3">
                    Using IntegrateUSA.org, we can find comparison districts
                    that are demographically similar to{" "}
                    <span className="text-line-selected">
                      <b>District 15</b>
                    </span>{" "}
                    and have a similar baseline level of segregation. The graph
                    includes all districts with at least 10 schools that had
                    between 20% and 40% White students, 10% or more Black
                    students, 10% or more Hispanic students, and a 2018-19
                    normalized exposure index for White students within 3 points
                    of{" "}
                    <span className="text-line-selected">
                      <b>District 15</b>
                    </span>
                    .
                  </p>
                  <p>
                    The normalized exposure for White students in{" "}
                    <span className="text-line-selected">
                      <b>District 15</b>
                    </span>{" "}
                    shows a steep drop compared to other districts.
                  </p>
                </Info>
              </div>
            </Step>
            <Step data={3}>
              <div className="w-full flex items-start justify-center h-screen">
                <Info>
                  <p>
                    Normalizing these rates using the 2018-2019 values for each
                    district shows that{" "}
                    <span className="text-line-selected">
                      <b>District 15</b>
                    </span>{" "}
                    had the largest decline in segregation of any comparable
                    district in the years following the implementation of the
                    integration plan.
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
