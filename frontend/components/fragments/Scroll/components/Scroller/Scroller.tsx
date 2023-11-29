import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { Scrollama, Step } from "react-scrollama";

import DistrictPie from "../DistrictPie";
import DistrictBar from "../DistrictBar";
import ExposureBar, { ExposureBarStep } from "../ExposureBar";
import IntegrationLine, { IntegrationLineStep } from "../IntegrationLine";

import { useDevice } from "../../../../../hooks";

// @ts-ignore
import { step, graphic } from "./Scroller.module.scss";

const charts = (currentStepIndex) => {
  const showDistrictPie = currentStepIndex === 0 || currentStepIndex === -1;
  const showDistrictBar = currentStepIndex === 1;
  const showExposureBar = currentStepIndex === 2 || currentStepIndex === 3;
  const showIntegrationLine =
    currentStepIndex === 4 ||
    currentStepIndex === 5 ||
    currentStepIndex === 6 ||
    currentStepIndex === 7;

  if (showDistrictPie) {
    return <DistrictPie />;
  }
  if (showDistrictBar) {
    return <DistrictBar />;
  }
  if (showExposureBar) {
    const step =
      currentStepIndex === 2
        ? ExposureBarStep.StepOne
        : ExposureBarStep.StepTwo;

    return <ExposureBar step={step} />;
  }
  if (showIntegrationLine) {
    let step;

    switch (currentStepIndex) {
      case 4:
        step = IntegrationLineStep.StepOne;
        break;
      case 5:
        step = IntegrationLineStep.StepTwo;
        break;
      case 6:
        step = IntegrationLineStep.StepThree;
        break;
      case 7:
        step = IntegrationLineStep.StepFour;
        break;
    }

    return <IntegrationLine step={step} />;
  }
};

export default function Scroller() {
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  const onStepExit = ({ data, direction }) => {
    data === 0 && direction === "up" ? setCurrentStepIndex(-1) : null;
  };

  const device = useDevice();
  const scrollOffset = device === "Tablet" ? 0.85 : 0.5;

  return (
    <div className="px-3 sm:px-5 md:px-10 lg:px-15 xl:px-20 flex flex-col md:flex-row">
      <div className="basis-1/3 text-center text-sm md:text-base lg:text-lg xl:text-xl order-last md:order-first z-50">
        <Scrollama
          offset={scrollOffset}
          onStepEnter={onStepEnter}
          onStepExit={onStepExit}
        >
          <Step data={0}>
            <div className={step}>
              <div>
                <p className="mb-1 md:mb-3">
                  In 2019, New York City&#39;s School District 15 was a racially
                  diverse district
                </p>
                <p className="mb-1 mb-3">
                  The 6th graders in the district were:
                </p>
                <p className="text-hispanic font-semibold">41% Hispanic</p>
                <p className="text-whitestudents font-semibold">30% White</p>
                <p className="text-asian font-semibold">13% Asian</p>
                <p className="text-blackstudents font-semibold">13% Black</p>
                <p className="text-other font-semibold">4% Other Races</p>
              </div>
            </div>
          </Step>
          <Step data={1}>
            <div className={step}>
              <div>
                <p className="mb-3">
                  But when we look at District 15 on a school level, White
                  students appear to be segregated from non-White students
                </p>
                <p>
                  In 2019,{" "}
                  <span className="text-whitestudents font-semibold">
                    2/3 of White students
                  </span>{" "}
                  in the district attend just <b>5</b> of the district&#39;s{" "}
                  <b>16</b> middle schools
                </p>
              </div>
            </div>
          </Step>
          <Step data={2}>
            <div className={step}>
              <div>
                <p className="mb-3">
                  One way to measure segregation is using{" "}
                  <b>Normalized Exposure</b> rates
                </p>
                <p>
                  For example, we can compare the share of{" "}
                  <span className="text-whitestudents">White</span> students in
                  the average <span className="text-whitestudents">White</span>{" "}
                  student&#39;s school to the share of{" "}
                  <span className="text-whitestudents">White</span> students in
                  the average non-
                  <span className="text-whitestudents">White</span>{" "}
                  student&#39;s school
                </p>
              </div>
            </div>
          </Step>
          <Step data={3}>
            <div className={step}>
              <div>
                <p className="mb-3">
                  In District 15 in 2019, the average White student&#39;s school
                  had <b>42%</b> White students
                </p>
                <p className="mb-3">
                  The average non-White student&#39;s school had <b>24%</b>{" "}
                  White students
                </p>
                <p>
                  The difference of these shares is the{" "}
                  <b>Normalized Exposure</b> rate: <b>18%</b>
                </p>
              </div>
            </div>
          </Step>
          <Step data={4}>
            <div className={step}>
              <div>
                <p>
                  Normalized Exposure rates can help us to understand
                  segregation in the district over time
                </p>
              </div>
            </div>
          </Step>
          <Step data={5}>
            <div className={step}>
              <div>
                <p className="mb-3">
                  In 2019,{" "}
                  <span className="text-line-red">
                    <b>District 15</b>
                  </span>{" "}
                  implemented an integration plan
                </p>
                <p>
                  After the plan&#39;s implementation, we see a dropoff in
                  Normalized Exposure rates for White students in the District
                </p>
              </div>
            </div>
          </Step>
          <Step data={6}>
            <div className={step}>
              <div>
                <p className="mb-3">
                  We can compare{" "}
                  <span className="text-line-red">
                    <b>District 15</b>
                  </span>{" "}
                  to demographically similar districts without integration plans
                </p>
                <p>
                  The Normalized Exposure for White students in{" "}
                  <span className="text-line-red">
                    <b>District 15</b>
                  </span>{" "}
                  shows a steep drop compared to other districts
                </p>
              </div>
            </div>
          </Step>
          <Step data={7}>
            <div className={step}>
              <div>
                <p className="mb-3">
                  We can also normalize these rates using the 2019 values for
                  each district
                </p>
                <p>
                  <span className="text-line-red">
                    <b>District 15</b>
                  </span>{" "}
                  has the largest drop in White Normalized Exposure rates of any
                  comparable district after 2019
                </p>
              </div>
            </div>
          </Step>
        </Scrollama>
      </div>
      <div className={graphic}>
        <div className="w-full lg:w-3/4 xl:w-2/3 pl-0 md:pl-10 lg:p-0 h-1/2 md:h-3/5">
          {charts(currentStepIndex)}
        </div>
      </div>
    </div>
  );
}
