import Moneybook from "../../models/moneybook.js";
import User from "../../models/user.js";
import { logger } from "../../config/winston.js";

/**
 * @author 박성용
 * @version 1.0 22.7.6 최초 작성
 */
const mbtiMoneybook = async (mbti) => {
  const getUsersMbti = await Moneybook.findAll({
    include: [
      {
        model: User,
        attributes: ["mbti"],
        where: { mbti: mbti },
        required: true,
      },
    ],
  });
  return getUsersMbti;
};

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

/**
 * @author 박성용
 * @version 1.0 22.7.6 최초 작성
 */
const restoreMoneybook = async (id) => {
  console.log("파라미터", id);
  await Moneybook.restore({ where: { id: id } });
  return console.log("RESTORE OK!");
};

export default {
  deleteMoneybook,
  restoreMoneybook,
  mbtiMoneybook,
};
