import React from "react";

import Head from "components/fragments/Head";
import Scroll from "components/fragments/Scroll";
import Page from "components/layouts/Page";

export default function Home() {
  return (
    <>
      <Head
        title="Integrate USA | Research | District 15"
        desc="IntegrateUSA is a project by MarGrady Research, a mission-driven consulting firm specializing in education projects."
      />
      <Page>
        <Scroll />
      </Page>
    </>
  );
}
