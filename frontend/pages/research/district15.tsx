import React from "react";

import Head from "components/fragments/Head";
import Scroll from "components/fragments/Scroll";
import Page from "components/layouts/Page";

export default function Home() {
  return (
    <>
      <Head title="IntegrateUSA" desc="Exploring school segregation" />
      <Page>
        <Scroll />
      </Page>
    </>
  );
}
