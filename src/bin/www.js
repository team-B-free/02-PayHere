import app from "../index.js";
import { logger } from "../config/winston.js";
import db from '../models/index.js';

const PORT = process.env.PORT || 3000; // eslint-disable-line

db.sequelize.sync()
.then(() => {
  app.listen(PORT, () => {
    logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${PORT}`);
  });
})
.catch((err) => {
  console.log(err);
  logger.error(`${process.env.NODE_ENV} - DB connection Error`);
  });