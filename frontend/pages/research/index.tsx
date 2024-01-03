import React from "react";

import Head from "../../components/fragments/Head";
import Header from "../../components/fragments/Header";
import Research from "../../components/fragments/Research";
import Page from "../../components/layouts/Page";

export default function Home() {
  return (
    <>
      <Head title="IntegrateUSA" desc="Research" />
      <Header />
      <Page>
        <Research />
      </Page>
    </>
  );
}
