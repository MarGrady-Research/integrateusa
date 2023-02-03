import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Selection from "../components/Select/Selection";

export default function Info(){
    return(
        <>
        <Header/>
        <div className="flex flex-col min-h-screen font-raleway">
        <Selection/>
        </div>
        </>
    )
}