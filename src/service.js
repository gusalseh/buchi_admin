require('dotenv').config();

const express = require('express');
const axios = require('axios');
const { sequelize } = require('./models');

const app = express();

// 미들웨어 설정
app.use(express.json());

const getFileRoute = require('./router/dataRouter');
app.use('/getFile', getFileRoute);

const putFileRoute = require('./router/dbRouter');
app.use('/putFile', putFileRoute);

app.post('/geocode', async (req, res) => {
  const { address } = req.body;
  console.log('address:', address);

  try {
    const response = await axios.get(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`,
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_MAP_CLIENT_ID,
          'X-NCP-APIGW-API-KEY': process.env.NAVER_MAP_CLIENT_SECRET,
        },
      }
    );

    if (response.data.addresses.length === 0) {
      return res.status(404).json({ message: 'Address not found' });
    }

    const { y: latitude, x: longitude } = response.data.addresses[0];
    res.json({ latitude, longitude });
  } catch (error) {
    console.error('Error fetching geocode:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize.sync();
});
