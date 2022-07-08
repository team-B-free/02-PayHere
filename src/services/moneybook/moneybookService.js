import Moneybook from "../../models/moneybook.js";
import User from "../../models/user.js";
import { logger } from "../../config/winston.js";
import statusCode from "../../utils/statusCode.js";
import message from "../../utils/responseMessage.js";
import { response, errResponse } from "../../utils/response.js";

/**
 * @author 박성용
 * @version 1.0 22.7.6 최초 작성
 */
const mbtiMoneybook = async mbti => {
  try {
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
    getUsersMbti.forEach(data => {
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
    return response(statusCode.OK, message.SUCCESS, data);
  } catch (err) {
    logger.error(`DB ERROR: ${err}`);
    return errResponse(statusCode.DB_ERROR, message.DB_ERROR);
  }
};

/**
 * @author 박성용
 * @version 1.0 22.7.6 최초 작성
 */
const deleteMoneybook = async moneybook_id => {
  try {
    await Moneybook.destroy({
      where: { id: moneybook_id },
    });
    return response(statusCode.OK, message.SUCCESS);
  } catch (err) {
    logger.error(`DB ERROR: ${err}`);
    return errResponse(statusCode.DB_ERROR, message.DB_ERROR);
  }
};

/**
 * @author 박성용
 * @version 1.0 22.7.6 최초 작성
 */
const restoreMoneybook = async moneybook_id => {
  try {
    await Moneybook.restore({
      where: { id: moneybook_id },
    });
    return response(statusCode.OK, message.SUCCESS);
  } catch (err) {
    logger.error(`DB ERROR: ${err}`);
    return errResponse(statusCode.DB_ERROR, message.DB_ERROR);
  }
};

const updateMoneybook = async req => {
  /**
   * @author 오주환
   * @version 1.0 22.07.06 가계부 수정
   */
  const { moneybook_id } = req.params;
  const { title, is_shared } = req.body;
  const authorization = req.header("authorization");

  if (authorization === undefined) {
    return -1;
  }

  const moneybook = await Moneybook.update(
    {
      title,
      is_shared,
    },
    {
      where: { id: moneybook_id },
    },
  );
  return moneybook;
};
export default {
  deleteMoneybook,
  restoreMoneybook,
  mbtiMoneybook,
  updateMoneybook,
};
