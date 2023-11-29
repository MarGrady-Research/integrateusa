import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Head from "../components/fragments/Head";
import Header from "../components/fragments/Header";
import Selection from "../components/fragments/Selection";
import Page from "../components/layouts/Page";
import Loader from "../components/fragments/Loader";
import Segregation from "../components/fragments/Segregation";
import { selectYear, selectGrade, selectLevels } from "../store/selectSlice";
import { SegData } from "../interfaces";

export default function SegregationPage() {
  const levels = useSelector(selectLevels);
  const year = useSelector(selectYear);
  const grade = useSelector(selectGrade);

  const [segData, setSegData] = useState([] as SegData);
  const [isLoading, setIsLoading] = useState(true);

  const getData = () => {
    let idlevel;

    switch (levels) {
      case 1:
        idlevel = "district";
        break;
      case 2:
        idlevel = "county";
        break;
      case 3:
        idlevel = "state";
        break;
    }

    const url = `/api/${idlevel}/?year=${year}&grade=${grade}`;

    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setSegData(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head title="Segregation" desc="Segregation Metrics">
        <link rel="icon" href="/mg_logo_cropped.png" />
      </Head>
      <Header />
      <Selection getData={getData} isLoading={isLoading} />
      <Page>
        {isLoading ? (
          <div className="pt-5">
            <Loader />
          </div>
        ) : (
          <div className="mx-auto mt-5">
            <Segregation segData={segData} year={year} />
          </div>
        )}
      </Page>
    </>
  );
}
