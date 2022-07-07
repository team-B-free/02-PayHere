import "../../utils/envUtil.js";
import { logger } from "../../config/winston.js";
import User from "../../models/user.js";
import Moneybook from "../../models/moneybook.js";
import { signTokens } from "../../utils/jwtUtil.js";
import { response, errResponse } from "../../utils/response.js";
import message from "../../utils/responseMessage.js";
import statusCode from "../../utils/statusCode.js";
import { loginResponse, signUpResponse } from "../../utils/responseData.js";
import bcrypt from "bcrypt";
import redisClient from "../../config/redis.js";
import { resignAccessToken } from "../../utils/jwtUtil.js";
import { resignTokenStatus } from "../../utils/constants.js";
import { resignTokenResponse } from "../../utils/responseData.js";
import { setConvertTimePeriod } from "../../modules/time.js";

const login = async (email, password) => {
  try {
    const user = await User.findOne({
      where: { email },
      attributes: ["id", "password"],
    });

    if (!user) {
      return [
        statusCode.BAD_REQUEST,
        errResponse(statusCode.BAD_REQUEST, message.INVALID_USER_INFO),
      ];
    }

    const encodedPassword = user.getDataValue("password");
    console.log(encodedPassword);
    console.log(bcrypt.compareSync(password, encodedPassword));

    const isValidPassword = bcrypt.compareSync(password, encodedPassword);
    if (!isValidPassword) {
      return [
        statusCode.BAD_REQUEST,
        errResponse(statusCode.BAD_REQUEST, message.INVALID_USER_INFO),
      ];
    }

    const userId = user.getDataValue("id");
    const { accessToken, refreshToken } = await signTokens(userId);
    const data = loginResponse(accessToken, refreshToken);

    return [statusCode.OK, response(statusCode.OK, message.SUCCESS, data)];
  } catch (err) {
    logger.error(`login Service Err: ${err}`);
    return [
      statusCode.DB_ERROR,
      errResponse(statusCode.DB_ERROR, message.INTERNAL_SERVER_ERROR),
    ];
  }
};

const signUp = async (email, password, nickname, mbti) => {
  try {
    const isExistEmail = await User.findOne({
      where: { email },
    });

    if (isExistEmail) {
      return [
        statusCode.BAD_REQUEST,
        errResponse(statusCode.BAD_REQUEST, message.ALREADY_EXIST_EMAIL),
      ];
    }

    const isExistNickname = await User.findOne({
      where: { nickname },
    });

    if (isExistNickname) {
      return [
        statusCode.BAD_REQUEST,
        errResponse(statusCode.BAD_REQUEST, message.ALREADY_EXIST_NICKNAME),
      ];
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      email,
      password: encryptedPassword,
      nickname,
      mbti,
    });
    const userId = newUser.id;

    const { accessToken, refreshToken } = await signTokens(userId);
    const data = signUpResponse(accessToken, refreshToken);

    return [statusCode.OK, response(statusCode.OK, message.SUCCESS, data)];
  } catch (err) {
    logger.error(`signUp Service Err: ${err}`);
    return [
      statusCode.DB_ERROR,
      errResponse(statusCode.DB_ERROR, message.INTERNAL_SERVER_ERROR),
    ];
  }
};

const logout = async (userId) => {
  redisClient.del(String(userId));

  return [statusCode.OK, response(statusCode.OK, message.SUCCESS)];
};

