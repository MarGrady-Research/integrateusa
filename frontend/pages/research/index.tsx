import React from "react";

import Head from "components/fragments/Head";
import Research from "components/fragments/Research";
import Page from "components/layouts/Page";
import Footer from "components/fragments/Footer";

export default function Home() {
  return (
    <>
      <Head
        title="IntegrateUSA | Research"
        desc="IntegrateUSA is a project by MarGrady Research, a mission-driven consulting firm specializing in education projects."
      />
      <Page>
        <Research />
      </Page>
      <Footer />
    </>
  );
}
