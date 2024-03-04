import React from "react";

import Head from "components/fragments/Head";
import Research from "components/fragments/Research";
import Page from "components/layouts/Page";
import Footer from "components/fragments/Footer";

export default function Home() {
  return (
    <>
      <Head title="IntegrateUSA" desc="Research" />
      <Page>
        <Research />
      </Page>
      <Footer />
    </>
  );
}
