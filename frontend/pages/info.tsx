import React from "react";

import Head from "../components/fragments/Head";
import Header from "../components/Header";
import Selection from "../components/Select/Selection";

export default function Info() {
  return (
    <>
      <Head title="Info" desc="Demographic Information">
        <link rel="icon" href="/mg_logo_cropped.png" />
      </Head>
      <Header />
      <div className="relative flex flex-col font-raleway">
        <Selection />
      </div>
    </>
  );
}
