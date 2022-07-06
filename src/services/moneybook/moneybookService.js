import Moneybook from "../../models/moneybook.js";
import { logger } from "../../config/winston.js";

/**
 * @author 박성용
 * @version 1.0 22.7.6 최초 작성
 */
const deleteMoneybook = async (id) => {
  console.log("파라미터", id);
  try {
    await Moneybook.destroy({ where: { id: id } });
    return console.log("DELETE OK!");
  } catch (err) {
    logger.error(`에러 발생:`, err);
  }
};

export default {
  deleteMoneybook,
};
