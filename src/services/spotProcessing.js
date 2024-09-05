const {
  processSpotImageExcel,
  processSpotInfoJson,
} = require("../controllers/spotInfoGet");

// CSV 데이터 처리
const processSpotExcelData = async (req, res) => {
  try {
    const excelData = await processSpotImageExcel();
    // sheet1Data에서 첫 번째 행을 추출
    const firstRow = excelData[0]; // 첫 번째 행

    // "식당주소" 키에 접근
    const restaurantAddress = firstRow; // 첫 번째 행의 식당주소 key

    // console.log('First Row Data:', firstRow);
    res.json({ restaurantAddress });
  } catch (error) {
    console.error("Error extracting first row:", error);
    res.status(500).json({ error: "Failed to extract first row" });
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
