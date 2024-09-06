const {
  processSpotImageExcel,
  processSpotInfoJson,
} = require("../controllers/spotInfoGet");

// CSV 데이터 처리
const processSpotExcelData = async (req, res) => {
  try {
    const excelData = await processSpotImageExcel();

    const resultRows = excelData.slice(0, 200);

    console.log("length:", resultRows.length);

    return resultRows;
  } catch (error) {
    console.error("Error extracting first row:", error);
    throw error;
  }
};

// JSON 데이터 처리
const processSpotJsonData = async (req, res) => {
  try {
    const jsonData = await processSpotInfoJson();

    // "bplcnm"과 "rdnwhladdr" 값을 추출하여 2차원 배열로 변환
    const resultArray = jsonData.DATA.map((item) => {
      const addressParts = item.rdnwhladdr.split(" ").slice(0, 4);
      addressParts[3] = addressParts[3].replace(/,$/, "");
      return [item.bplcnm, addressParts.join(" ")];
    });

    console.log("Extracted Array:", resultArray);

    return resultArray;
  } catch (error) {
    console.error("Error processing JSON data:", error);

    throw error; // 에러를 다시 던져서 호출한 곳에서 처리하도록 함
  }
};

module.exports = { processSpotExcelData, processSpotJsonData };
