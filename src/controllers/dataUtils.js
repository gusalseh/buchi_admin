const xlsx = require('xlsx');

const parseExcelFile = (fileBuffer) => {
  const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
  return workbook;
};

const getSheetByName = (workbook, sheetName) => {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    throw new Error(`Sheet with name "${sheetName}" does not exist`);
  }
  return sheet;
};

const sheetToJson = (sheet) => {
  return xlsx.utils.sheet_to_json(sheet);
};

module.exports = {
  parseExcelFile,
  getSheetByName,
  sheetToJson,
};
