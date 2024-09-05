require("dotenv").config();

const express = require("express");
const { sequelize } = require("./models");

const app = express();

const getFileRoute = require("./router/dataRouter");
app.use("/getFile", getFileRoute);

const putFileRoute = require("./router/dbRouter");
app.use("/putFile", putFileRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize.sync();
});
