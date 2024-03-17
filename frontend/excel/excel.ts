import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import { School, Level, Trend, MeasureAccessor, LineDataAPI } from "interfaces";

import { yearsData, gradesData } from "components/fragments/Selection/data";
import { gradesTableData } from "components/fragments/Trends/data";

import { selectedLineColor } from "constants/constants";

export const exportRaceBreakdown = async (
  infoData: School[],
  year: number,
  grade: string,
  level: Level,
  selectedName: string
): Promise<boolean> => {
  const sortedData = [...infoData];
  sortedData.sort((a, b) => {
    return a.nces_id < b.nces_id ? -1 : a.nces_id > b.nces_id ? 1 : 0;
  });

  const workbook = new ExcelJS.Workbook();

  const date = new Date();

  workbook.creator = "Margrady Research";
  workbook.created = date;
  workbook.modified = date;

  workbook.views = [
    {
      x: 0,
      y: 0,
      width: 10000,
      height: 20000,
      firstSheet: 0,
      activeTab: 1,
      visibility: "visible",
    },
  ];

  const sheet = workbook.addWorksheet("Race Breakdown By School");

  sheet.columns = [
    { header: "Nces Id", key: "nces_id", width: 14 },
    { header: "School Name", key: "sch_name", width: 50 },
    { header: "District Name", key: "dist_name", width: 35 },
    { header: "County Name", key: "county_name", width: 35 },
    { header: "School Level", key: "level", width: 14 },
    { header: "Asian Enrollment", key: "asian", width: 17 },
    { header: "Black Enrollment", key: "black", width: 17 },
    { header: "Hispanic Enrollment", key: "hispanic", width: 20 },
    { header: "White Enrollment", key: "white", width: 17 },
    { header: "Other Enrollment", key: "other", width: 17 },
    { header: "Asian Proportion", key: "prop_as", width: 18 },
    { header: "Black Proportion", key: "prop_bl", width: 18 },
    {
      header: "Hispanic Proportion",
      key: "prop_hi",
      width: 20,
    },
    { header: "White Proportion", key: "prop_wh", width: 18 },
    { header: "Other Proportion", key: "prop_or", width: 18 },
  ];
  sheet.getRow(1).font = { bold: true };

  for (const [index, school] of sortedData.entries()) {
    const {
      asian,
      black,
      hispanic,
      white,
      other,
      sch_name,
      nces_id,
      dist_name,
      county_name,
      level: schoolLevel,
    } = school;

    const tot_enr = asian + black + hispanic + white + other;

    const prop_as = (asian * 100) / tot_enr;
    const prop_bl = (black * 100) / tot_enr;
    const prop_hi = (hispanic * 100) / tot_enr;
    const prop_wh = (white * 100) / tot_enr;
    const prop_or = (other * 100) / tot_enr;

    sheet.addRow({
      nces_id,
      sch_name,
      dist_name,
      county_name,
      level: schoolLevel,
      asian,
      black,
      hispanic,
      white,
      other,
      prop_as,
      prop_bl,
      prop_hi,
      prop_wh,
      prop_or,
    });

    sheet.getCell(`K${index + 2}`).numFmt = "0.00";
    sheet.getCell(`L${index + 2}`).numFmt = "0.00";
    sheet.getCell(`M${index + 2}`).numFmt = "0.00";
    sheet.getCell(`N${index + 2}`).numFmt = "0.00";
    sheet.getCell(`O${index + 2}`).numFmt = "0.00";
  }

  const titleRow = sheet.insertRow(1, ["Race Breakdown By School"]);
  titleRow.font = { size: 16, bold: true };

  const name = `${Level[level]}: ${selectedName}`;
  sheet.insertRow(2, [name]);

  const selectedYear = yearsData.find((y) => y.value === year);
  const selectedYearLabel = selectedYear?.label || "-";
  const yearRow = `Year: ${selectedYearLabel}`;
  sheet.insertRow(3, [yearRow]);

  const selectedGrade = gradesData.find((g) => g.value === grade);
  const selectedGradeLabel = selectedGrade?.label || "-";
  const gradeRow = `Grade: ${selectedGradeLabel}`;
  sheet.insertRow(4, [gradeRow]);

  sheet.insertRow(5, [
    "Source: IntegrateUSA.org (based on data from the NCES Common Core of Data)",
  ]);

  sheet.insertRow(6, []);

  const fileName = `Race Breakdown By School for ${Level[level]} ${selectedName} for ${selectedYearLabel} for ${selectedGradeLabel}`;

  try {
    const buffer = await workbook.xlsx.writeBuffer();
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const EXCEL_EXTENSION = ".xlsx";
    const blob = new Blob([buffer], { type: fileType });

    saveAs(blob, fileName + EXCEL_EXTENSION);
    return true;
  } catch (err) {
    return false;
  }
};

