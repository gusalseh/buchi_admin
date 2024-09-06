const { processSheet1 } = require('../controllers/dataGet'); // processSheet1 함수 가져오기

// 첫 번째 시트의 첫 번째 행을 추출하는 함수
const extractFirstRow = async (req, res) => {
  try {
    // processSheet1을 호출하여 데이터 가져오기
    const sheet1Data = await processSheet1();
    // console.log('sheet1Data:', sheet1Data);

    // sheet1Data에서 첫 번째 행을 추출
    const firstRow = sheet1Data[0]; // 첫 번째 행

    // "식당주소" 키에 접근
    const restaurantAddress = firstRow['식당주소']; // 첫 번째 행의 식당주소 key

    res.json({ firstRow });
  } catch (error) {
    console.error('Error extracting first row:', error);
    res.status(500).json({ error: 'Failed to extract first row' });
  }
};

module.exports = { extractFirstRow };
