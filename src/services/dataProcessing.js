const { processSheet1 } = require("../controllers/dataGet"); // processSheet1 함수 가져오기

// 첫 번째 시트에서 spot 테이블에 넣을 데이터들
const extractSpotInfoSheet = async (req, res) => {
  try {
    const sheet1Data = await processSheet1();

    const resultRows = sheet1Data.slice(0, 200);

    console.log("length:", resultRows.length);

    // res.json({ resultRows });
    return resultRows;
  } catch (error) {
    console.error("Error extracting spot data sheet:", error);
    // res.status(500).json({ error: "Failed to extract spot data sheet" });
    throw new Error("Failed to extract spot data sheet");
  }
};

module.exports = { extractSpotInfoSheet };
