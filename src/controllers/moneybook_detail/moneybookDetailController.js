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
  /**
   * @author 박성용
   * @version 1.0 22.7.6 최초 작성
   */
  getAnotherUsersMoneybook: async (req, res) => {
    // eslint-disable-next-line no-unused-vars
    const { moneybook_id } = req.params;
    const { type } = req.query;
    const data = { moneybook_id, type };
    try {
      const result = await moneybookDetailService.anotherUsersMoneybooks(data);
      return res.status(result.status).send(result);
    } catch (err) {
      console.log(err);
      return [
        statusCode.BAD_REQUEST,
        errResponse(statusCode.BAD_REQUEST, message.INVALID_USER_INFO),
      ];
    }
  },
  readAllMoneybook: async (req, res) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.07 가계부 상세내역 조회
     */
    const moneybook = await moneybookDetailService.readAllMoneybook(req);

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
        errResponse(statusCode.UNAUTHORIZED, message.UNAUTHORIZED)
      );
    } else if (moneybook[0] === 0) {
      return res.send(errResponse(statusCode.NO_CONTENT, message.NO_CONTENT));
    } else {
      return res
        .status(statusCode.CREATED)
        .send(response(statusCode.CREATED, message.SUCCESS, moneybook));
    }
  },
  deleteMoneybook: async (req, res) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.07 가계부 상세내역 삭제
     */
    const moneybook = await moneybookDetailService.deleteMoneybook(req);
    console.log("moneybook: ", moneybook);

    if (moneybook === 0) {
      return res.send(
        errResponse(statusCode.UNAUTHORIZED, message.UNAUTHORIZED)
      );
    } else if (moneybook === -1) {
      return res.send(errResponse(statusCode.NO_CONTENT, message.NO_CONTENT));
    } else {
      return res
        .status(statusCode.CREATED)
        .send(response(statusCode.CREATED, message.SUCCESS, moneybook));
    }
  },
  recoverMoneybook: async (req, res) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.07 가계부 상세내역 복구
     */
    const moneybook = await moneybookDetailService.recoverMoneybook(req);
    console.log("moneybook: ", moneybook);

    if (moneybook === 0) {
      return res.send(errResponse(statusCode.NO_CONTENT, message.NO_CONTENT));
    } else if (moneybook === -1) {
      return res.send(
        errResponse(statusCode.UNAUTHORIZED, message.UNAUTHORIZED)
      );
    } else {
      return res
        .status(statusCode.CREATED)
        .send(response(statusCode.CREATED, message.SUCCESS, moneybook));
    }
  },
};
export default moneybookDetailController;
