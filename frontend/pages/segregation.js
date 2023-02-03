import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Selection from "../components/Select/Selection";

export default function Segregation() {

    return(
        <>
        <Header />
        <div className="flex flex-col min-h-screen font-raleway">
        <Selection />
        </div>
        </>
    )
}
