import React from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

import SectionDistrictPie from "./components/SectionDistrictPie";
import SectionDistrictBar from "./components/SectionDistrictBar";
import SectionExposureBar from "./components/SectionExposureBar";
import SectionIntegrationLine from "./components/SectionIntegrationLine";

import IntegrateUSALogo from "public/IntegrateUSALogo.png";

import { header, section } from "./Scroll.module.scss";

function EndScreen() {
  return (
    <div className="flex flex-col items-center text-lg lg:text-xl">
      <div className="px-4 text-center mb-4">
        <p className="mb-4">
          IntegrateUSA was built to explore segregation in districts, counties
          and states nationwide.
        </p>
        <p>
          Use the dashboard to visualize demographics and understand segregation
          in different areas over time.
        </p>
      </div>
      <Link href="/" className="hover:text-primary inline-flex items-center">
        <Image
          src={IntegrateUSALogo}
          alt="IntegrateUSA logo"
          width={250}
          priority
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
        Middle School Integration in New York City&#39;s District 15
      </h1>
      <p className="mb-8 lg:mb-14 text-center">By Jesse Margolis</p>
      <div
        className={clsx(section, "mx-auto mb-10 lg:mb-20 text-lg lg:text-xl")}
      >
        <SectionDistrictPie />
      </div>
      <div
        className={clsx(section, "mx-auto mb-10 lg:mb-20 text-lg lg:text-xl")}
      >
        <SectionDistrictBar />
      </div>
      <div className={clsx(section, "mx-auto text-lg lg:text-xl")}>
        <SectionExposureBar />
      </div>
      <div className={clsx(section, "mx-auto text-lg lg:text-xl")}>
        <SectionIntegrationLine />
      </div>
      <EndScreen />
    </>
  );
}
