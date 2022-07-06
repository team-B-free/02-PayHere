import moneybookService from "./../../services/moneybook/moneybookService.js";
import statusCode from "./../../utils/statusCode.js";
import message from "./../../utils/responseMessage.js";
import { errResponse, response } from "./../../utils/response.js";

const moneybookController = {
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
