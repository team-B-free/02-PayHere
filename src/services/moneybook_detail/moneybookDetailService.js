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
   *
   * @author 박성용
   * @version 1.1 22.07.08
   * 가계부 상세내역 생성시 현재 로그인 한 유저가 생성한 가계부만 상세 내역 생성 가능
   */
  const { userId } = req;
  const { moneybook_id } = req.params;
  const { money, memo, money_type, occured_at } = req.body;
  const occuredAt = setConvertTime(occured_at);

  const moneyBook = await Moneybook.findOne({
    where: { id: moneybook_id },
    attributes: ['title', 'is_shared', 'id', 'user_id'],
  });
  try {
    if (moneyBook.user_id === userId) {
      const moneybook = await moneybookDetail.create({
        money,
        memo,
        money_type,
        moneybook_id,
        occured_at: occuredAt,
      });
      return moneybook;
    } else {
      return errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST);
    }
  } catch (error) {
    console.error(error);
  }
};

const readAllMoneybook = async req => {
  /**
   * @author 오주환
   * @version 1.0 22.07.07 가계부 상세내역 조회
   *
   *  @author 박성용
   *  @version 1.1 22.07.08
   *  가계부 상세내역 join 쿼리 수정
   *  로그인한 유저는 자신의 가계부만 조회 가능
   */
  const { moneybook_id } = req.params;
  const { userId } = req;

  const result = await moneybookDetail.findAll({
    where: {
      moneybook_id,
    },
    attributes: ['id', 'money_type', 'money', 'memo', 'occured_at'],
    include: [
      {
        model: Moneybook,
        attributes: ['user_id'],
        exclude: ['deleted_at'],
        required: true,
        include: [
          {
            model: Comment,
            attributes: ['content'],
          },
        ],
      },
    ],
    order: [['createdAt', 'DESC']],
  });

  let moneybookDetailInfo = JSON.parse(JSON.stringify(result));
  const user_id = moneybookDetailInfo[0].MONEYBOOK.user_id;

  if (userId !== user_id) {
    return 0;
  } else {
    for (let element of moneybookDetailInfo) {
      delete element.MONEYBOOK;
    }

    let moneybookDetail1 = {
      user_id: user_id,
      moneybookDetailInfo: moneybookDetailInfo,
    };

    return moneybookDetail1;
  }
};
const updateMoneybook = async req => {
  /**
   * @author 오주환
   * @version 1.0 22.07.07 가계부 상세내역 수정
   *
   */

  const { moneybook_id } = req.params;
  const { userId } = req;
  console.log(userId, '로그인중');
  const { money, memo, money_type } = req.body;
  const authorization = req.header('Authorization');
  const moneyBook = await Moneybook.findAll({
    where: { user_id: userId },
    attributes: ['id', 'user_id'],
  });

  if (authorization === undefined) {
    return 0;
  }

  try {
    if (moneyBook.dataValues.id === moneybook_id) {
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
    } else {
      return errResponse(statusCode.UNAUTHORIZED, message.UNAUTHORIZED);
    }
  } catch (err) {
    return errResponse(statusCode.UNAUTHORIZED, message.UNAUTHORIZED);
  }
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
   * @author 박성용
   * @version 1.1 22.07.08
   * 가계부 상세내역 수정시 인증 된 유저가 모든유저의 가계부 복구 가능한 문제 수정
   */
  const { moneybook_id } = req.params;

  const moneyBook = await Moneybook.findOne({
    where: { id: moneybook_id },
    attributes: ['title', 'is_shared', 'id', 'user_id'],
  });
  if (moneyBook === null) {
    return 0;
  } else if (moneybook_id !== moneyBook.dataValues.id) {
    return -1;
  } else {
    const moneybook = await moneybookDetail.restore({
      where: { id: moneybook_id },
    });
    return moneybook;
  }
};

const anotherUsersMoneybooks = async query => {
  /**
   * @author 박성용
   * @version 1.0 22.7.6 최초 작성
   */

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