export const exportTrendsByRace = async (
  trendData: Trend[],
  grade: string,
  level: Level,
  selectedName: string
) => {
  const sortedData = trendData
    .filter((e) => e.grade === grade)
    .sort((a, b) => a.year - b.year);

  const workbook = new ExcelJS.Workbook();

  const date = new Date();

  workbook.creator = "Margrady Research";
  workbook.created = date;
  workbook.modified = date;

  workbook.views = [
    {
      x: 0,
      y: 0,
      width: 10000,
      height: 20000,
      firstSheet: 0,
      activeTab: 1,
      visibility: "visible",
    },
  ];

  const sheet = workbook.addWorksheet("Enrollment Trends by Race");

  sheet.columns = [
    { header: "Year", key: "year", width: 14 },
    { header: "Asian Enrollment", key: "asian", width: 17 },
    { header: "Black Enrollment", key: "black", width: 17 },
    { header: "Hispanic Enrollment", key: "hispanic", width: 20 },
    { header: "White Enrollment", key: "white", width: 17 },
    { header: "Other Enrollment", key: "other", width: 17 },
    { header: "Asian Proportion", key: "prop_as", width: 18 },
    { header: "Black Proportion", key: "prop_bl", width: 18 },
    {
      header: "Hispanic Proportion",
      key: "prop_hi",
      width: 20,
    },
    { header: "White Proportion", key: "prop_wh", width: 18 },
    { header: "Other Proportion", key: "prop_or", width: 18 },
  ];
  sheet.getRow(1).font = { bold: true };

  for (const [index, trend] of sortedData.entries()) {
    const { year, asian, black, hispanic, white, other } = trend;

    const tot_enr = asian + black + hispanic + white + other;

    const prop_as = (asian * 100) / tot_enr;
    const prop_bl = (black * 100) / tot_enr;
    const prop_hi = (hispanic * 100) / tot_enr;
    const prop_wh = (white * 100) / tot_enr;
    const prop_or = (other * 100) / tot_enr;

    sheet.addRow({
      year,
      asian,
      black,
      hispanic,
      white,
      other,
      prop_as,
      prop_bl,
      prop_hi,
      prop_wh,
      prop_or,
    });

    sheet.getCell(`G${index + 2}`).numFmt = "0.00";
    sheet.getCell(`H${index + 2}`).numFmt = "0.00";
    sheet.getCell(`I${index + 2}`).numFmt = "0.00";
    sheet.getCell(`J${index + 2}`).numFmt = "0.00";
    sheet.getCell(`K${index + 2}`).numFmt = "0.00";
  }

  const titleRow = sheet.insertRow(1, ["Enrollment Trends by Race"]);
  titleRow.font = { size: 16, bold: true };

  const name = `${Level[level]}: ${selectedName}`;
  sheet.insertRow(2, [name]);

  const selectedGrade = gradesData.find((g) => g.value === grade);
  const selectedGradeLabel = selectedGrade?.label || "-";
  const gradeRow = `Grade: ${selectedGradeLabel}`;
  sheet.insertRow(3, [gradeRow]);

  sheet.insertRow(4, [
    "Source: IntegrateUSA.org (based on data from the NCES Common Core of Data)",
  ]);

  sheet.insertRow(5, []);

  const fileName = `Enrollment Trends by Race for ${Level[level]} ${selectedName} for ${selectedGradeLabel}`;

  try {
    const buffer = await workbook.xlsx.writeBuffer();
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const EXCEL_EXTENSION = ".xlsx";
    const blob = new Blob([buffer], { type: fileType });

    saveAs(blob, fileName + EXCEL_EXTENSION);
    return true;
  } catch (err) {
    return false;
  }
};

