const { getFile } = require("../aws/s3");
const {
  parseExcelFile,
  getSheetByName,
  sheetToJson,
} = require("../utils/dataUtils");

// 식당, 메뉴 데이터 있는 더미 엑셀
const processSheet = async (targetSheet) => {
  const directory = `data/buchi.xlsx`;

  try {
    const fileBuffer = await getFile(directory);
    const workbook = parseExcelFile(fileBuffer);

    const sheetName = workbook.SheetNames[targetSheet];
    const sheet = getSheetByName(workbook, sheetName);
    const jsonData = sheetToJson(sheet);

    return jsonData;
  } catch (error) {
    console.error("Error processing Sheet 1:", error);
    throw new Error("Failed to process Sheet 1");
  }
};

module.exports = { processSheet };
