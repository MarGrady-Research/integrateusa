import React from "react";
import Image from "next/image";
import Link from "next/link";

import district15Img from "./images/district-15.png";

export default function Research() {
  return (
    <>
      <h1 className="text-2xl text-secondary font-semibold border-b border-primary pb-1 mb-6">
        Research
      </h1>
      <h2 className="text-lg mb-10">
        Publications, projects, and other resources appear below.
      </h2>
      <div className="bg-gray-100 p-5 flex flex-col items-center md:flex-row md:items-start">
        <Image src={district15Img} objectFit="contain" alt="" />
        <div className="mt-4 md:mt-0 md:ml-4">
          <h3 className="font-semibold mb-2">
            <Link href="/research/district15" className="hover:text-primary">
              A case study of New York City&#39;s District 15
            </Link>
          </h3>
          <h4 className="text-secondary mb-2">Jesse Margolis</h4>
          <h4 className="text-secondary mb-2">Mar 2024</h4>
          <p>
            This study, commissioned by the Carnegie Corporation of New York,
            provides a comprehensive review of District 15.{" "}
            <Link
              href="/research/district15"
              className="text-primary hover:text-secondary"
            >
              Read the full report.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
