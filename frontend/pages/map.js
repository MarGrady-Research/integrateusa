import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer" ;
import DemographicMap from "../components/Map/DemographicMap";

export default function Map(){
    return(
        <>
        <Header />
        <div className="flex flex-col min-h-screen">
        <div className="flex justify-center py-10">
        <DemographicMap/>
        </div>
        <Footer />
        </div>
        
        </>
        
    )
}