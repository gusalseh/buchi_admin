const express = require('express');
const { getFile } = require('../aws/s3');
const xlsx = require('xlsx'); // xlsx 라이브러리 불러오기
const router = express.Router();

// 엑셀 데이터 이미지 가져오기
router.get('/', async (req, res) => {
  const directory = `data/buchi.xltx`;

  try {
    // S3에서 파일 가져오기
    const fileBuffer = await getFile(directory);
    console.log('3. fileBuffer:', fileBuffer);

    // 엑셀 파일 파싱
    try {
      const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
      console.log('4. workbook:', workbook);

      const sheetName = workbook.SheetNames[2]; // 시트 인덱스를 확인해주세요
      console.log('5. sheetName:', sheetName);

      if (!sheetName) {
        throw new Error('Sheet name is undefined or sheet does not exist');
      }

      const sheet = workbook.Sheets[sheetName];
      console.log('6. sheet:', sheet);

      if (!sheet) {
        throw new Error('Sheet data is undefined or sheet does not exist');
      }

      // 엑셀 데이터 가공
      const jsonData = xlsx.utils.sheet_to_json(sheet);
      console.log('Processed Excel Data:', jsonData);

      res.json({ data: jsonData });
    } catch (parseError) {
      console.error('Error parsing Excel file:', parseError);
      res.status(500).json({ error: 'Failed to parse Excel file' });
    }
  } catch (error) {
    console.error('Error fetching file from S3 or processing:', error);
    res.status(500).json({ error: 'Failed to fetch or process file' });
  }
});

module.exports = router;
