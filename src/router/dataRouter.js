const express = require("express");
const { extractSpotInfoSheet } = require("../services/dataProcessing");
const {
  processSpotExcelData,
  processSpotJsonData,
} = require("../services/spotProcessing");
const router = express.Router();

router.get("/buchi/1", extractSpotInfoSheet);

router.get("/spotExcel", processSpotExcelData);

router.get("/spotJson", processSpotJsonData);

module.exports = router;
