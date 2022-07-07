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
const mbtiMoneybook = async (mbti) => {
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
    return response(statusCode.OK, message.SUCCESS, data);
  } catch (err) {
    logger.error(`DB ERROR: ${err}`);
    return errResponse(statusCode.DB_ERROR, message.DB_ERROR);
  }
};

const deleteMoneybook = async (userId, moneybook_id) => {
  /**
   * @author 박성용
   * @version 1.0 22.7.6
   * 가계부id 파라미터 요청시 해당 id의 가계부 제거
   *
   * @author 박성용
   * @version 1.2 22.7.8
   * 로그인한 유저 정보를 받아 (로그인한)유저가 생성한 가계부 내역 중 (가계부id)파라미터 요청과 일치하는 가계부만 제거
   */

  const userData = await Moneybook.findAll({
    where: { user_id: userId },
    attributes: ["id", "title", "user_id"],
  });
  let userDataList = [];
  userData.forEach((data) => {
    let setUserData = {
      id: data.dataValues.id,
      user_id: data.dataValues.user_id,
      title: data.dataValues.title,
    };
    userDataList.push(setUserData);
  });

  for (let key in userDataList) {
    let id = userDataList[key].id;

    // 가계부의 id와 요청한 가계부 id 파라미터와 같다면
    // 가계부 id에 해당하는 가계부를 삭제한다
    if (id === parseInt(moneybook_id, 10)) {
      await Moneybook.destroy({
        where: { id: id },
      });
      return response(statusCode.OK, message.SUCCESS);
    }
    // 요청한 가계부id와 유저가 만든 가계부의 id가 일치하지 않는 경우
    else if (moneybook_id !== id) {
      return errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST);
    }
  }
};

/**
 * @author 박성용
 * @version 1.0 22.7.6 최초 작성
 */
const restoreMoneybook = async (moneybook_id, userId) => {
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

const moneybookService = {
  updateMoneybook: async (req) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.06 가계부 수정
     */
    const { moneybook_id } = req.params;
    const { title, is_shared } = req.body;
    const authorization = req.header("Authorization");

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
      }
    );
    return moneybook;
  },
};

export default {
  deleteMoneybook,
  restoreMoneybook,
  mbtiMoneybook,
  moneybookService,
};
