import moneybookDetailService from "../../services/moneybook_detail/moneybookDetailService.js";
import statusCode from "./../../utils/statusCode.js";
import message from "./../../utils/responseMessage.js";
import { errResponse, response } from "./../../utils/response.js";

const moneybookDetailController = {
  createMoneybook: async (req, res) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.06 가계부 상세내역 추가
     */

    try {
      const moneybook = await moneybookDetailService.createMoneybook(req);

      if (moneybook === 0) {
        return res
          .status(statusCode.UNAUTHORIZED)
          .send(errResponse(statusCode.UNAUTHORIZED, message.NULL_VALUE));
      }

      if (moneybook === undefined) {
        return res.send(errResponse(statusCode.NO_CONTENT, message.NULL_VALUE));
      }

      return res
        .status(statusCode.CREATED)
        .send(response(statusCode.CREATED, message.SUCCESS, moneybook));
    } catch (err) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
  },
  readAllMoneybook: async (req, res) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.07 가계부 상세내역 조회
     */
    // 1.미들웨어 토큰 정보
    // const userInfo = req.userInfo;
    // 2.Header 토큰 정보
    const moneybook = await moneybookDetailService.readAllMoneybook(req);

    try {
      if (moneybook === 0) {
        return res
          .status(statusCode.BAD_REQUEST)
          .send(errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST));
      }
      if (moneybook.length === 0) {
        return res.json(
          response(statusCode.NO_CONTENT, message.NULL_VALUE, moneybook)
        );
      }

      return res
        .status(statusCode.CREATED)
        .send(response(statusCode.CREATED, message.SUCCESS, moneybook));
    } catch (err) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
  },
  updateMoneybook: (req, res) => {
    return res.send("Test");
  },
  deleteMoneybook: (req, res) => {
    return res.send("Test");
  },
  recoverMoneybook: (req, res) => {
    return res.send("Test");
  },
};
export default moneybookDetailController;
