// routes/spot.js
const express = require("express");
const router = express.Router();
const { Spot } = require("../models"); // Spot 모델 가져오기
const { processSpotJsonData } = require("../services/spotProcessing");

router.post("/spotNameAddress", async (req, res) => {
  try {
    const jsonData = await processSpotJsonData();
    console.log("jsonData:", jsonData);

    // 식당명과 식당 도로명주소 데이터를 DB에 저장
    for (const [spot_name, spot_address] of jsonData) {
      await Spot.create({ spot_name, spot_address });
    }

    res.status(200).json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error("Error saving spot data:", error);
    res.status(500).json({ error: "Error saving spot data" });
  }
});

module.exports = router;
