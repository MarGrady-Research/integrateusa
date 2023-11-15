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

export default function SegregationPage() {
  const levels = useSelector(selectLevels);
  const year = useSelector(selectYear);
  const grade = useSelector(selectGrade);

  const [segData, setSegData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    let idlevel;

    switch (levels) {
      case 0:
        idlevel = "district";
        break;
      case 1:
        idlevel = "county";
        break;
      case 2:
        idlevel = "state";
        break;
    }

    const url = `http://localhost:8000/api/${idlevel}/?year=${year}&grade=${grade}`;

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
        <Selection getData={getData} isLoading={isLoading} />
        {isLoading ? (
          <div className="pt-5">
            <Loader />
          </div>
        ) : (
          <div className="mx-auto mt-5">
            <Segregation
              segData={segData}
              measure={measure}
              handleMeasure={handleMeasure}
            />
          </div>
        )}
      </Page>
    </>
  );
}
