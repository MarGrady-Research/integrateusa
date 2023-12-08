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

  const getData = () => {
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

    setIsInfoDataLoading(true);
    setIsTrendDataLoading(true);

    axios
      .get(infoUrl)
      .then((res) => {
        setInfoData(res.data);
        setIsInfoDataLoading(false);
      })
      .catch(() => {
        setIsInfoDataLoading(false);
      });

    axios
      .get(trendUrl)
      .then((res) => {
        setTrendData(res.data);
        setIsTrendDataLoading(false);
      })
      .catch(() => {
        setIsTrendDataLoading(false);
      });
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
      <Selection getData={getData} />
      <Page>
        <div className="mx-auto mt-5">
          <Info
            infoData={infoData}
            title={title}
            isLoading={isInfoDataLoading}
          />
          {/*<Trends trendData={trendData} />*/}
        </div>
      </Page>
    </>
  );
}
