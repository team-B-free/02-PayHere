import moneybookService from "../../services/moneybook/moneybookService.js";
import { errResponse } from "../../utils/response.js";
import statusCode from "../../utils/statusCode.js";
import message from "../../utils/responseMessage.js";

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
};

export default moneybookController;
