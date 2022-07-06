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
    try {
      const moneybook = await moneybookService.updateMoneybook(req);

      if (moneybook === 0) {
        return res
          .status(statusCode.UNAUTHORIZED)
          .send(errResponse(statusCode.UNAUTHORIZED, message.NULL_VALUE));
      }

      return res
        .status(statusCode.CREATED)
        .send(response(statusCode.CREATED, message.SUCCESS, moneybook));
    } catch (err) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
  },
};

export default moneybookController;
