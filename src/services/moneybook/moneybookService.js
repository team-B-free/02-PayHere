import Moneybook from "../../models/moneybook.js";
import User from "../../models/user.js";
import { logger } from "../../config/winston.js";

/**
 * @author 박성용
 * @version 1.0 22.7.6 최초 작성
 */
const mbtiMoneybook = async (mbti) => {
  const getUsersMbti = await Moneybook.findAll({
    where: { is_shared: "Y" },
    attributes: ["id", "title", "is_shared", "view", "user_id"],

    include: [
      {
        model: User,
        attributes: ["mbti", "nickname"],
        exclude: ["created_at", "updated_at", "deleted_at"],
        where: { mbti: mbti },
        required: true,
      },
    ],
  });

  let mbtiDataList = [];
  getUsersMbti.forEach((data) => {
    let mbtiData = {
      moneybook_id: data.dataValues.id,
      title: data.dataValues.title,
      view: data.dataValues.view,
      userId: data.dataValues.user_id,
      nickname: data.dataValues.USER.dataValues.nickname,
    };
    mbtiDataList.push(mbtiData);
  });
  let data = { mbtiDataList };
  return data;
};

/**
 * @author 박성용
 * @version 1.0 22.7.6 최초 작성
 */
const deleteMoneybook = async (moneybook_id) => {
  console.log("파라미터", moneybook_id);
  try {
    await Moneybook.destroy({ where: { id: moneybook_id } });
    return console.log("DELETE OK!");
  } catch (err) {
    logger.error(`에러 발생:`, err);
  }
};

/**
 * @author 박성용
 * @version 1.0 22.7.6 최초 작성
 */
const restoreMoneybook = async (moneybook_id) => {
  console.log("파라미터", moneybook_id);
  await Moneybook.restore({ where: { id: moneybook_id } });
  return console.log("RESTORE OK!");
};

export default {
  deleteMoneybook,
  restoreMoneybook,
  mbtiMoneybook,
};
