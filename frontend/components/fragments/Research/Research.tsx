import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import district15Img from "./images/district-15.png";

export default function Research() {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    router.push("/research/district15");
  };

  return (
    <>
      <h1 className="text-3xl lg:text-4xl font-semibold border-b border-primary pb-1 mb-4">
        Research
      </h1>
      <h2 className="text-base lg:text-lg mb-4 lg:mb-10">
        Publications, projects, and other resources appear below.
      </h2>
      <div
        onClick={handleClick}
        className="cursor-pointer group border-2 border-black hover:border-primary hover:bg-slate-50 duration-300 p-5 flex flex-col items-center md:flex-row md:items-start"
      >
        <Image
          src={district15Img}
          style={{ objectFit: "cover" }}
          alt=""
          height={240}
          className="h-60 border border-black group-hover:border-primary"
          placeholder="blur"
          priority
        />
        <div className="mt-4 md:mt-0 md:ml-4">
          <h3 className="text-lg lg:text-xl font-semibold group-hover:text-primary">
            Case Study: Middle School Integration in New York City&#39;s
            District 15
          </h3>
          <h4 className="text-base lg:text-lg font-medium">Jesse Margolis</h4>
          <h4 className="text-base lg:text-lg font-medium mb-2">March 2024</h4>
          <p className="text-base lg:text-lg">
            In 2019, New York City&rsquo;s District 15 implemented an
            integration plan for rising 6<sup>th</sup> graders. The district
            removed all academic screens and gave economically disadvantaged
            students priority for 52% of seats.{" "}
            <a
              href="https://margrady.com/integration/"
              target="_blank"
              rel="noreferer"
              className="text-primary hover:underline underline-offset-4"
              onClick={(e) => e.stopPropagation()}
            >
              Prior research
            </a>{" "}
            has shown that this plan led to a 55% decline in economic
            segregation and a 38% decline in racial segregation in the first
            year. That research used New York state data, which limited
            comparison districts to those in New York. This case study
            replicates a portion of that study using national comparison
            districts selected using IntegrateUSA.
          </p>
        </div>
      </div>
    </>
  );
}
