import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import { School, Level } from "interfaces";

import { yearsData, gradesData } from "components/fragments/Selection/data";

export const exportRaceBreakdown = async (
  infoData: School[],
  year: number,
  grade: string,
  level: Level,
  selectedName: string
): Promise<boolean> => {
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
    { header: "School Name", key: "sch_name", width: 60 },
    { header: "Asian Proportion", key: "prop_as", width: 20 },
    { header: "Black Proportion", key: "prop_bl", width: 20 },
    { header: "Hispanic Proportion", key: "prop_hi", width: 20 },
    { header: "White Proportion", key: "prop_wh", width: 20 },
    { header: "Other Proportion", key: "prop_or", width: 20 },
  ];
  sheet.getRow(1).font = { bold: true };

  for (const school of infoData) {
    const { asian, black, hispanic, white, other, sch_name } = school;

    const tot_enr = asian + black + hispanic + white + other;

    const prop_as = (asian * 100) / tot_enr;
    const prop_bl = (black * 100) / tot_enr;
    const prop_hi = (hispanic * 100) / tot_enr;
    const prop_wh = (white * 100) / tot_enr;
    const prop_or = (other * 100) / tot_enr;

    sheet.addRow({
      sch_name,
      prop_as,
      prop_bl,
      prop_hi,
      prop_wh,
      prop_or,
    });
  }

  const selectedYear = yearsData.find((y) => y.value === year);
  const selectedYearLabel = selectedYear.label;

  const selectedGrade = gradesData.find((g) => g.value === grade);
  const selectedGradeLabel = selectedGrade.label;

  const title = `Race Breakdown By School for ${Level[level]} ${selectedName} for ${selectedYearLabel} for ${selectedGradeLabel}`;

  const titleRow = sheet.insertRow(1, [title]);
  titleRow.font = { size: 16, bold: true };
  titleRow.alignment = { horizontal: "center" };
  sheet.mergeCells("A1:F1");

  try {
    const buffer = await workbook.xlsx.writeBuffer();
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const EXCEL_EXTENSION = ".xlsx";
    const blob = new Blob([buffer], { type: fileType });

    saveAs(blob, title + EXCEL_EXTENSION);
    return true;
  } catch (err) {
    return false;
  }
};
