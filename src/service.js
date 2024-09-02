require('dotenv').config();

const express = require('express');
const { sequelize } = require('./models');

const app = express();

const getFileRoute = require('./controllers/dataRouter');
app.use('/getFile', getFileRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize.sync();
});
