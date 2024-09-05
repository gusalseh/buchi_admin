const express = require("express");
const { extractFirstRow } = require("../services/dataProcessing");
const {
  processSpotExcelData,
  processSpotJsonData,
} = require("../services/spotProcessing");
const router = express.Router();

router.get("/buchi/1", extractFirstRow);

router.get("/spotExcel", processSpotExcelData);

router.get("/spotJson", processSpotJsonData);

module.exports = router;
