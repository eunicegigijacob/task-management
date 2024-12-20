require("dotenv").config();

module.exports = {
  default: process.env.NODE_ENV || "development",
  development: {
    driver: "pg",
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
  },
};
