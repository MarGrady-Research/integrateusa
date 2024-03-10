import React from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import SectionDistrictPie from "./components/SectionDistrictPie";
import SectionDistrictBar from "./components/SectionDistrictBar";
import SectionExposureBar from "./components/SectionExposureBar";
import SectionIntegrationLine from "./components/SectionIntegrationLine";

import MarGradyLogo from "public/MarGradyLogo.png";

import { header, section } from "./Scroll.module.scss";

function EndScreen() {
  return (
    <div className="h-screen flex flex-col py-10 items-center justify-between text-lg lg:text-xl">
      <div className="px-4 text-center">
        <p className="mb-4">
          IntegrateUSA was built to explore segregation in districts, counties
          and states nationwide
        </p>
        <p>
          Use the dashboard to visualize demographics and understand segregation
          levels in different areas over time
        </p>
      </div>
      <Link
        href="/info"
        className="hover:text-primary inline-flex items-center"
      >
        Explore the dashboard
        <KeyboardDoubleArrowRightIcon className="ml-2" fontSize="large" />
      </Link>
      <Link href="https://www.margrady.com/">
        <Image
          src={MarGradyLogo}
          alt="MarGrady Logo"
          width={350}
          style={{ height: "auto", width: "auto" }}
        />
      </Link>
    </div>
  );
}

export default function Scroll() {
  return (
    <>
      <h1
        className={clsx(
          "text-3xl lg:text-4xl font-semibold lg:mb-1 text-center mx-auto",
          header
        )}
      >
        Middle School Integration in New York City’s District 15
      </h1>
      <p className="mb-8 lg:mb-14 text-center">By Jesse Margolis</p>
      <div className={clsx(section, "mx-auto mb-10 lg:mb-20")}>
        <SectionDistrictPie />
      </div>
      <div className={clsx(section, "mx-auto mb-10 lg:mb-20")}>
        <SectionDistrictBar />
      </div>
      <div className={clsx(section, "mx-auto")}>
        <SectionExposureBar />
      </div>
      <div className={clsx(section, "mx-auto")}>
        <SectionIntegrationLine />
      </div>
      <EndScreen />
    </>
  );
}
