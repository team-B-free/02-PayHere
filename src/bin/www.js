import app from "../index.js";
import morgan from "morgan";
import { logger } from "../config/winston.js";
import db from "../models/index.js";

// const combined =":method :url :status :response-time ms - :res[content-length]";
// 기존 combined 포멧에서 timestamp만 제거

const PORT = process.env.PORT || 3000; // eslint-disable-line

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    logger.error(`${process.env.NODE_ENV} - DB connection Error`);
  });

app.use(morgan("dev", { stream: logger.stream })); // morgan 로그 설정
