import React from "react";

import Head from "../components/fragments/Head";
import Scroller from "../components/Scroll/Scroller";

export default function Home() {
  return (
    <div>
      <div>
        <Head title="IntegrateUSA" desc="Exploring school segregation">
          <link rel="icon" href="/Image Only.png" />
        </Head>
        <Scroller />
      </div>
    </div>
  );
}
