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
  selectYear,
  selectGrade,
  selectLevel,
  selectId,
  selectSelectedName,
} from "../store/selectSlice";

import { InfoData, TrendData, Level } from "../interfaces";

export default function InfoPage() {
  const level = useSelector(selectLevel);
  const year = useSelector(selectYear);
  const grade = useSelector(selectGrade);
  const id = useSelector(selectId);
  const title = useSelector(selectSelectedName);

  const [infoData, setInfoData] = useState([] as InfoData);
  const [trendData, setTrendData] = useState([] as TrendData);
  const [isInfoDataLoading, setIsInfoDataLoading] = useState(true);
  const [isTrendDataLoading, setIsTrendDataLoading] = useState(true);

  useEffect(() => {
    let active = true;

    let levelId = "";

    switch (level) {
      case Level.School:
        levelId = "nces_id";
        break;
      case Level.District:
        levelId = "dist_id";
        break;
      case Level.County:
        levelId = "county_id";
        break;
      case Level.State:
        levelId = "state_abb";
        break;
    }

    const infoUrl = `/api/schools/?year=${year}&grade=${grade}&${levelId}=${id}`;

    setIsInfoDataLoading(true);

    axios
      .get(infoUrl)
      .then((res) => {
        if (active) {
          setInfoData(res.data);
          setIsInfoDataLoading(false);
        }
      })
      .catch(() => {
        setIsInfoDataLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id, level, grade, year]);

  useEffect(() => {
    let active = true;

    let levelTable = "";
    let levelId = "";

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

    const trendUrl = `/api/${levelTable}/?${levelId}=${id}`;

    setIsTrendDataLoading(true);

    axios
      .get(trendUrl)
      .then((res) => {
        if (active) {
          setTrendData(res.data);
          setIsTrendDataLoading(false);
        }
      })
      .catch(() => {
        setIsTrendDataLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id, level]);

  return (
    <>
      <Head title="Info" desc="Demographic Information">
        <link rel="icon" href="/mg_logo_cropped.png" />
      </Head>
      <Header />
      <Selection />
      <Page>
        <div className="mx-auto mt-5">
          {/*<Info
            infoData={infoData}
            title={title}
            isLoading={isInfoDataLoading}
  />*/}
          <Trends trendData={trendData} isLoading={isTrendDataLoading} />
        </div>
      </Page>
    </>
  );
}
