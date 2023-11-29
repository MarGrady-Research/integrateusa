import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import clsx from "clsx";

import DistrictPie from "../DistrictPie";
import DistrictBar from "../DistrictBar";
import ExposureBar, { ExposureBarStep } from "../ExposureBar";
import IntegrationLine, { IntegrationLineStep } from "../IntegrationLine";

// @ts-ignore
import { step, graphic } from "./Scroller.module.scss";

const charts = (currentStepIndex) => {
  const showDistrictPie = currentStepIndex === 0;
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
  const [currentStepIndex, setCurrentStepIndex] = useState(null);

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  const onStepExit = ({ data, direction }) => {
    data === 0 && direction === "up" ? setCurrentStepIndex(-1) : null;
  };

  return (
    <div className="p-20 flex justify-between">
      <div
        className={clsx(
          "basis-3/4 sticky flex justify-center items-center",
          graphic
        )}
      >
        <div className="w-2/3">{charts(currentStepIndex)}</div>
      </div>
    </div>
  );
}
