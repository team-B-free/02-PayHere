import statusCode from "./../../utils/statusCode.js";
import message from "./../../utils/responseMessage.js";
import { errResponse, response } from "./../../utils/response.js";
import userService from "../../services/user/userService.js";

const userController = {
  signupUser: async (req, res) => {
    try {
      const user = await userService.signupUser(req);

      console.log(user);
      return res
        .status(statusCode.CREATED)
        .send(response(statusCode.CREATED, message.SUCCESS, user));
    } catch (err) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
  },
  readAllMoneybook: (req, res) => {
    return res.send("hi");
  },
  createMoneybook: async (req, res) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.06 가계부 생성
     */

    try {
      const moneybook = await userService.createMoneybook(req);

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

export default userController;
