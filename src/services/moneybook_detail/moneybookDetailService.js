import Moneybook from '../../models/moneybook.js';
import Comment from '../../models/comment.js';
import User from '../../models/user.js';
import { getCurrentTime, setConvertTime } from '../../modules/time.js';
import moneybookDetail from '../../models/moneybookDetail.js';
import { logger } from '../../config/winston.js';
import statusCode from '../../utils/statusCode.js';
import message from '../../utils/responseMessage.js';
import { response, errResponse } from '../../utils/response.js';
import { Op } from 'sequelize';
const createMoneybook = async req => {
  /**
   * @author 오주환
   * @version 1.0 22.07.07 가계부 상세내역
   */
  const { moneybook_id } = req.params;
  console.log(req);
  const { money, memo, money_type, occured_at } = req.body;
  console.log(req.body);
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

const readAllMoneybook = async req => {
  /**
   * @author 오주환
   * @version 1.0 22.07.07 가계부 상세내역 조회
   */
  const { moneybook_id } = req.params;

  const result = await moneybookDetail.findAll({
    where: {
      moneybook_id,
    },
    include: [
      {
        model: Moneybook,
        attributes: ['user_id'],
      },
      {
        model: Comment,
        attributes: ['content'],
      },
    ],
    order: [['createdAt', 'DESC']],
  });

  let moneybookDetailInfo = JSON.parse(JSON.stringify(result));

  const user_id = moneybookDetailInfo[0].MONEYBOOK.user_id;

  for (let element of moneybookDetailInfo) {
    delete element.MONEYBOOK;
  }

  let moneybookDetail = {
    user_id: user_id,
    moneybookDetailInfo: moneybookDetailInfo,
  };

  return moneybookDetail;
};
const updateMoneybook = async req => {
  /**
   * @author 오주환
   * @version 1.0 22.07.07 가계부 상세내역 수정
   */
  const { moneybook_id } = req.params;
  const { money, memo, money_type } = req.body;
  const authorization = req.header('Authorization');

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

const anotherUsersMoneybooks = async query => {
  /**
   * @author 박성용
   * @version 1.0 22.7.6 최초 작성
   */
  console.log(query);
  const type = parseInt(query.type, 10);
  const user_id = query.userId;

  try {
    // 2 join 3 table  가게부 상세페이지로 부터 유저의 정보를 가져온다
    const getAnotherMoneybooks = await moneybookDetail.findAll({
      where: { money_type: type },
      attributes: ['id', 'money_type', 'money', 'memo', 'occured_at'],
      include: [
        {
          model: Moneybook,
          attributes: ['id', 'title', 'user_id'],
          exclude: ['created_at', 'updated_at', 'deleted_at'],
          required: true,
          where: {
            user_id: { [Op.ne]: user_id },
          },
          include: [
            {
              model: User,
              attributes: ['nickname'],
            },
          ],
        },
      ],
    });
    let anotherMoneybookList = [];
    getAnotherMoneybooks.forEach(data => {
      let otherUserMoneybooksData = {
        moneybook_id: data.MONEYBOOK.dataValues.id,
        user_id: data.MONEYBOOK.dataValues.user_id,
        nickname: data.MONEYBOOK.USER.dataValues.nickname,
        title: data.MONEYBOOK.dataValues.title,
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
  recoverMoneybook,
  readAllMoneybook,
  createMoneybook,
  updateMoneybook,
  deleteMoneybook,
};
