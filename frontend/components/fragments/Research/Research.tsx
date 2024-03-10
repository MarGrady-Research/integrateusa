import React from "react";
import Image from "next/image";
import Link from "next/link";

import district15Img from "./images/district-15.png";

export default function Research() {
  return (
    <>
      <h1 className="text-3xl lg:text-4xl font-semibold border-b border-primary pb-1 mb-4">
        Research
      </h1>
      <h2 className="text-base lg:text-lg mb-4 lg:mb-10">
        Publications, projects, and other resources appear below.
      </h2>
      <Link
        href="/research/district15"
        className="group border-2 border-black hover:border-primary hover:bg-slate-50 duration-300 p-5 flex flex-col items-center md:flex-row md:items-start"
      >
        <Image
          src={district15Img}
          objectFit="contain"
          alt=""
          height={240}
          style={{ width: "auto" }}
          className="h-40 lg:h-60 border border-black group-hover:border-primary"
          placeholder="blur"
        />
        <div className="mt-4 md:mt-0 md:ml-4">
          <h3 className="text-lg lg:text-xl font-semibold group-hover:text-primary">
            Case Study: Middle School Integration in New York City’s District 15
          </h3>
          <h4 className="text-base lg:text-lg font-medium">Jesse Margolis</h4>
          <h4 className="text-base lg:text-lg font-medium mb-2">March 2024</h4>
          <p className="text-base lg:text-lg">
            Using data from IntegrateUSA, this case study documents the impact
            of a middle school integration plan in District 15 in New York City.
          </p>
        </div>
      </Link>
    </>
  );
}
