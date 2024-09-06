// routes/spot.js
const express = require('express');
const router = express.Router();
const { Spot } = require('../models'); // Spot 모델 가져오기
const { processSpotJsonData } = require('../services/spotProcessing');

router.post('/spotTable', async (req, res) => {
  try {
    const jsonData = await processSpotJsonData();
    console.log('jsonData:', jsonData);

    // spot 테이블 데이터
    for (const [spot_name, spot_address] of jsonData) {
      try {
        const response = await axios.get(
          `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(spot_address)}`,
          {
            headers: {
              'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_MAP_CLIENT_ID,
              'X-NCP-APIGW-API-KEY': process.env.NAVER_MAP_CLIENT_SECRET,
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
        console.error(`Error fetching geocode for address: ${spot_address}`, geocodeError.message);
        continue;
      }
    }

    res.status(200).json({ message: 'Data saved successfully!' });
  } catch (error) {
    console.error('Error saving spot data:', error);
    res.status(500).json({ error: 'Error saving spot data' });
  }
});

module.exports = router;