const resignToken = async (accessToken, refreshToken) => {
  const [result, newAccessToken] = await resignAccessToken(
    accessToken,
    refreshToken
  );

  if (result === resignTokenStatus.RESIGN_ACCESS_TOKEN) {
    const data = resignTokenResponse(newAccessToken, refreshToken);
    return [statusCode.OK, response(statusCode.SUCCESS, message.SUCCESS, data)];
  } else if (result === resignTokenStatus.UNAUTHORIZED) {
    return [
      statusCode.UNAUTHORIZED,
      errResponse(statusCode.UNAUTHORIZED, message.FORBIDDEN),
    ];
  } else if (result === resignTokenStatus.UNNECESSARY) {
    return [
      statusCode.BAD_REQUEST,
      errResponse(statusCode.BAD_REQUEST, message.REFRESH_TOKEN_UNNECESSARY),
    ];
  }
};
const readAllMoneybookByDate = async (req) => {
  /**
   * @author 오주환
   * @version 1.0 22.07.07 가계부 조회(날짜) 생성
   */
  const { userId } = req;

  const { startDate, endDate } = setConvertTimePeriod(req.query);

  if (startDate === undefined || endDate === undefined) {
    return 0;
  } else {
    const result = Moneybook.sequelize.query(
      `SELECT id, title, is_shared, view, created_at FROM moneybook WHERE user_id=${userId} AND created_at >= '${startDate}' AND created_at <= '${endDate}' ORDER BY created_at DESC;`,
      { model: Moneybook }
    );

    return result;
  }
};
const createMoneybook = async (req) => {
  /**
   * @author 오주환
   * @version 1.0 22.07.06 가계부 생성
   */

  const { userId } = req;
  const { title, is_shared } = req.body;
  try {
    const moneybook = await Moneybook.create({
      title,
      is_shared,
      user_id: userId,
    });
    return moneybook;
  } catch (error) {
    console.error(error);
  }
};

/** (DB) user 객체 반환
 * @author 강채현
 * @version 1.0
 * @param {string} userId userId
 * @returns {array} response 또는 errResponse 객체
 */
const getUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);

    if (user) {
      return [statusCode.OK, response(statusCode.OK, message.SUCCESS, user)];
    } else {
      return [
        statusCode.NO_CONTENT,
        errResponse(statusCode.NO_CONTENT, message.NO_CONTENT),
      ];
    }
  } catch (err) {
    console.log(err);
    return [
      statusCode.DB_ERROR,
      errResponse(statusCode.DB_ERROR, message.DB_ERROR),
    ];
  }
};

/** (DB) user 정보 수정
 * @author 강채현
 * @version 1.0
 * @param {User} user User 객체
 * @param {string} newNickname 변경할 닉네임
 * @param {string} newMbti 변경할 mbti
 * @param {string} newPassword 변경할 비밀번호
 * @returns {array<number, response>} response 또는 errResponse 객체
 */
const editUser = async (
  userId,
  newNickname = null,
  newMbti = null,
  newPassword = null
) => {
  const dataToEdit = {
    newNickname,
    newMbti,
    newPassword,
  };
  const updatedData = [];
  console.log("현재유저의 id", userId);

  // (DB) USER SELECT query 및 Vaildation
  const [status, result] = await getUser(userId);
  if (!result.data) {
    return [status, result];
  }

  const user = result.data;
  // 데이터 삽입
  for (let key in dataToEdit) {
    if (user[key] === dataToEdit[key] || !dataToEdit[key]) {
      continue;
    } else {
      user[key] = dataToEdit[key];
      updatedData.push({ [key]: dataToEdit[key] }); // 변경된 데이터
    }
  }

  if (updatedData.length === 0) {
    return [
      statusCode.BAD_REQUEST,
      errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST),
    ];
  }

  try {
    user.set({
      nickname: newNickname,
      password: bcrypt.hashSync(newPassword, 10),
      mbti: newMbti,
    });

    await user.save(); // DB UPDATE
    return [statusCode.OK, response(statusCode.OK, message.SUCCESS)];
  } catch (err) {
    console.log(err);
    return [
      statusCode.DB_ERROR,
      errResponse(statusCode.DB_ERROR, message.DB_ERROR),
    ];
  }
};

/** (DB) user 삭제
 * @author 강채현
 * @version 1.0
 * @param {User} user User 객체
 * @returns {array<number, response>} response 또는 errResponse 객체
 */
const deleteUser = async (userId) => {
  // (DB) USER SELECT query 및 Vaildation
  const [status, result] = await getUser(userId);
  if (!result.data) {
    return [status, result];
  }

  const user = result.data;
  try {
    // (models/user.js) paranoid:true => Soft delete
    await user.destroy({
      where: {
        email: user.email,
        password: user.password,
      },
    });

    return [statusCode.OK, response(statusCode.OK, message.SUCCESS)];
  } catch (err) {
    console.log(err);
    return [
      statusCode.DB_ERROR,
      errResponse(statusCode.DB_ERROR, message.DB_ERROR),
    ];
  }
};

export default {
  login,
  signUp,
  logout,
  resignToken,
  readAllMoneybookByDate,
  createMoneybook,
  getUser,
  editUser,
  deleteUser,
};
