import moneybookService from "./../../services/moneybook/moneybookService.js";
import statusCode from "./../../utils/statusCode.js";
import message from "./../../utils/responseMessage.js";
import { errResponse, response } from "./../../utils/response.js";

const moneybookController = {
  /**
   * @author 박성용
   * @version 1.0 22.7.6 최초 작성
   *
   * @author 박성용
   * @version 1.1 22.7.7
   */
  getMbtiTypeMoneybook: async (req, res) => {
    let { mbti } = req.query;
    // mbti 요청이 비어있으면 BAD_REQUEST 응답
    if (mbti === "") {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
    try {
      const result = await moneybookService.mbtiMoneybook(mbti);
      return res.status(result.status).send(result);
    } catch (err) {
      console.log(err);
      return res
        .status(statusCode.BAD_REQUEST)
        .send(errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
  },

  /**
   * @author 박성용
   * @version 1.0 22.7.6 최초 작성
   */
  setDeleteMoneybook: async (req, res) => {
    const { moneybook_id } = req.params;

    try {
      const delMoneybook = await moneybookService.deleteMoneybook(moneybook_id);
      return res.status(delMoneybook.status).send(delMoneybook);
    } catch (err) {
      console.log(err);
      return res
        .status(statusCode.BAD_REQUEST)
        .send(errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
  },

  /**
   * @author 박성용
   * @version 1.0 22.7.6 최초 작성
   */
  setRestoreMoneyBook: async (req, res) => {
    let { moneybook_id } = req.params;

    try {
      const recoverMoneybook = await moneybookService.restoreMoneybook(
        moneybook_id
      );
      return res.status(recoverMoneybook.status).send(recoverMoneybook);
    } catch (err) {
      console.log(err);
      return res
        .status(statusCode.BAD_REQUEST)
        .send(errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
  },
  updateMoneybook: async (req, res) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.06 가계부 수정
     */
    const moneybook = await moneybookService.updateMoneybook(req);

    if (moneybook === -1) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(errResponse(statusCode.UNAUTHORIZED, message.UNAUTHORIZED));
    } else if (moneybook[0] === 0) {
      return res.send(errResponse(statusCode.NO_CONTENT, message.NO_CONTENT));
    } else {
      return res
        .status(statusCode.CREATED)
        .send(response(statusCode.CREATED, message.SUCCESS, moneybook));
    }
  },
};

export default moneybookController;
