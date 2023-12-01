import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Head from "../components/fragments/Head";
import Header from "../components/fragments/Header";
import Selection from "../components/fragments/Selection";
import Page from "../components/layouts/Page";
import Segregation from "../components/fragments/Segregation";

import { restoreInitialState } from "../store/selectSlice";

import {
  defaultGrade,
  defaultYear,
} from "../components/fragments/Selection/data";

import { selectLevel } from "../store/selectSlice";

import { SegData, Level } from "../interfaces";

export default function SegregationPage() {
  const level = useSelector(selectLevel);

  const dispatch = useDispatch();

  const [year, setYear] = useState(defaultYear);
  const [grade, setGrade] = useState(defaultGrade);

  const handleGradeChange = (g: string) => setGrade(g);
  const handleYearChange = (y: number) => setYear(y);

  const [segData, setSegData] = useState([] as SegData);
  const [isLoading, setIsLoading] = useState(true);

  const getData = () => {
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
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (level === Level.School) {
      dispatch(restoreInitialState());
    }

    getData();
  }, []);

  return (
    <>
      <Head title="Segregation" desc="Segregation Metrics">
        <link rel="icon" href="/mg_logo_cropped.png" />
      </Head>
      <Header />
      <Selection
        getData={getData}
        isLoading={isLoading}
        grade={grade}
        year={year}
        handleGradeChange={handleGradeChange}
        handleYearChange={handleYearChange}
        omitSchools
      />
      <Page isLoading={isLoading}>
        <div className="mx-auto mt-5">
          <Segregation segData={segData} year={year} grade={grade} />
        </div>
      </Page>
    </>
  );
}
