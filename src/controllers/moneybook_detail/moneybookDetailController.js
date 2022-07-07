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
    let moneybook_id = req.params.moneybook_id; //1
    let { type } = req.query; //1

    let data = { moneybook_id, type };

    const result = await moneybookDetailService.anotherUsersMoneybooks(data);

    console.log("타인 가계부 조회 결과", result);
    return res
      .status(statusCode.OK)
      .send(response(statusCode.OK, message.SUCCESS, result));
  },
};

export default moneybookDetailController;
