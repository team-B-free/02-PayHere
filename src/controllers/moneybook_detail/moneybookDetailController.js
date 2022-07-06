import moneybookDetailService from "../../services/moneybook_detail/moneybookDetailService.js";
import { response } from "../../utils/response.js";
import statusCode from "../../utils/statusCode.js";
import message from "../../utils/responseMessage.js";

const moneybookDetailController = {
  /**
   * @author 박성용
   * @version 1.0 22.7.6 최초 작성
   */
  getOtherUsersMoneybook: async (req, res) => {
    // eslint-disable-next-line no-unused-vars
    let { type, user_idx } = req.query;
    const result = await moneybookDetailService.otherUsersMoneybooks(req.query);
    result.forEach((data) => console.log(data.dataValues));
    return res
      .status(statusCode.OK)
      .send(response(statusCode.OK, message.SUCCESS));
  },
};

export default moneybookDetailController;
