import React from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";

export default function About(){
    return(

        <>
        <Head>
        <title>About</title>
        <meta name="description" content="About IntegrateUSA" />
        <link rel="icon" href="/mg_logo_cropped.png" />
        </Head>

        <Header/>
        <div className="flex flex-col justify-center font-raleway">
            
            <div className="container mx-auto p-5 text-center">

            <span className="text-3xl">About</span>
            
            {/* <div className="w-full flex justify-center">
                <Image src="/mg-logo.png" 
                        alt="MarGrady logo"
                        width = {250}
                        height={60}/>
                <Image src="/ccny_logo.svg" 
                        alt="CCNY logo"
                        width = {200}
                        height={60}/>
            </div>  */}
            <div className="justify-center flex">
            <div className="w-4/5 flex pt-5">
                <span className="text-lg text-justify font-raleway pl-5 h-full">
                    IntegrateUSA is a project by <a href="http://margrady.com" className="text-blue-800" target = "_blank" rel="noreferrer">MarGrady Research</a>, a mission-driven consulting firm 
                    specializing in education projects. The project collects, standardizes and visualizes publicly available enrollment data across the US from 
                    2000 to present, providing a demographic overview of school districts, counties, and states, as well as measures of segregation at each level.
                    <br></br>
                    <br></br>
                    IntegrateUSA is primarily based on data from the National Center for Education Statistics&#39; <a href="https://nces.ed.gov/ccd/" 
                    className="text-blue-800" target = "_blank" rel="noreferrer"> Common Core of Data.</a> The data have been cleaned to standardize school codes and names over time and
                    exclude correctional facilities, district offices, hospital/homebound students, and schools that have fewer than 25 students in all years.
                    Charter schools have been assigned to local school districts based on their geographic location.
                    <br></br>
                    <br></br>
                    The dashboard measures segregation using the normalized exposure index. This measure compares the average demographics of a school for a 
                    student of one race or ethnicity within a geographic area (e.g. district, county, or state) to the average demographics of a school for a student  
                    who is not of that race or ethnicty within that same geographic area. This measure is adapted from a measure described by researchers from the
                    University of Southern California and Stanford as part of the <a href="https://socialinnovation.usc.edu/segregation/" className="text-blue-800" 
                     target = "_blank" rel="noreferrer"> Segregation Index project. </a>
                    <br></br>
                    <br></br>
                    We would like to thank the Carnegie Corporation of New York for its support in making this project possible.
                    <br></br>
                    <br></br>
                    If you have any questions, please contact MarGrady Research at integrateusa@margrady.com.
                </span> 
            </div>
            </div>

            </div>

        </div>
        {/* <div className="font-raleway">
            <Header/>
        </div> */}
        </>
    )
}
