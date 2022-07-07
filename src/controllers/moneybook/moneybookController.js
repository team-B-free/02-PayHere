import moneybookService from "./../../services/moneybook/moneybookService.js";
import statusCode from "./../../utils/statusCode.js";
import message from "./../../utils/responseMessage.js";
import { errResponse, response } from "./../../utils/response.js";

const moneybookController = {
  getMbtiTypeMoneybook: async (req, res) => {
    /**
     * @author 박성용
     * @version 1.0 22.7.6 최초 작성
     *
     * @author 박성용
     * @version 1.1 22.7.7
     */
    console.log(req);
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

  setDeleteMoneybook: async (req, res) => {
    /**
     * @author 박성용
     * @version 1.0 22.7.6
     * 가계부id 파라미터 요청시 해당 id의 가계부 제거
     *
     * @author 박성용
     * @version 1.2 22.7.8
     * 로그인한 유저 정보를 받아 유저가 생성한 가계부 내역 중 파라미터 요청과 일치하는 가계부만 제거
     */
    const { userId } = req;
    const { moneybook_id } = req.params;

    try {
      const delMoneybook = await moneybookService.deleteMoneybook(
        userId,
        moneybook_id
      );
      return res.status(delMoneybook.status).send(delMoneybook);
    } catch (err) {
      console.log(err);
      return res
        .status(statusCode.BAD_REQUEST)
        .send(errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
  },

  setRestoreMoneyBook: async (req, res) => {
    /**
     * @author 박성용
     * @version 1.0 22.7.6
     * 가계부id 파라미터 요청시 해당 id의 가계부 복구
     */
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
