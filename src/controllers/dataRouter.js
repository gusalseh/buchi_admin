const express = require('express');
const { extractFirstRow } = require('./dataProcessing');
const router = express.Router();

router.get('/1', extractFirstRow);

module.exports = router;
