import React from "react";

import Head from "components/fragments/Head";
import Footer from "components/fragments/Footer";

export default function About() {
  return (
    <>
      <Head title="About" desc="About IntegrateUSA" />
      <div className="container mx-auto p-10">
        <h1 className="text-3xl text-center mb-6 text-semibold">About</h1>
        <div className="md:w-4/5 mx-auto text-lg">
          <p className="mb-3">
            IntegrateUSA is a project by{" "}
            <a
              href="http://margrady.com"
              className="text-primary hover:underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              MarGrady Research
            </a>
            , a mission-driven consulting firm specializing in education
            projects. The project collects, standardizes and visualizes publicly
            available enrollment data across the US from 2000 to present,
            providing a demographic overview of school districts, counties, and
            states, as well as measures of segregation at each level.
          </p>
          <p className="mb-3">
            IntegrateUSA is primarily based on data from the National Center for
            Education Statistics&#39;{" "}
            <a
              href="https://nces.ed.gov/ccd/"
              className="text-primary hover:underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              Common Core of Data
            </a>
            . The data have been cleaned to standardize school codes and names
            over time and exclude correctional facilities, district offices,
            hospital/homebound students, and schools that have fewer than 25
            students in all years. Charter schools have been assigned to local
            school districts based on their geographic location.
          </p>
          <p className="mb-3">
            The dashboard measures segregation using the normalized exposure
            index. This measure compares the average demographics of a school
            for a student of one race or ethnicity within a geographic area
            (e.g. district, county, or state) to the average demographics of a
            school for a student who is not of that race or ethnicty within that
            same geographic area. This measure is adapted from a measure
            described by researchers from the University of Southern California
            and Stanford as part of the{" "}
            <a
              href="https://socialinnovation.usc.edu/segregation/"
              className="text-primary hover:underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              Segregation Index project
            </a>
            .
          </p>
          <p className="mb-3">
            We would like to thank the Carnegie Corporation of New York for its
            support in making this project possible.
          </p>
          <p className="mb-3">
            If you have any questions, please contact MarGrady Research at{" "}
            <a
              href="mailto:integrateusa@margrady.com"
              className="text-primary hover:underline underline-offset-4"
            >
              integrateusa@margrady.com
            </a>
            .
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
