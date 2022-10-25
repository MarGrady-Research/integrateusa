import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer" ;
import Selection from "../components/Selection";
import DemographicMap from "../components/Map/DemographicMap";

export default function Map(){
    return(
        <>
        <Header />
        <div className="flex flex-col min-h-screen">
        {/* <Selection /> */}
        <div className="flex justify-center pt-5 pb-10">
        <DemographicMap/>
        </div>
        <Footer />
        </div>
        
        </>
        
    )
}