import React from "react";
import Head from 'next/head';
import Header from "../components/Header";
import Footer from "../components/Footer" ;
import DemographicMap from "../components/Map/DemographicMap";

export default function Map(){
    return(
        <>
        <Head>
        <title>Info</title>
        <meta name="description" content="Mapping segregation" />
        <link rel="icon" href="/mg_logo_cropped.png" />
        </Head>
        <Header />
        <div className="flex flex-col min-h-screen">
        <div className="flex justify-center">
        <DemographicMap/>
        </div>
        <Footer />
        </div>
        
        </>
        
    )
}