const { getFile } = require("../aws/s3");
const {
  parseExcelFile,
  getSheetByName,
  sheetToJson,
} = require("../utils/dataUtils");

// 식당 데이터
const processSheet1 = async () => {
  const directory = `data/buchi.xlsx`;

  try {
    const fileBuffer = await getFile(directory);
    const workbook = parseExcelFile(fileBuffer);

    const sheetName = workbook.SheetNames[1];
    const sheet = getSheetByName(workbook, sheetName);
    const jsonData = sheetToJson(sheet);

    console.log("Processed Sheet 1 Data:", jsonData);
    return jsonData; // 데이터를 반환
  } catch (error) {
    console.error("Error processing Sheet 1:", error);
    throw new Error("Failed to process Sheet 1");
  }
};

// 리뷰 데이터
const processSheet2 = async () => {
  const directory = `data/buchi.xlsx`;

  try {
    const fileBuffer = await getFile(directory);
    const workbook = parseExcelFile(fileBuffer);

    const sheetName = workbook.SheetNames[2];
    const sheet = getSheetByName(workbook, sheetName);
    const jsonData = sheetToJson(sheet);

    console.log("Processed Sheet 2 Data:", jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error processing Sheet 2:", error);
    throw new Error("Failed to process Sheet 2");
  }
};

// 메뉴 데이터
const processSheet3 = async () => {
  const directory = `data/buchi.xlsx`;

  try {
    const fileBuffer = await getFile(directory);
    const workbook = parseExcelFile(fileBuffer);

    const sheetName = workbook.SheetNames[3];
    const sheet = getSheetByName(workbook, sheetName);
    const jsonData = sheetToJson(sheet);

    console.log("Processed Sheet 3 Data:", jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error processing Sheet 3:", error);
    throw new Error("Failed to process Sheet 3");
  }
};

module.exports = { processSheet1, processSheet2, processSheet3 };
