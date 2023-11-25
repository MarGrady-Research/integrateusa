import React from "react";
import Link from "next/link";
import Image from "next/image";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import Scroller from "./components/Scroller";

function WelcomeScreen() {
  return (
    <div className="h-screen flex flex-col space-y-20 items-center justify-center text-xl">
      <Link href="/info">
        <Image
          src="/IntegrateUSALogo.png"
          alt="IntegrateUSA Logo"
          width={300}
          height={80}
          className="hover:cursor-pointer"
        />
      </Link>
      <Link href="/info">
        <a className="hover:text-gray-500 inline-flex items-center">
          Explore the dashboard
          <KeyboardDoubleArrowRightIcon className="ml-2" fontSize="large" />
        </a>
      </Link>
      <div className="flex flex-col items-center">
        <p className="mb-4">
          Scroll down for a case study of New York City&#39;s District 15
        </p>
        <KeyboardDoubleArrowDownIcon
          fontSize="large"
          className="animate-bounce"
        />
      </div>
    </div>
  );
}

function EndScreen() {
  return (
    <div className="sticky h-screen flex flex-col py-10 items-center justify-between text-xl">
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
      <Link href="/info">
        <a className="hover:text-gray-500  inline-flex items-center">
          Explore the dashboard
          <KeyboardDoubleArrowRightIcon className="ml-2" fontSize="large" />
        </a>
      </Link>
      <Link href="http://www.margrady.com/">
        <a>
          <Image
            src="/mg-logo.png"
            alt="MarGrady Logo"
            width={350}
            height={80}
          />
        </a>
      </Link>
    </div>
  );
}

export default function Scroll() {
  return (
    <div className="font-sans">
      <WelcomeScreen />
      <Scroller />
      <EndScreen />
    </div>
  );
}
