import moneybookService from "../../services/moneybook/moneybookService.js";
import { response } from "../../utils/response.js";
import statusCode from "../../utils/statusCode.js";
import message from "../../utils/responseMessage.js";

const moneybookController = {
  /**
   * @author 박성용
   * @version 1.0 22.7.6 최초 작성
   */
  getMbtiTypeMoneybook: async (req, res, next) => {
    let { mbti } = req.query;
    // eslint-disable-next-line no-prototype-builtins
    if (req.query.hasOwnProperty("mbti")) {
      // mbti 요청이 비어있으면 BAD_REQUEST 응답
      if (mbti === "") {
        return res
          .status(statusCode.BAD_REQUEST)
          .send(
            response(
              statusCode.BAD_REQUEST,
              message.BAD_REQUEST,
              "MBTI 요청이 필요"
            )
          );
      }
      const result = await moneybookService.mbtiMoneybook(mbti);
      console.log("mbti별 가계부 조회 결과", result);
      return res
        .status(statusCode.OK)
        .send(response(statusCode.OK, message.SUCCESS, result));
    } else {
      // 쿼리 요청이 mbti가 아니면 다음 함수로 이동 - > getOtherUsersMoneybook
      // !라우터의 변경으로 필요 없어진 부분 삭제 예정
      next();
    }
  },

  /**
   * @author 박성용
   * @version 1.0 22.7.6 최초 작성
   */
  setDeleteMoneybook: async (req, res) => {
    let moneybook_id = req.params.moneybook_id;
    await moneybookService.deleteMoneybook(moneybook_id);

    return res
      .status(statusCode.OK)
      .send(response(statusCode.OK, message.SUCCESS));
  },

  /**
   * @author 박성용
   * @version 1.0 22.7.6 최초 작성
   */
  setRestoreMoneyBook: async (req, res) => {
    let moneybook_id = req.params.moneybook_id;
    await moneybookService.restoreMoneybook(moneybook_id);
    return res
      .status(statusCode.OK)
      .send(response(statusCode.OK, message.SUCCESS));
  },
};

export default moneybookController;
