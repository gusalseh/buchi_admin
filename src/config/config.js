require("dotenv").config();
const env = process.env;

const development = {
  username: env.RDS_USERNAME,
  password: env.RDS_PASSWORD,
  database: env.RDS_DATABASE,
  host: env.RDS_HOST,
  dialect: "mysql",
};

const test = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  port: 3306,
};

const production = {
  username: env.RDS_USERNAME,
  password: env.RDS_PASSWORD,
  database: env.RDS_DATABASE,
  host: env.RDS_HOST,
  dialect: "mysql",
};

module.exports = { development, test, production };
