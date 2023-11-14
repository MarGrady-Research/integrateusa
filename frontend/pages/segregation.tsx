import React from "react";

import Head from "../components/fragments/Head";
import Header from "../components/fragments/Header";
import Selection from "../components/fragments/Selection";
import Page from "../components/layouts/Page";

export default function Segregation() {
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
