import moneybookDetail from "../../models/moneybookDetail.js";
//import User from "../../models/user.js";
import Moneybook from "../../models/moneybook.js";
import { logger } from "../../config/winston.js";
import statusCode from "../../utils/statusCode.js";
import message from "../../utils/responseMessage.js";
import { response, errResponse } from "../../utils/response.js";

/**
 * @author 박성용
 * @version 1.0 22.7.6 최초 작성
 */
const anotherUsersMoneybooks = async (query) => {
  const type = parseInt(query.type, 10);
  const moneybook_id = parseInt(query.moneybook_id, 10);
  try {
    const getAnotherMoneybooks = await moneybookDetail.findAll({
      where: { money_type: type },
      attributes: ["id", "money_type", "money", "memo", "occured_at"],
      include: [
        {
          model: Moneybook,
          attributes: ["id", "title"],
          exclude: ["created_At", "updated_At", "deleted_At"],
          where: { id: moneybook_id },
          required: true,
        },
      ],
    });
    let anotherMoneybookList = [];
    getAnotherMoneybooks.forEach((data) => {
      let otherUserMoneybooksData = {
        moneybook_detail_id: data.dataValues.id,
        type: data.dataValues.money_type,
        money: data.dataValues.money,
        memo: data.dataValues.memo,
        occured_at: data.dataValues.occured_at,
      };
      anotherMoneybookList.push(otherUserMoneybooksData);
    });
    let data = { anotherMoneybookList };
    return response(statusCode.OK, message.SUCCESS, data);
  } catch (err) {
    logger.error(`DB ERROR: ${err}`);
    return errResponse(statusCode.DB_ERROR, message.DB_ERROR);
  }
};

export default {
  anotherUsersMoneybooks,
};
