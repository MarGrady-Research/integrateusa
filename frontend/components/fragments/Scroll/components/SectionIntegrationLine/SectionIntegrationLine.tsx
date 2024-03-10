import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";

import { useBreakpointRegion } from "hooks";

import Info from "../Info";
import IntegrationLine, { IntegrationLineStep } from "../IntegrationLine";

const SCROLL_OFFSET = 0.65;

const charts = (currentStepIndex: number, onTablet: boolean) => {
  let step: IntegrationLineStep;

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

  return <IntegrationLine step={step} onTablet={onTablet} />;
};

export default function SectionIntegrationLine() {
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
      <p>
        Normalized Exposure rates can help us to understand segregation in the
        district over time.
      </p>
      <div className="relative w-full " style={{ height: "280vh" }}>
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
                    In 2019,{" "}
                    <span className="text-line-selected">
                      <b>District 15</b>
                    </span>{" "}
                    implemented an integration plan
                  </p>
                  <p>
                    After the plan&#39;s implementation, we see a dropoff in
                    Normalized Exposure rates for White students in the District
                  </p>
                </Info>
              </div>
            </Step>
            <Step data={2}>
              <div
                className="w-full flex items-start justify-center"
                style={{ height: "70vh" }}
              >
                <Info>
                  <p className="mb-3">
                    We can compare{" "}
                    <span className="text-line-selected">
                      <b>District 15</b>
                    </span>{" "}
                    to demographically similar districts without integration
                    plans
                  </p>
                  <p>
                    The Normalized Exposure for White students in{" "}
                    <span className="text-line-selected">
                      <b>District 15</b>
                    </span>{" "}
                    shows a steep drop compared to other districts
                  </p>
                </Info>
              </div>
            </Step>
            <Step data={3}>
              <div
                className="w-full flex items-start justify-center"
                style={{ height: "70vh" }}
              >
                <Info>
                  <p className="mb-3">
                    We can also normalize these rates using the 2019 values for
                    each district
                  </p>
                  <p>
                    <span className="text-line-selected">
                      <b>District 15</b>
                    </span>{" "}
                    has the largest drop in White Normalized Exposure rates of
                    any comparable district after 2019
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
