// routes/spot.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { Spot } = require("../models");
const {
  processSpotJsonData,
  processSpotExcelData,
} = require("../services/spotProcessing");
const {
  extractSpotInfoSheet,
  extractMenuInfoSheet,
} = require("../services/dataProcessing");

router.post("/spotTable/nameAndCoords", async (req, res) => {
  try {
    const jsonData = await processSpotJsonData();
    console.log("jsonData:", jsonData);

    // spot 테이블 식당명, 식당주소, 식당위도, 식당경도 데이터
    for (const [spot_name, spot_address] of jsonData) {
      try {
        const response = await axios.get(
          `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(
            spot_address
          )}`,
          {
            headers: {
              "X-NCP-APIGW-API-KEY-ID": process.env.NAVER_MAP_CLIENT_ID,
              "X-NCP-APIGW-API-KEY": process.env.NAVER_MAP_CLIENT_SECRET,
            },
          }
        );

        if (response.data.addresses.length === 0) {
          console.log(`Address not found for spot: ${spot_name}`);
          continue;
        }

        const { y: latitude, x: longitude } = response.data.addresses[0];

        await Spot.create({
          spot_name,
          spot_address,
          spot_lat: latitude,
          spot_lng: longitude,
        });
      } catch (geocodeError) {
        console.error(
          `Error fetching geocode for address: ${spot_address}`,
          geocodeError.message
        );
        continue;
      }
    }

    res.status(200).json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error("Error saving spot name and coords data:", error);
    res.status(500).json({ error: "Error saving spot name and coords data" });
  }
});

router.post("/spotTable/extraColumns", async (req, res) => {
  try {
    const jsonData = await extractSpotInfoSheet();

    for (let i = 0; i < jsonData.length; i++) {
      const row = jsonData[i];
      const spot_id = i + 1;

      const {
        "개인룸 유무": private_room_raw,
        주차대수: parking_lot,
        "발렛 유무": valet_raw,
        "콜키지 여부": corkage_raw,
        "단체석으로 받을 수 있는 최대인원수": max_group_seats,
        전화번호: tel,
        "대관 여부": rental_raw,
        "플랜카드 여부": placard_raw,
        "실내화장실 유무": indoor_toilet_raw,
        "휠체어 이용가능 여부": wheelchair_raw,
        "식당 프로모션": promotion,
        "식당 소식": news_raw,
      } = row;

      const private_room = private_room_raw === 1;
      const valet = valet_raw === 1;
      const rental = rental_raw === 1;
      const placard = placard_raw === 1;
      const indoor_toilet = indoor_toilet_raw === 1;
      const wheelchair = wheelchair_raw === 1;

      let corkage;
      if (corkage_raw === "불가") corkage = "no";
      else if (corkage_raw === "무료") corkage = "free";
      else if (corkage_raw === "유료") corkage = "charge";

      const news = news_raw ? news_raw.replace(/^"|"$/g, "") : null;

      // spot_id로 기존 데이터를 찾고 업데이트
      const spot = await Spot.findByPk(spot_id);

      // 월화수목금토일 영업일
      const openday_list = [
        "1111100",
        "1111110",
        "1111101",
        "1111111",
        "0111111",
      ];

      const open_day = openday_list[spot_id % 5];

      if (spot) {
        await spot.update({
          private_room,
          parking_lot: parseInt(parking_lot, 10),
          valet,
          corkage,
          max_group_seats: parseInt(max_group_seats, 10),
          tel,
          open_day,
          rental,
          placard,
          indoor_toilet,
          wheelchair,
          promotion,
          news,
        });
      } else {
        console.log(`Spot not found for spot_id: ${spot_id}`);
      }
    }

    res.status(200).json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error("Error saving spot extra data:", error);
    res.status(500).json({ error: "Error saving spot extra data" });
  }
});

router.post("/spotTable/imageUrls", async (req, res) => {
  try {
    const jsonData = await processSpotExcelData(); // 이미지 URL 데이터를 불러옴
    console.log("jsonData:", jsonData);

    const totalImages = jsonData.length;
    let imageIndex = 0;

    // spot 테이블 기준으로 순회
    for (let spot_id = 1; spot_id <= 200; spot_id++) {
      const spot = await Spot.findByPk(spot_id);

      if (spot) {
        const existingImages = [
          spot.spot_main_img,
          spot.spot_sub_img_1,
          spot.spot_sub_img_2,
          spot.spot_sub_img_3,
          spot.spot_sub_img_4,
          spot.spot_sub_img_5,
        ];

        for (let i = 0; i < existingImages.length; i++) {
          if (!existingImages[i]) {
            const imageUrl = jsonData[imageIndex]["식당이미지(URL)"];

            if (i === 0) spot.spot_main_img = imageUrl;
            else if (i === 1) spot.spot_sub_img_1 = imageUrl;
            else if (i === 2) spot.spot_sub_img_2 = imageUrl;
            else if (i === 3) spot.spot_sub_img_3 = imageUrl;
            else if (i === 4) spot.spot_sub_img_4 = imageUrl;
            else if (i === 5) spot.spot_sub_img_5 = imageUrl;

            // 이미지 인덱스를 업데이트 (마지막 이미지면 처음으로 돌아감)
            imageIndex = (imageIndex + 1) % totalImages;
          }
        }

        await spot.save();
      }
    }

    res.status(200).json({ message: "Image URLs saved successfully!" });
  } catch (error) {
    console.error("Error saving spot image URL data:", error);
    res.status(500).json({ error: "Error saving spot image URL data" });
  }
});

router.post("/spotTable/openday", async (req, res) => {
  try {
    for (let spot_id = 1; spot_id <= 200; spot_id++) {
      const spot = await Spot.findByPk(spot_id);

      if (spot) {
        // 월화수목금토일 영업일
        const openday_list = [
          "1111100",
          "1111110",
          "1111101",
          "1111111",
          "0111111",
        ];

        spot.open_day = openday_list[spot_id % 5];

        await spot.save();
      }
    }

    res.status(200).json({ message: "openday columns saved successfully!" });
  } catch (error) {
    console.error("Error saving spot openday columns data:", error);
    res.status(500).json({ error: "Error saving spot openday columns data" });
  }
});

router.post("/menuTable", async (req, res) => {
  try {
    await extractMenuInfoSheet();
    res.status(200).json({ message: "Menu data saved successfully!" });
  } catch (error) {
    console.error("Error saving menu data:", error);
    res.status(500).json({ error: "Failed to save menu data" });
  }
});

module.exports = router;
