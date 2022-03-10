require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('./winston');

const MONGODB = `mongodb+srv://${process.env.DEV_DB_USER}:${process.env.DEV_DB_PASSWORD}@${process.env.DEV_DB_HOST}/${process.env.DEV_DB_NAME}`;
const logTitle = '(database)';

exports.connect = () => {
  mongoose
    .connect(MONGODB)
    .then(async () => {
      logger.info(
        `${logTitle} : Successfully connected to database : ${MONGODB}`
      );
    })
    .catch((error) => {
      logger.error(`mongoose.connect() -> error : ${error.message}`);
      process.exit(1);
    });
};
