import moneybookDetail from "../../models/moneybookDetail.js";
//import User from "../../models/user.js";
import Moneybook from "../../models/moneybook.js";
import { logger } from "../../config/winston.js";

/**
 * @author 박성용
 * @version 1.0 22.7.6 최초 작성
 */
const otherUsersMoneybooks = async (query) => {
  let type = parseInt(query.type, 10);
  let userId = parseInt(query.user_idx, 10);

  try {
    const getOtherMoneybooks = await moneybookDetail.findAll({
      where: { money_type: type },
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
        attributes: ["money_type", "money", "memo"],
      },
      include: [
        {
          model: Moneybook,
          attributes: ["title", "is_shared", "user_id"],
          where: { user_id: userId },
          required: true,
        },
      ],
    });
    return getOtherMoneybooks;
  } catch (err) {
    logger.error(`에러발생:`, err);
  }
};

export default {
  otherUsersMoneybooks,
};