export const exportTrendsByGrade = async (
  trendData: Trend[],
  level: Level,
  selectedName: string
) => {
  const workbook = new ExcelJS.Workbook();

  const date = new Date();

  workbook.creator = "Margrady Research";
  workbook.created = date;
  workbook.modified = date;

  workbook.views = [
    {
      x: 0,
      y: 0,
      width: 10000,
      height: 20000,
      firstSheet: 0,
      activeTab: 1,
      visibility: "visible",
    },
  ];

  const sheet = workbook.addWorksheet("Enrollment Trends by Grade");

  sheet.columns = [{ header: "Year", key: "year", width: 14 }].concat(
    gradesTableData.map((g) => ({
      header: g.label,
      key: g.value,
      width: 14,
    }))
  );

  sheet.getRow(1).font = { bold: true };

  yearsData.map((year) => {
    const row = { year: year.label };

    gradesTableData.map((grade) => {
      let content = "-";

      const trend = trendData.find(
        (t) => t.year === year.value && t.grade === grade.value
      );

      if (trend) {
        const { asian, black, hispanic, white, other } = trend;
        const total = asian + black + hispanic + white + other;

        content = total.toLocaleString();
      }

      row[grade.value] = content;
    });

    sheet.addRow(row);
  });

  const titleRow = sheet.insertRow(1, ["Enrollment Trends by Grade"]);
  titleRow.font = { size: 16, bold: true };

  const name = `${Level[level]}: ${selectedName}`;
  sheet.insertRow(2, [name]);

  sheet.insertRow(3, [
    "Source: IntegrateUSA.org (based on data from the NCES Common Core of Data)",
  ]);

  sheet.insertRow(4, []);

  const fileName = `Enrollment Trends by Grade for ${Level[level]} ${selectedName}`;

  try {
    const buffer = await workbook.xlsx.writeBuffer();
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const EXCEL_EXTENSION = ".xlsx";
    const blob = new Blob([buffer], { type: fileType });

    saveAs(blob, fileName + EXCEL_EXTENSION);
    return true;
  } catch (err) {
    return false;
  }
};

export const exportSegregationTrends = async (
  linesData: (LineDataAPI[] | null)[],
  grade: string,
  level: Level,
  selectedName: string,
  measure: {
    name: string;
    accessor: MeasureAccessor;
  }
) => {
  const workbook = new ExcelJS.Workbook();

  const date = new Date();

  workbook.creator = "Margrady Research";
  workbook.created = date;
  workbook.modified = date;

  workbook.views = [
    {
      x: 0,
      y: 0,
      width: 10000,
      height: 20000,
      firstSheet: 0,
      activeTab: 1,
      visibility: "visible",
    },
  ];

  const sheet = workbook.addWorksheet("Segregation Trends");

  sheet.columns = [{ header: "Name", key: "name", width: 40 }].concat(
    yearsData.reverse().map((y) => ({
      header: y.value.toString(),
      key: y.value.toString(),
      width: 14,
    }))
  );

  sheet.getRow(1).font = { bold: true };

  const rowBase = {};

  yearsData.reverse().forEach((y) => {
    rowBase[y.value.toString()] = "-";
  });

  linesData.forEach((ld) => {
    if (ld && ld[0]) {
      console.log(ld);
      const row = {
        name: ld[0]?.county_name || ld[0]?.dist_name || ld[0]?.state_name,
        ...rowBase,
      };

      if (typeof row.name === "undefined") {
        return;
      }

      ld?.forEach((line) => {
        row[line.year.toString()] = line[measure.accessor];
      });

      const lineRow = sheet.addRow(row);
      if (row.name === selectedName) {
        lineRow.font = { color: { argb: selectedLineColor.slice(1) } };
      }
    }
  });

  const titleRow = sheet.insertRow(1, ["Segregation Trends"]);
  titleRow.font = { size: 16, bold: true };

  const name = `${Level[level]}: ${selectedName}`;
  sheet.insertRow(2, [name]);

  const selectedGrade = gradesData.find((g) => g.value === grade);
  const selectedGradeLabel = selectedGrade?.label || "-";
  const gradeRow = `Grade: ${selectedGradeLabel}`;
  sheet.insertRow(3, [gradeRow]);

  const measureRow = `Measure: ${measure.name}`;
  sheet.insertRow(4, [measureRow]);

  sheet.insertRow(5, [
    "Source: IntegrateUSA.org (based on data from the NCES Common Core of Data)",
  ]);

  sheet.insertRow(6, []);

  const fileName = `Segregation Trends for ${Level[level]} ${selectedName} for ${measure.name} for ${selectedGradeLabel}`;

  try {
    const buffer = await workbook.xlsx.writeBuffer();
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const EXCEL_EXTENSION = ".xlsx";
    const blob = new Blob([buffer], { type: fileType });

    saveAs(blob, fileName + EXCEL_EXTENSION);
    return true;
  } catch (err) {
    return false;
  }
};

export const exportComparisonEntities = async () => {
  return false;
};
