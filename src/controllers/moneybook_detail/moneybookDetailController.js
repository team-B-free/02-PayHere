import moneybookDetailService from "../../services/moneybook_detail/moneybookDetailService.js";
import { errResponse } from "../../utils/response.js";
import statusCode from "../../utils/statusCode.js";
import message from "../../utils/responseMessage.js";

const moneybookDetailController = {
  /**
   * @author 박성용
   * @version 1.0 22.7.6 최초 작성
   */
  getAnotherUsersMoneybook: async (req, res) => {
    // eslint-disable-next-line no-unused-vars
    const { moneybook_id } = req.params;
    const { type } = req.query; //1
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
};

export default moneybookDetailController;
