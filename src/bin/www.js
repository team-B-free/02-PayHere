import app from "../index.js";
import { logger } from "../config/winston.js";

const PORT = process.env.PORT || 3000; // eslint-disable-line

app.listen(PORT, () => {
  logger.info(`${process.env.NODE_ENV} - API Server Start at Port ${PORT}`); // eslint-disable-line
});