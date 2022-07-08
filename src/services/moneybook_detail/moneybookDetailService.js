import Moneybook from "../../models/moneybook.js";
import { getCurrentTime, setConvertTime } from "../../modules/time.js";
import moneybookDetail from "../../models/moneybookDetail.js";
import comment from "../../models/comment.js";
import moneybook from "../../models/moneybook.js";
import { logger } from "../../config/winston.js";
import statusCode from "../../utils/statusCode.js";
import message from "../../utils/responseMessage.js";
import { response, errResponse } from "../../utils/response.js";
import { getMoneybookDetailResponse } from "../../utils/responseData.js";

/**
 * @author 최예진
 * @version 1.0 22.07.08 가계부 상세내역 조회
 */
const getMoneybookDetail = async moneybookId => {
  try {
    const moneybookOwner = await moneybook.findOne({
      where: { id: moneybookId },
      attributes: ["user_id"],
    });

    if (!moneybookOwner) {
      return [
        statusCode.BAD_REQUEST,
        errResponse(statusCode.BAD_REQUEST, message.INVALID_MONEYBOOK_ID),
      ];
    }

    const moneybookOwnerId = moneybookOwner.getDataValue("user_id");

    const moneybookDetailArr = await moneybookDetail.findAll({
      where: {
        moneybook_id: moneybookId,
      },
      attributes: ["id", "money", "memo", "money_type", "occured_at"],
      order: [["occured_at", "ASC"]],
    });

    const commentArr = await comment.findAll({
      where: {
        moneybook_id: moneybookId,
      },
      attributes: ["id", "content", "created_at", "user_id"],
    });

    const detail = [];
    const comments = [];

    moneybookDetailArr.forEach(item => {
      detail.push({
        id: item.id,
        money: item.money,
        memo: item.memo,
        money_type: item.money_type,
        occured_at: item.occured_at,
      });
    });

    commentArr.forEach(item => {
      comments.push({
        id: item.id,
        user_id: item.user_id,
        content: item.content,
        created_at: item.created_at,
      });
    });

    const data = getMoneybookDetailResponse(moneybookOwnerId, detail, comments);

    return [statusCode.OK, response(statusCode.OK, message.SUCCESS, data)];
  } catch (error) {
    logger.error(`signUp Service Err: ${error}`);
    return [
      statusCode.DB_ERROR,
      errResponse(statusCode.DB_ERROR, message.INTERNAL_SERVER_ERROR),
    ];
  }
};
const createMoneybook = async req => {
  /**
   * @author 오주환
   * @version 1.0 22.07.07 가계부 상세내역
   */
  const { moneybook_id } = req.params;
  const { money, memo, money_type, occured_at } = req.body;
  const occuredAt = setConvertTime(occured_at);

  try {
    const moneybook = await moneybookDetail.create({
      money,
      memo,
      money_type,
      moneybook_id,
      occured_at: occuredAt,
    });
    return moneybook;
  } catch (error) {
    console.error(error);
  }
};
const updateMoneybook = async req => {
  /**
   * @author 오주환
   * @version 1.0 22.07.07 가계부 상세내역 수정
   */
  const { moneybook_id } = req.params;
  const { money, memo, money_type } = req.body;
  const authorization = req.header("Authorization");

  if (authorization === undefined) {
    return 0;
  }

  const moneybook = await moneybookDetail.update(
    {
      money,
      memo,
      money_type,
    },
    {
      where: { id: moneybook_id },
    },
  );

  return moneybook;
};
const deleteMoneybook = async req => {
  /**
   * @author 오주환
   * @version 1.0 22.07.07 가계부 상세내역 삭제
   */
  const { moneybook_id } = req.params;
  const currentTime = getCurrentTime();

  const moneybook = await moneybookDetail.update(
    {
      deletedAt: currentTime,
    },
    {
      where: { id: moneybook_id },
    },
  );

  return moneybook;
};
const recoverMoneybook = async req => {
  /**
   * @author 오주환
   * @version 1.0 22.07.07 가계부 상세내역 복구
   */
  const { moneybook_id } = req.params;
  console.log(moneybook_id);

  const moneybook = await moneybookDetail.restore({
    where: { id: moneybook_id },
  });

  return moneybook;
};
/**
 * @author 박성용
 * @version 1.0 22.7.6 최초 작성
 */
const anotherUsersMoneybooks = async query => {
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
    getAnotherMoneybooks.forEach(data => {
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
  getMoneybookDetail,
  anotherUsersMoneybooks,
  recoverMoneybook,
  createMoneybook,
  updateMoneybook,
  deleteMoneybook,
};
