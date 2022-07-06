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

    const moneybook = await moneybookDetailService.createMoneybook(req);

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
  readAllMoneybook: async (req, res) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.07 가계부 상세내역 조회
     */
    // 1.미들웨어 토큰 정보
    // const userInfo = req.userInfo;
    // 2.Header 토큰 정보
    const moneybook = await moneybookDetailService.readAllMoneybook(req);
    console.log("moneybook: ", moneybook);

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
  updateMoneybook: async (req, res) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.07 가계부 상세내역 수정
     */
    const moneybook = await moneybookDetailService.updateMoneybook(req);

    if (moneybook === -1) {
      return res.send(
        errResponse(statusCode.UNAUTHORIZED, message.UN_AUTHORIZED)
      );
    } else if (moneybook[0] === 0) {
      return res.send(errResponse(statusCode.NO_CONTENT, message.NO_CONTENT));
    } else {
      return res
        .status(statusCode.CREATED)
        .send(response(statusCode.CREATED, message.SUCCESS, moneybook));
    }
  },
  deleteMoneybook: (req, res) => {
    return res.send("Test");
  },
  recoverMoneybook: (req, res) => {
    return res.send("Test");
  },
};
export default moneybookDetailController;
