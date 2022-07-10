import Moneybook from '../../models/moneybook.js';
import User from '../../models/user.js';
import { logger } from '../../config/winston.js';
import statusCode from '../../utils/statusCode.js';
import message from '../../utils/responseMessage.js';
import { response, errResponse } from '../../utils/response.js';

/**
 * @author 박성용
 * @version 1.0 22.7.6 최초 작성
 */
const mbtiMoneybook = async mbti => {
  try {
    const getUsersMbti = await Moneybook.findAll({
      where: { is_shared: 'Y' },
      attributes: ['id', 'title', 'is_shared', 'view', 'user_id'],
      include: [
        {
          model: User,
          attributes: ['mbti', 'nickname'],
          exclude: ['created_at', 'updated_at', 'deleted_at'],
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

const deleteMoneybook = async (userId, moneybook_id) => {
  /**
   * @author 박성용
   * @version 1.0 22.7.6
   * 가계부id 파라미터 요청시 해당 id의 가계부 제거
   *
   * @author 박성용
   * @version 1.1 22.7.8
   * 로그인한 유저 정보를 받아 (로그인한)유저가 생성한 가계부 내역 중 (가계부id)파라미터 요청과 일치하는 가계부만 제거
   */

  const userData = await Moneybook.findAll({
    where: { user_id: userId },
    attributes: ['id', 'title', 'user_id'],
  });
  let userDataList = [];
  userData.forEach(data => {
    let setUserData = {
      id: data.dataValues.id,
      user_id: data.dataValues.user_id,
      title: data.dataValues.title,
    };
    userDataList.push(setUserData);
  });

  for (let i = 0; i < userDataList.length; i++) {
    // 요청한 가계부id와 유저가 만든 가계부의 id가 일치하지 않는 경우
    if (moneybook_id !== userDataList[i].id) {
      errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST);
    }
    // 가계부의 id와 요청한 가계부 id 파라미터와 같다면
    // 가계부 id에 해당하는 가계부를 삭제한다
    if (userDataList[i].id === parseInt(moneybook_id, 10)) {
      let cascade = await Moneybook.findOne({
        where: { id: moneybook_id },
      });
      await cascade.destroy();
      return response(statusCode.OK, message.SUCCESS);
    }
  }
};

const restoreMoneybook = async (moneybook_id, userId) => {
  /**
   * @author 박성용
   * @version 1.0 22.7.6
   * 가계부id 파라미터 요청시 해당 id의 가계부 제거
   *
   * @author 박성용
   * @version 1.1 22.7.8
   * 로그인한 유저 정보를 받아 (로그인한)유저가 삭제한 내역이 있는 가계부 중
   * (가계부id)파라미터 요청과 일치하는 가계부만 복원
   */
  const userData = await Moneybook.findAll({
    where: { user_id: userId },
    attributes: ['id', 'title', 'user_id', 'deleted_at'],
    paranoid: false,
  });
  let userDataList = [];
  userData.forEach(data => {
    let setUserData = {
      id: data.dataValues.id,
      user_id: data.dataValues.user_id,
      title: data.dataValues.title,
      deleted_at: data.dataValues.deleted_at,
    };
    userDataList.push(setUserData);
  });

  for (let key in userDataList) {
    let id = userDataList[key].id;
    let deleteAt = userDataList[key].deleted_at;

    // 요청한 가계부id와 유저가 만든 가계부의 id가 일치하지 않는 경우
    if (parseInt(moneybook_id, 10) !== id) {
      errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST);
    }
    // 가계부의 id와 요청한 가계부 id 파라미터와 같고, 삭제된 이력이 있다면
    // 가계부 id에 해당하는 가계부를 복구한다
    if (id === parseInt(moneybook_id, 10) && deleteAt !== '') {
      await Moneybook.restore({
        where: { id: id },
      });
      return response(statusCode.OK, message.SUCCESS);
    }
  }
};

const updateMoneybook = async req => {
  /**
   * @author 오주환
   * @version 1.0 22.07.06 가계부 수정
   *
   * @author 박성용
   * @version 1.1 22.07.08 요청 시나리오 별 응답 수정
   */

  const { userId } = req;
  const { title, is_shared } = req.body;
  const { moneybook_id } = req.params;
  const authorization = req.header('Authorization');

  const moneyBook = await Moneybook.findOne({
    where: { id: moneybook_id },
    attributes: ['title', 'is_shared', 'id'],
  });

  // 없는 가계부 id를 요청하여 데이터가 없을 때,
  if (moneyBook === null) {
    return null;
  }

  const { savedTitie, savedIs_shared } = moneyBook.dataValues;

  if (authorization === undefined) {
    return -1;
  } else if (!(savedTitie !== title) === !(savedIs_shared !== is_shared)) {
    return -2;
  } else if (savedTitie !== title && savedIs_shared !== is_shared) {
    const updataMoneybook = await Moneybook.update(
      { title, is_shared },
      {
        where: {
          id: moneybook_id,
        },
      },
    );
    return updataMoneybook;
  } else {
    return 0;
  }
};

export default {
  deleteMoneybook,
  restoreMoneybook,
  mbtiMoneybook,
  updateMoneybook,
};
