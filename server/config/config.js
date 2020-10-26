require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DEV_DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    define: { underscored: true },
    logging: false
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.TEST_DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    define: { underscored: true }
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.PROD_DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    define: { underscored: true }
  }
}
