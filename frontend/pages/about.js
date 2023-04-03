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
                    IntegrateUSA is a project by <a href="http://margrady.com" className="text-blue-800">MarGrady Research</a>, a mission-driven consulting firm specializing in education projects.
                    The project collects, standardizes and visualizes publicly available enrollment data across the US from 2000 to present,
                    providing a demographic overview of School Districts, Counties and States, as well as measures of segregation at each level.

                    It's a really good project.
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
