import statusCode from "./../../utils/statusCode.js";
import message from "./../../utils/responseMessage.js";
import { errResponse, response } from "./../../utils/response.js";
import userService from "../../services/user/userService.js";

const userController = {
  signupUser: async (req, res) => {
    try {
      const user = await userService.signupUser(req);

      return res
        .status(statusCode.CREATED)
        .send(response(statusCode.CREATED, message.SUCCESS, user));
    } catch (err) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
  },
  readAllMoneybookByDate: async (req, res) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.07 가계부 조회(날짜 조건)
     */
    // 1.미들웨어 토큰 정보
    // const userInfo = req.userInfo;
    // 2.Header 토큰 정보
    const moneybook = await userService.readAllMoneybookByDate(req);

    if (moneybook === 0) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(errResponse(statusCode.UNAUTHORIZED, message.UNAUTHORIZED));
    } else if (moneybook.length === 0) {
      return res.json(
        response(statusCode.NO_CONTENT, message.NO_CONTENT, moneybook)
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
