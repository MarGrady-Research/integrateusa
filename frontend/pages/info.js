import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Selection from "../components/Select/Selection";

export default function Info(){

    return(
        <>
        <Head>
        <title>Info</title>
        <meta name="description" content="Demographic Information" />
        <link rel="icon" href="/mg_logo_cropped.png" />
        </Head>
        <Header/>
        <div className="flex flex-col min-h-screen">
        <Selection/>
        <Footer />
        </div>
        </>
    )
}