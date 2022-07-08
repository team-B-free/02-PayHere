import statusCode from "./../../utils/statusCode.js";
import message from "./../../utils/responseMessage.js";
import { errResponse, response } from "./../../utils/response.js";
import userService from "../../services/user/userService.js";

const userController = {
  /** 회원정보 수정 API
   * @author 강채현
   * @version 1.0
   */
  editUser: async (req, res) => {
    const { userId } = req;
    const {
      new_nickname: newNickName,
      new_mbti: newMbti,
      new_password: newPassword,
    } = req.body;

    // (DB) USER UPDATE query 및 Validation
    const [statusCode, result] = await userService.editUser(
      userId,
      newNickName,
      newMbti,
      newPassword,
    );

    return res.status(statusCode).send(result);
  },

  /** 회원정보 삭제 API
   * @author 강채현
   * @version 1.0
   */
  deleteUser: async (req, res) => {
    const { userId } = req;
    // (DB) USER DELETE query 및 Vaildation
    const [statusCode, result] = await userService.deleteUser(userId);

    return res.status(statusCode).send(result);
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const [statusCode, result] = await userService.login(email, password);

    return res.status(statusCode).send(result);
  },

  resignToken: async (req, res) => {
    const { authorization, refreshtoken: refreshToken } = req.headers;
    const accessToken = authorization.split(" ").reverse()[0];

    const [statusCode, result] = await userService.resignToken(
      accessToken,
      refreshToken,
    );

    return res.status(statusCode).send(result);
  },

  signUp: async (req, res) => {
    const { email, password, nickname } = req.body;
    const [statusCode, result] = await userService.signUp(
      email,
      password,
      nickname,
    );

    return res.status(statusCode).send(result);
  },

  logout: async (req, res) => {
    const { userId } = req;

    const [statusCode, result] = await userService.logout(userId);

    return res.status(statusCode).send(result);
  },
  readAllMoneybookByDate: async (req, res) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.07 가계부 조회(날짜 조건)
     */
    const moneybook = await userService.readAllMoneybookByDate(req);

    if (moneybook === 0) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(errResponse(statusCode.UNAUTHORIZED, message.UNAUTHORIZED));
    } else if (moneybook.length === 0) {
      return res.json(
        response(statusCode.NO_CONTENT, message.NO_CONTENT, moneybook),
      );
    } else {
      return res
        .status(statusCode.CREATED)
        .send(response(statusCode.CREATED, message.SUCCESS, moneybook));
    }
  },
  createMoneybook: async (req, res) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.06 가계부 추가
     */

    const moneybook = await userService.createMoneybook(req);

    if (moneybook === 0) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(errResponse(statusCode.UNAUTHORIZED, message.UNAUTHORIZED));
    } else if (moneybook === undefined) {
      return res.send(errResponse(statusCode.NO_CONTENT, message.NO_CONTENT));
    } else {
      return res
        .status(statusCode.CREATED)
        .send(response(statusCode.CREATED, message.SUCCESS, moneybook));
    }
  },
};

export default userController;
