const { getFile } = require("../aws/s3");
const {
  parseExcelFile,
  getSheetByName,
  sheetToJson,
} = require("../utils/dataUtils");

// 식당명 - 3열, 식당이미지(URL) - 5열
const processSpotImageExcel = async () => {
  const directory = `data/spot_image.xlsx`;

  try {
    const fileBuffer = await getFile(directory);
    const workbook = parseExcelFile(fileBuffer);

    const sheetName = workbook.SheetNames[0];
    const sheet = getSheetByName(workbook, sheetName);
    const jsonData = sheetToJson(sheet);

    console.log("Processed spot name and image Data:", jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error processing spot name and image:", error);
    throw new Error("Failed to process spot name and image");
  }
};

// JSON 파일 처리 (spot_info.json)
const processSpotInfoJson = async () => {
  const fileKey = `data/spot_info.json`;

  try {
    const fileBuffer = await getFile(fileKey);

    // JSON 파일 파싱
    const jsonData = JSON.parse(fileBuffer.toString());
    console.log("Processed JSON Data:", jsonData);

    return jsonData;
  } catch (error) {
    console.error("Error processing JSON file:", error);
    throw new Error("Failed to process JSON file");
  }
};

module.exports = {
  processSpotImageExcel,
  processSpotInfoJson,
};
