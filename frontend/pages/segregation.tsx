import React, { useState } from "react";

import Head from "../components/fragments/Head";
import Header from "../components/fragments/Header";
import Selection from "../components/fragments/Selection";
import Page from "../components/layouts/Page";

export default function Segregation() {
  // Measure state variable and handleMeasure function to pass to Accordion
  const [measure, setMeasure] = useState({});
  const handleMeasure = (e) => setMeasure(e);

  return (
    <>
      <Head title="Segregation" desc="Segregation Metrics">
        <link rel="icon" href="/mg_logo_cropped.png" />
      </Head>
      <Header />
      <Page>
        <Selection />
      </Page>
    </>
  );
}
