import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Head from "../components/fragments/Head";
import Header from "../components/fragments/Header";
import Selection from "../components/fragments/Selection";
import Info from "../components/fragments/Info";
import Trends from "../components/fragments/Trends";
import Page from "../components/layouts/Page";

import {
  defaultGrade,
  defaultYear,
} from "../components/fragments/Selection/data";

import {
  selectLevel,
  selectId,
  selectSelectedName,
} from "../store/selectSlice";

import { InfoData, TrendData, Level } from "../interfaces";

export default function InfoPage() {
  const level = useSelector(selectLevel);
  const id = useSelector(selectId);
  const title = useSelector(selectSelectedName);

  const [year, setYear] = useState(defaultYear);
  const [grade, setGrade] = useState(defaultGrade);

  const handleGradeChange = (g: string) => setGrade(g);
  const handleYearChange = (y: number) => setYear(y);

  const [infoData, setInfoData] = useState([] as InfoData);
  const [trendData, setTrendData] = useState([] as TrendData);
  const [isLoading, setIsLoading] = useState(true);
  const [infoTitle, setInfoTitle] = useState(title);

  const getData = () => {
    if (year != undefined && grade != undefined && id != undefined) {
      let levelTable;
      let levelId;

      switch (level) {
        case Level.School:
          levelTable = "schools";
          levelId = "nces_id";
          break;
        case Level.District:
          levelTable = "districttrends";
          levelId = "dist_id";
          break;
        case Level.County:
          levelTable = "countytrends";
          levelId = "county_id";
          break;
        case Level.State:
          levelTable = "statetrends";
          levelId = "state_abb";
          break;
      }

      const infoUrl = `/api/schools/?year=${year}&grade=${grade}&${levelId}=${id}`;
      const trendUrl = `/api/${levelTable}/?${levelId}=${id}`;

      setIsLoading(true);

      const infoPromise = axios.get(infoUrl);
      const trendPromise = axios.get(trendUrl);

      Promise.all([infoPromise, trendPromise])
        .then((values) => {
          setInfoData(values[0].data);
          setTrendData(values[1].data);
          setInfoTitle(title);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head title="Info" desc="Demographic Information">
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
      />
      <Page isLoading={isLoading}>
        <div className="mx-auto mt-5">
          <Info infoData={infoData} title={infoTitle} />
          <Trends trendData={trendData} grade={grade} year={year} />
        </div>
      </Page>
    </>
  );
}
