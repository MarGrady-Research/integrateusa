import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Head from "../components/fragments/Head";
import Header from "../components/fragments/Header";
import Selection from "../components/fragments/Selection";
import Page from "../components/layouts/Page";
import Segregation from "../components/fragments/Segregation";
import {
  selectYear,
  selectGrade,
  selectLevel,
  restoreInitialState,
} from "../store/selectSlice";
import { SegData, Level } from "../interfaces";

export default function SegregationPage() {
  const dispatch = useDispatch();

  const level = useSelector(selectLevel);
  const year = useSelector(selectYear);
  const grade = useSelector(selectGrade);

  const [segData, setSegData] = useState([] as SegData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (level === Level.School) {
      dispatch(restoreInitialState());
    }

    const abortController = new AbortController();

    let idlevel;

    switch (level) {
      case Level.School:
      case Level.District:
        idlevel = "district";
        break;
      case Level.County:
        idlevel = "county";
        break;
      case Level.State:
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
      .catch((error) => {
        if (error.name !== "CanceledError") {
          setIsLoading(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [level, year, grade]);

  return (
    <>
      <Head title="Segregation" desc="Segregation Metrics">
        <link rel="icon" href="/mg_logo_cropped.png" />
      </Head>
      <Header />
      <Selection omitSchools />
      <Page isLoading={isLoading}>
        <div className="mx-auto mt-5">
          <Segregation segData={segData} year={year} />
        </div>
      </Page>
    </>
  );
}
