import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Selection from "../components/Selection";

export default function Info(){
    return(
        <>
        <Header/>
        <div className="flex flex-col min-h-screen">
        <Selection/>
        <Footer />
        </div>
        </>
    )
}