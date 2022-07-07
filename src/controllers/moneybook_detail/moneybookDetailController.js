import moneybookDetailService from "../../services/moneybook_detail/moneybookDetailService.js";
import { response } from "../../utils/response.js";
import statusCode from "../../utils/statusCode.js";
import message from "../../utils/responseMessage.js";

const moneybookDetailController = {
  /**
   * @author 박성용
   * @version 1.0 22.7.6 최초 작성
   */
  getAnotherUsersMoneybook: async (req, res) => {
    // eslint-disable-next-line no-unused-vars
    let { type, user_idx } = req.query;
    const result = await moneybookDetailService.anotherUsersMoneybooks(
      req.query
    );

    console.log("타인 가계부 조회 결과", result);
    return res
      .status(statusCode.OK)
      .send(response(statusCode.OK, message.SUCCESS, result));
  },
};

export default moneybookDetailController;
