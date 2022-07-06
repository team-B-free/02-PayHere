import moneybookService from "../../services/moneybook/moneybookService.js";
import { response } from "../../utils/response.js";
import statusCode from "../../utils/statusCode.js";
import message from "../../utils/responseMessage.js";

const moneybookController = {
  /**
   * @author 박성용
   * @version 1.0 22.7.6 최초 작성
   */
  setDeleteMoneybook: async (req, res) => {
    let id = req.params.id;
    await moneybookService.deleteMoneybook(id);

    return res
      .status(statusCode.OK)
      .send(response(statusCode.OK, message.SUCCESS));
  },
};

export default moneybookController;
