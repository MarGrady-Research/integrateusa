import React from "react";
import Head from 'next/head';
import Footer from "../components/Footer";
import Header from "../components/Header";
import Selection from "../components/Select/Selection";

export default function Segregation() {

    return(
        <>
        <Head>
        <title>Segregation</title>
        <meta name="description" content="Segregation Metrics" />
        <link rel="icon" href="/mg_logo_cropped.png" />
        </Head>
        <Header />
        <div className="relative flex flex-col font-raleway">
        <Selection />
        </div>
        </>
    )
}
