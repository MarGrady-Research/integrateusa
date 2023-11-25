import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Head from "../components/fragments/Head";
import Header from "../components/fragments/Header";
import Selection from "../components/fragments/Selection";
import Info from "../components/fragments/Info";
import Trends from "../components/fragments/Trends";
import Loader from "../components/fragments/Loader";
import Page from "../components/layouts/Page";
import { levelSelectData } from "../components/fragments/Selection/data";
import {
  selectYear,
  selectGrade,
  selectLevels,
  selectId,
  selectSelectedName,
} from "../store/selectSlice";

import { InfoData, TrendData } from "../interfaces";

export default function InfoPage() {
  const levels = useSelector(selectLevels);
  const year = useSelector(selectYear);
  const grade = useSelector(selectGrade);
  const id = useSelector(selectId);
  const title = useSelector(selectSelectedName);

  const [infoData, setInfoData] = useState([] as InfoData);
  const [trendData, setTrendData] = useState([] as TrendData);
  const [isLoading, setIsLoading] = useState(true);
  const [infoTitle, setInfoTitle] = useState(title);

  const getData = () => {
    if (year != undefined && grade != undefined && id != undefined) {
      let table;

      switch (levels) {
        case 0:
          table = "districttrends";
          break;
        case 1:
          table = "countytrends";
          break;
        case 2:
          table = "statetrends";
          break;
        case 3:
          table = "schools";
          break;
      }

      const infoUrl = `/api/schools/?year=${year}&grade=${grade}&${levelSelectData[levels].id}=${id}`;
      const trendUrl = `/api/${table}/?${levelSelectData[levels].id}=${id}`;

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
      <Selection getData={getData} isLoading={isLoading} />
      <Page>
        {isLoading ? (
          <div className="pt-5">
            <Loader />
          </div>
        ) : (
          <div className="mx-auto mt-5">
            <Info infoData={infoData} title={infoTitle} />
            <Trends trendData={trendData} />
          </div>
        )}
      </Page>
    </>
  );
}
